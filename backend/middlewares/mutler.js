import multer from "multer";

const storage = multer.memoryStorage();

// File filter to validate file types
const fileFilter = (req, file, cb) => {
    console.log('File upload attempt:', {
        fieldname: file.fieldname,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size
    });

    // Allow PDFs for resumes and images for logos/profile pictures
    const allowedMimeTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type. Allowed types: PDF for resumes, JPEG/PNG/GIF/WEBP for images. Received: ${file.mimetype}`), false);
    }
};

// Configure multer with file size limits and validation
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
    fileFilter: fileFilter
});

export const singleUpload = upload.single("file");