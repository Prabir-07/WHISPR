import http from "http";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import { app } from "./app.js";


import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";


dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);


// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);


connectDB()
.then(() => {
    server.listen(port, () => {
        console.log(`\n Server is running on port: ${port}`);
    });
})
.catch((error) => {
    console.error("MongoDB connection failed !!!", error);
});
