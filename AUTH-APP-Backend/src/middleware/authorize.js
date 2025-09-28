import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

import dotenv from "dotenv";
dotenv.config();

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided, authorization denied.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token, authorization denied.",
      });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found, authorization denied.",
      });
    }

    req.userId = decoded.userId;
    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during token verification.",
    });
  }
};
