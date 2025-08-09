import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

console.log("Attempting to send email via Gmail SMTP...");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sender = `"Prabir" <${process.env.GMAIL_USER}>`;
const recipients = "prabirkumarpanda90@gmail.com";

transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: "Hello from Nodemailer + Gmail",
    text: "This is a real email sent from my Node.js app to Gmail!",
  })
  .then((info) => {
    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
  })
  .catch(console.error);
