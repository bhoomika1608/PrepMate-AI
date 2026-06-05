import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrainCircuit } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
              <BrainCircuit className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl text-gray-900">
                PrepMate AI
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700">
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
