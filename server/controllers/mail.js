const mailRouter = require("express").Router();
const middleware = require("../utils/middleware");
const nodemailer = require("nodemailer");
const config = require("../utils/config");
const logger = require("../utils/logger");
const multer = require("multer");

mailRouter.get("/", (req, res) => {
  res.json({ success: "Mobile Mechanics and Tyres mail server version 1.0.0" });
});

mailRouter.post(
  "/",
  multer().none(),
  middleware.validateInput,
  middleware.validateRecaptcha,
  async (req, res) => {
    try {
      const transporter = nodemailer.createTransport({
        host: config.MAILER_HOST,
        port: config.MAILER_PORT,
        auth: {
          user: config.MAILER_USER,
          pass: config.MAILER_USER_PASS,
        },
      });
      const mailerInfo = middleware.getMailerInfo(req.body);
      logger.info("Sending message via Nodemailer");
      const response = await transporter.sendMail(mailerInfo);
      logger.info(response);
      res.json({
        success: true,
        msg: "Your message has been sent successfully",
      });
    } catch (error) {
      logger.error(error.message);
      res.status(422).json({ error: true, msg: error.message });
    }
  }
);

module.exports = mailRouter;
