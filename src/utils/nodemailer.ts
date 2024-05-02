import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "bn.astamedia.dk",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SENDER_EMAIL, // your SMTP username
    pass: process.env.SENDER_PASSWORD, // your SMTP password
  },
});
