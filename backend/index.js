import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const envPath = path.join(__dirname, "./.env");
console.log('Loading env from', envPath, fs.existsSync(envPath));
dotenv.config({ path: envPath });
console.log('MONGO_URI exists', !!process.env.MONGO_URI);
// connectDB();
const PORT = process.env.PORT || 8000;
const app = express();

const _dirname = path.join(__dirname, '..');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'], credentials: true }));

// Multer error handling middleware
app.use((err, req, res, next) => {
    if (err.name === 'MulterError') {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'File size too large. Maximum size is 10MB.',
                success: false
            });
        }
        return res.status(400).json({
            message: `File upload error: ${err.message}`,
            success: false
        });
    } else if (err) {
        return res.status(400).json({
            message: err.message || 'An error occurred during file upload.',
            success: false
        });
    }
    next();
});



// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_, res) => {
    res.sendFile(path.join(_dirname, "frontend", "dist", "index.html"));
});


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})