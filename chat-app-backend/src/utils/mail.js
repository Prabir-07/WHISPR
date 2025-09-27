import nodemailer from "nodemailer";
import { verificationEmailTemplate } from "../templates/verificationEmail.js";
import { welcomeEmailTemplate } from "../templates/welcomeEmail.js";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};

// Helper functions
export const sendVerificationEmail = async (
  email,
  userName,
  verificationLink
) => {
  const html = verificationEmailTemplate(userName, verificationLink);
  await sendEmail({
    email,
    subject: "Verify Your WHISPR Account",
    message: `Hi ${userName}, verify your email: ${verificationLink}`,
    html,
  });
};

export const sendWelcomeEmail = async (email, userName) => {
  const html = welcomeEmailTemplate(userName, email);
  await sendEmail({
    email,
    subject: "Welcome to WHISPR!",
    message: `Welcome ${userName}!`,
    html,
  });
};

export default sendEmail;
