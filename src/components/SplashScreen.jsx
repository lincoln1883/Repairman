import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/splashscreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  function handleHome() {
    navigate('/trade');
  }

  return (
    <div className="flex h-screen justify-center items-center splash-container">
      <div className="splash p-10 shadow-2xl text-center">
        <h1 className="splash-head text-4xl font-semibold mb-4">Welcome</h1>
        <p className="splash-subhead text-lg text-gray-600 mb-6">
          A Trade reservation system
        </p>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={handleHome}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleHome}
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
