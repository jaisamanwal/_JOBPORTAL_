import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Validate Cloudinary credentials
if (!process.env.CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ CLOUDINARY CONFIGURATION ERROR:');
    console.error('Missing Cloudinary credentials in .env file');
    console.error('Required variables: CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
    console.error('Current values:', {
        CLOUD_NAME: process.env.CLOUD_NAME ? '✓ Set' : '✗ Missing',
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? '✓ Set' : '✗ Missing',
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? '✓ Set' : '✗ Missing'
    });
} else {
    console.log('✓ Cloudinary credentials loaded successfully');
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;