import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { appRoutes } from '@/routes/routeDefinitions';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number with Animation */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EC2323] to-[#ff4d4d] leading-none animate-pulse">
            404
          </h1>
        </div>

        {/* Main Message */}
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#272727]">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl font-sans text-gray-600 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track!
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-[#EC2323] animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 rounded-full bg-[#EC2323] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-[#EC2323] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            className="bg-[#EC2323] hover:bg-[#d02020] text-white font-sans px-8 py-6 rounded-lg text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Link to={appRoutes.home} className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go to Homepage
            </Link>
          </Button>
          
          <Button
            variant="outline"
            className="border-2 border-gray-300 hover:border-[#EC2323] text-[#272727] hover:text-[#EC2323] font-sans px-8 py-6 rounded-lg text-base font-medium transition-all duration-300 hover:scale-105"
            onClick={() => window.history.back()}
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </span>
          </Button>
        </div>

        {/* Additional Help Text */}
        <p className="mt-12 text-sm font-sans text-gray-500">
          If you believe this is an error, please{' '}
          <Link 
            to={appRoutes.contact?.main || '#'} 
            className="text-[#EC2323] hover:underline font-medium"
          >
            contact us
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;

