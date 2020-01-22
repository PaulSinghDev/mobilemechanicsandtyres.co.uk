const {
    body,
    validationResult,
} = require('express-validator');
require('dotenv').config({
    path: './.env'
});
const express = require('express');
const app = express();
const cors = require('cors');
const nodeMailer = require('nodemailer');
const helmet = require('helmet');
const https = require('https');
const fs = require('fs');

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_PW,
    SMTP_USER,
    MAIL_PORT,
    SMTP_TO,
    SSL_KEY,
    SSL_CERT,
    SSL_PW
} = process.env;

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"]
    }
}));
app.use(cors());

app.use(express.json());

app.post('/quick', [
    body('name')
    .isLength({
        min: 3
    })
    .withMessage('Name needs to be at least 3 characters')
    .matches(/^[a-zA-Z- ]+$/i)
    .withMessage('Your name can only contain letters, hyphens and spaces')
    .trim().escape(),
    body('phone')
    .isMobilePhone('en-GB')
    .withMessage('That doesn\'t seem to be a valid phone number')
    .trim()
    .escape(),
    body('subject')
    .isLength({
        min: 3
    })
    .withMessage('Subject needs to be at least 3 characters')
    .matches(/^[a-zA-Z0-9- ]+$/i)
    .withMessage('Subject can only contain letters, numbers, hyphens and spaces')
    .trim()
    .escape()
], async (req, res) => {

    if (validationResult(req).errors[0]) {
        const errs = [];
        for (let err of validationResult(req).errors) {
            errs.push({
                field: err.param,
                error: err.msg
            });
        }
        return res.send(errs);
    }

    const {
        name,
        phone,
        subject,
    } = req.body;

    const mailOptions = {
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PW
        }
    }

    const msgOptions = {
        to: SMTP_TO,
        from: SMTP_USER,
        subject: subject,
        text: `
        Name: ${name} \n
        Phone: ${phone} \n
        Subject: ${subject}
        `,
        html: `
        Name: ${name} <br> 
        Phone: ${phone} <br>
        Subject: ${subject}
        `
    }

    const transport = nodeMailer.createTransport(mailOptions);
    transport.sendMail(msgOptions, (err, info) => {
        if (err) return res.send(err);
        return res.send(info);
    });
});

app.post('/contact', [
    body('name')
    .isLength({
        min: 3
    })
    .withMessage('Name needs to be at least 3 characters')
    .matches(/^[a-zA-Z- ]+$/i)
    .withMessage('Your name can only contain letters, hyphens and spaces')
    .trim()
    .escape(),
    body('phone')
    .isMobilePhone('en-GB')
    .withMessage('That doesn\'t seem to be a valid phone number')
    .trim()
    .escape(),
    body('subject')
    .isLength({
        min: 3
    })
    .withMessage('Subject needs to be at least 3 characters')
    .matches(/^[a-zA-Z0-9- ]+$/i)
    .withMessage('Subject can only contain letters, numbers, hyphens and spaces')
    .trim()
    .escape(),
    body('email')
    .isEmail()
    .withMessage('Your email does not appear to be valid')
    .trim()
    .escape(),
    body('postcode')
    .isPostalCode('GB')
    .withMessage('Your postcode does not seem to be valid')
    .trim()
    .escape(),
    body('details')
    .isLength({
        min: 3
    })
    .withMessage('Your message needs to be at least 3 characters')
    .trim()
    .escape()
], async (req, res) => {

    if (validationResult(req).errors[0]) {
        const errs = [];
        for (let err of validationResult(req).errors) {
            errs.push({
                field: err.param,
                error: err.msg
            });
        }
        return res.send(errs);
    }

    const {
        name,
        postcode,
        phone,
        email,
        subject,
        details
    } = req.body;

    const message = `
    Name: ${name} \n
    Phone: ${phone} \n
    Postcode: ${postcode} \n
    Email: ${email} \n
    Subject: ${subject} \n
    Details: ${details} \n
    `;

    const htmlMessage = `
    Name: ${name} <br>
    Phone: ${phone} <br>
    Postcode: ${postcode} <br>
    Email: ${email} <br>
    Subject: ${subject} <br>
    Details: ${details}
    `;

    const mailOptions = {
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PW
        }
    }

    const msgOptions = {
        to: SMTP_TO,
        from: SMTP_USER,
        replyTo: email,
        subject: subject,
        text: message,
        html: htmlMessage
    }

    const transport = nodeMailer.createTransport(mailOptions);
    transport.sendMail(msgOptions, (err, info) => {
        if (err) return res.send(err);
        return res.send(info);
    });
});

const sslOptions = {
    key: fs.readFileSync(SSL_KEY),
    cert: fs.readFileSync(SSL_CERT),
    passphrase: SSL_PW
};

const httpsServer = https.createServer(sslOptions, app);

const listener = httpsServer.listen(MAIL_PORT || 60001, () => console.log(`Mail server connected on ${listener.address().port}`));