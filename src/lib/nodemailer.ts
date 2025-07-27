import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const host = process.env.SMTP_HOST;
export const port = process.env.SMTP_PORT
  ? Number(process.env.SMTP_PORT)
  : undefined;
export const user = process.env.SMTP_USER;
export const pass = process.env.SMTP_PASS;
export const receiver = process.env.SMTP_RECEIVER;

if (!host || !port || !user || !pass || !receiver) {
  throw new Error(
    "SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_RECEIVER are required environment variables"
  );
}

export const transportOptions: SMTPTransport.Options = {
  host,
  port,
  auth: {
    user,
    pass,
  },
};

export const transport = nodemailer.createTransport(transportOptions);
