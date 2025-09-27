import { ApiError } from "../utils/ApiError.js";
import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  console.error("UNHANDLED ERROR: ", err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal Server Error",
  });
};

export { errorHandler };
