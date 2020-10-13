const logger = require("./logger");
const config = require("./config");
const fetch = require("node-fetch");
const { body, validationResult } = require("express-validator");

const requestLogger = (req, res, next) => {
  logger.info(`Path: ${req.path}`);
  logger.info(`Method: ${req.method}`);
  logger.info(`Body: ${req.body}`);
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "The requested path is not recognised" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  res.status(403).json({
    success: false,
    error: error.message,
  });
  next(error);
};

const validateRecaptcha = async (req, res, next) => {
  try {
    const reply = await fetch(config.RECAPTCHA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${config.RECAPTCHA_SECRET}&response=${req.body.token}`,
    });

    const data = await reply.json();

    return data.success !== true
      ? res.status(422).json({
          success: false,
          msg:
            "Google seems to think you're a bot. Please resubmit the form and verify that you are not.",
        })
      : next();
  } catch (error) {
    next(error);
  }
};

const getMailerInfo = (postData) => {
  const returnObject = {
    from: `Mobile Mechanics and Tyres <${config.MAILER_USER}>`,
    to: config.MAILER_RECIPIENT,
    replyTo: postData.email,
  };

  if (!postData.details) {
    returnObject.subject = `Callback requested from ${postData.name}`;
    returnObject.text = `
    You have been requested to call ${postData.name} on ${postData.phone} about ${postData.subject}.
    `;
  } else {
    returnObject.subject = `Message from ${postData.name} Regarding: ${postData.subject}`;
    returnObject.text = `
      Customer Name: ${postData.name} \n
      Phone Number: ${postData.phone} \n
      Postcode: ${postData.postcode} \n
      Email Address: ${postData.email} \n
      Subject: ${postData.subject} \n
      Details: ${postData.details}
    `;
    returnObject.html = `
    <div style="display:block;line-height: 1.7;background-color: #FGFGFG; padding: 1rem; font-size: 1.25rem; color: rgba(0,0,0,0.9);">
    <div style="display:block">
      Customer Name: ${postData.name}
    </div>
    <div style="display:block">
      Phone Number: ${postData.phone}
    </div>
    <div style="display:block">
      Postcode: ${postData.postcode}
    </div>
    <div style="display:block">
      Email Address: ${postData.email}
    </div>
    <div style="display:block">
      Subject: ${postData.subject}
    </div>
    <div style="display:block">
      Details: ${postData.details}
    </div>
    </div>
    `;
  }
  console.log(returnObject);
  return returnObject;
};

const validateInput = async (req, res, next) => {
  try {
    const validations = [
      body("name")
        .isLength({
          min: 3,
        })
        .withMessage("Name needs to be at least 3 characters")
        .matches(/^[a-zA-Z- ]+$/i)
        .withMessage("Your name can only contain letters, hyphens and spaces")
        .trim()
        .escape(),
      body("phone")
        .isMobilePhone("en-GB")
        .withMessage("That doesn't seem to be a valid phone number")
        .trim()
        .escape(),
      body("subject")
        .isLength({
          min: 3,
        })
        .withMessage("Subject needs to be at least 3 characters")
        .matches(/^[a-zA-Z0-9- ]+$/i)
        .withMessage(
          "Subject can only contain letters, numbers, hyphens and spaces"
        )
        .trim()
        .escape(),
    ];
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    return errors.isEmpty()
      ? next()
      : res.status(422).json({
          success: false,
          errors: errors.array(),
        });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateRecaptcha,
  unknownEndpoint,
  requestLogger,
  errorHandler,
  getMailerInfo,
  validateInput,
};
