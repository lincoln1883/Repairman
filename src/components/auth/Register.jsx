import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/reducers/auth/registerSlice';
import '../../styles/login.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerStatus = useSelector((state) => state.register.status);
  const registerError = useSelector((state) => state.register.error);
  const registerLoading = useSelector((state) => state.register.status === 'loading');

  const handleRegister = async (e) => {
    e.preventDefault();
    const register = {
      user: {
        name,
        email,
        password,
      },
    };

    // Dispatch the registration action and handle errors
    try {
      await dispatch(registerUser(register));
      // If registration succeeds, navigate to the login page
      if (registerStatus === 'success') {
        navigate('/login');
      }
    } catch (error) {
      // Registration failed, error.message will contain the API error message
      console.error('Registration Error:', error.message);
    }
  };

  useEffect(() => {
    if (registerStatus === 'failed') {
      console.error('Registration reduxs Error:', registerError);
    }
  }, [registerStatus, registerError]);

  return (
    <div className="flex flex-col justify-center bg-white items-center mx-auto h-screen">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-2xl w-full rounded-xl px-8 pt-6 pb-8 mb-4 boxdecor"
          onSubmit={handleRegister}
        >

          <div className="mb-4">
            <h1 className="text-center text-2xl font-bold mb-2">Sign Up</h1>
            <p className="text-center text-gray-600 text-xs">
              Please fill in this form to create an account!
            </p>
            <p className="text-center text-red-500 font-bold">
              {registerStatus === 'failed' && registerError.status.message}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Name
              <input
                className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-gray-600 text-xs italic">Please enter your name.</p>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
              <input
                className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs italic">Please enter your email.</p>
            </label>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
              <input
                className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPass(e.target.value)}
              />
              <p className="text-xs italic">Please choose a password.</p>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full loginBtn ${
                registerLoading ? 'cursor-not-allowed' : ''
              }`}
              type="submit"
              disabled={registerLoading}
            >
              {registerLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
          <p className="mt-6 text-center text-neutral-800">
            Have an Account?
            {' '}
            <Link
              to="/login"
              className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600 signup"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
