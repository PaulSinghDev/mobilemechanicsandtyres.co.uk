const {
    body,
    validationResult,
} = require('express-validator');
const env = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const nodeMailer = require('nodemailer');
const helmet = require('helmet');
const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_PW,
    SMTP_USER,
    MAIL_PORT
} = env.parsed;

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"]
    }
}))
app.use(cors());

app.use(express.json());

app.post('/quick', async (req, res) => {
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
        to: 'iamjustp@gmail.com',
        from: SMTP_USER,
        subject: subject,
        text: `${name} ${phone} ${subject}`,
        html: `${name} ${phone} ${subject}`
    }

    const transport = nodeMailer.createTransport(mailOptions);
    transport.sendMail(msgOptions, (err, info) => {
        if (err) return res.send(err);
        return res.send(info);
    });
});

app.post('/contact', async (req, res) => {
    const {
        name,
        postcode,
        phone,
        email,
        subject,
        details
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
        to: 'iamjustp@gmail.com',
        from: SMTP_USER,
        replyTo: email,
        subject: subject,
        text: details,
        html: details
    }

    const transport = nodeMailer.createTransport(mailOptions);
    transport.sendMail(msgOptions, (err, info) => {
        if (err) return res.send(err);
        return res.send(info);
    });
});

app.listen(MAIL_PORT || 8080, () => console.log('Mail server connected on 8080'));