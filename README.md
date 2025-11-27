# Job Portal Application

A full-stack job portal application built with the MERN stack (MongoDB, Express.js, React, Node.js) that connects job seekers with recruiters.

## Features

### For Students/Job Seekers
- User registration and authentication
- Profile management with resume upload
- Browse and search job listings
- Apply for jobs
- Track application status

### For Recruiters
- Company profile management
- Post job openings
- Manage job listings
- Review applications
- Upload company logos

## Tech Stack

### Frontend
- React with Vite
- Redux Toolkit for state management
- Tailwind CSS for styling
- Radix UI components
- Axios for API calls
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Cloudinary for file uploads
- Multer for handling multipart/form-data

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Cloudinary account for file storage

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

## Local Development

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

The backend server will run on `http://localhost:8000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## Production Build

To build the application for production:

```bash
npm run build
```

This will:
1. Install backend dependencies
2. Install frontend dependencies
3. Build the frontend for production

To start the production server:

```bash
npm start
```

## Deployment on Render

### Prerequisites
1. Push your code to GitHub
2. Create a Render account at [render.com](https://render.com)
3. Have your MongoDB Atlas connection string ready
4. Have your Cloudinary credentials ready

### Deployment Steps

1. **Create a New Web Service on Render**
   - Go to your Render dashboard
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository

2. **Configure the Service**
   - **Name**: Choose a name for your service
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or choose based on your needs)

3. **Add Environment Variables**
   Go to the "Environment" section and add:
   - `MONGO_URI` - Your MongoDB Atlas connection string
   - `SECRET_KEY` - Your JWT secret key
   - `CLOUD_NAME` - Your Cloudinary cloud name
   - `API_KEY` - Your Cloudinary API key
   - `API_SECRET` - Your Cloudinary API secret
   - `PORT` - 8000 (optional, Render sets this automatically)

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your application
   - Wait for the build to complete

5. **Access Your Application**
   - Once deployed, Render will provide a URL (e.g., `https://your-app.onrender.com`)
   - Your application will be live at this URL

### Important Notes for Render Deployment

- **Free Tier Limitations**: Free tier services spin down after 15 minutes of inactivity. The first request after inactivity may take 30-60 seconds.
- **Environment Variables**: Make sure all environment variables are set correctly in Render dashboard.
- **MongoDB Atlas**: Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) or add Render's IP addresses to the whitelist.
- **CORS**: The application is configured to work with the Render deployment URL.

## Project Structure

```
jobportal-yt-main/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── middlewares/      # Custom middleware (auth, multer)
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions (db connection, etc.)
│   ├── index.js         # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom hooks
│   │   ├── redux/       # Redux store and slices
│   │   └── App.jsx      # Main app component
│   ├── public/
│   └── package.json
├── .gitignore
├── package.json         # Root package.json for deployment
└── README.md
```

## API Endpoints

### User Routes
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout
- `POST /api/v1/user/profile/update` - Update user profile

### Company Routes
- `POST /api/v1/company/register` - Register company
- `GET /api/v1/company/get` - Get all companies
- `GET /api/v1/company/get/:id` - Get company by ID
- `PUT /api/v1/company/update/:id` - Update company

### Job Routes
- `POST /api/v1/job/post` - Post a job
- `GET /api/v1/job/get` - Get all jobs
- `GET /api/v1/job/get/:id` - Get job by ID
- `GET /api/v1/job/getadminjobs` - Get recruiter's jobs

### Application Routes
- `POST /api/v1/application/apply/:id` - Apply for a job
- `GET /api/v1/application/get` - Get user's applications
- `GET /api/v1/application/:id/applicants` - Get job applicants
- `POST /api/v1/application/status/:id/update` - Update application status

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.
