import { transporter } from "./mailtrap.config.js";
import dotenv from "dotenv";
dotenv.config();

const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(90deg, #4F46E5, #7C3AED);
      padding: 20px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .header h1 {
      color: white;
      margin: 0;
    }
    .content {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 0 0 10px 10px;
      border: 1px solid #ddd;
    }
    .verify-button {
      display: inline-block;
      padding: 12px 24px;
      background: linear-gradient(90deg, #4F46E5, #7C3AED);
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin: 16px 0;
    }
    .code-container {
      background: #f1f1f1;
      padding: 15px;
      border-radius: 5px;
      margin: 15px 0;
      text-align: center;
    }
    .verification-code {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 5px;
      color: #4F46E5;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Verify Your Email</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div class="code-container">
      <div class="verification-code">{verificationCode}</div>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(90deg, #10B981, #059669);
      padding: 20px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .header h1 {
      color: white;
      margin: 0;
    }
    .content {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 0 0 10px 10px;
      border: 1px solid #ddd;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Reset Successful</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>Your password has been successfully reset. You can now log in with your new password.</p>
    <p>If you didn't request this password reset, please contact our support team immediately.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(90deg, #F59E0B, #D97706);
      padding: 20px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .header h1 {
      color: white;
      margin: 0;
    }
    .content {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 0 0 10px 10px;
      border: 1px solid #ddd;
    }
    .reset-button {
      display: inline-block;
      padding: 12px 24px;
      background: linear-gradient(90deg, #F59E0B, #D97706);
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin: 16px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Reset</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>You requested to reset your password. Click the button below to reset it:</p>
    <a href="{resetURL}" class="reset-button">Reset Password</a>
    <p>Or copy and paste this URL into your browser:</p>
    <p>{resetURL}</p>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
</body>
</html>
`;

const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(90deg, #10B981, #059669);
      padding: 20px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .header h1 {
      color: white;
      margin: 0;
    }
    .content {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 0 0 10px 10px;
      border: 1px solid #ddd;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Welcome to Our App!</h1>
  </div>
  <div class="content">
    <p>Hello {name},</p>
    <p>Welcome to our application! Your email has been successfully verified.</p>
    <p>You can now enjoy all the features of our platform.</p>
    <p>If you have any questions, feel free to reach out to our support team.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
</body>
</html>
`;

export const sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    ),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error(`Failed to send verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Welcome to Our App!",
    html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Failed to send welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Password Reset",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(/{resetURL}/g, resetURL),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error(`Failed to send password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Password Reset Successful",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(
      "Password reset success email sent successfully:",
      info.messageId
    );
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error(`Failed to send password reset success email: ${error}`);
  }
};
