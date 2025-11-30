import { useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
                <div className="text-center">
                    <h1 className="text-9xl font-bold text-gray-800">404</h1>
                    <h2 className="text-4xl font-semibold text-gray-700 mt-4 mb-2">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Oops! The page you're looking for doesn't exist.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-[#6A38C2] text-white rounded-md hover:bg-[#5b30a6] transition-colors"
                        >
                            Go to Home
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
