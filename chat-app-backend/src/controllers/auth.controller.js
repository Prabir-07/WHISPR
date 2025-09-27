import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../utils/mail.js";
import crypto from "crypto";

const signup = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "User with email or username already exists"
    );
  }

  const emailVerificationToken = crypto.randomBytes(32).toString("hex");
  const emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const newUser = await User.create({
    fullName,
    email,
    username,
    password,
    emailVerificationToken,
    emailVerificationExpiry,
  });

  const userToReturn = await User.findById(newUser._id).select(
    "-password -emailVerificationToken"
  );

  if (!userToReturn) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while registering the user"
    );
  }

  try {
    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${emailVerificationToken}`;
    await sendVerificationEmail(email, fullName, verificationLink);
  } catch (error) {
    console.error("Error sending verification mail: ", error);
  }

  res
    .status(StatusCodes.CREATED)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        userToReturn,
        "User registered successfully"
      )
    );
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Invalid or expired verification token"
    );
  }

  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Invalid or expired verification token"
    );
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;
  await user.save();

  try {
    await sendWelcomeEmail(user.email, user.fullName);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }

  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        {},
        "Email verified successfully! Welcome to WHISPR"
      )
    );
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  if (user.isEmailVerified) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Email is already verified");
  }

  const emailVerificationToken = crypto.randomBytes(32).toString("hex");
  const emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

  user.emailVerificationToken = emailVerificationToken;
  user.emailVerificationExpiry = emailVerificationExpiry;
  await user.save();

  try {
    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${emailVerificationToken}`;
    await sendVerificationEmail(email, user.fullName, verificationLink);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to send verification email"
    );
  }

  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        {},
        "Verification email sent successfully"
      )
    );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Email and password are required"
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  if (!user.isEmailVerified) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Please verify your email before logging in"
    );
  }

  const Token = user.generateJwtToken();
  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(StatusCodes.OK)
    .cookie("Token", Token, options)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { user: loggedInUser, Token },
        "Login successful"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(StatusCodes.OK)
    .clearCookie("Token", options)
    .json(new ApiResponse(StatusCodes.OK, {}, "Logout successful"));
});

export { signup, login, logout, verifyEmail, resendVerificationEmail };
