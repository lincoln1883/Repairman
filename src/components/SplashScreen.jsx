import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/splashscreen.css';
import { getUserData } from '../utils/userStorage';

const SplashScreen = () => {
  const navigate = useNavigate();

  const currentUser = getUserData();

  useEffect(() => {
    if (currentUser) {
      navigate('/trade');
    }
  }, [currentUser, navigate]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/register');
  };

  return (
    <div className="flex h-screen justify-center items-center splash-container">
      <div className="splash p-10 shadow-2xl text-center ms-2 me-2">
        {!currentUser && (<p className="text-gray-600 mb-6">Please login or sign up to continue..</p>)}
        <h1 className="splash-head text-4xl font-semibold mb-4">Handy Home Hub</h1>
        <p className="splash-subhead text-lg text-gray-600 mb-6">
          Trade appointment app for tradesmen and customers
        </p>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={handleSignup}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
