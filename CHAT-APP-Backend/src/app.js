import express from "express";
import connectDB from "./config/database.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();

app.use(cookieParser())
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
  })
);

connectDB()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log("error connecting to DB", err);
  });
