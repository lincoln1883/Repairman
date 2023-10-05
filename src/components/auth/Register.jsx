import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/reducers/auth/registerSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.register.status);

  const handleRegister = (e) => {
    e.preventDefault();
    const register = {
      user: {
        name,
        email,
        password,
      },
    };
    dispatch(registerUser(register));

    setName('');
    setEmail('');
    setPass('');
  };

  useEffect(() => {
    if (status === 'success') {
      navigate('/login');
      window.location.reload();
    }
  }, [status, navigate]);

  return (
    <div className="flex flex-col justify-center items-center mx-auto h-screen">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleRegister}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Name
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-gray-600 text-xs italic">Please enter you name.</p>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-red-500 text-xs italic">Please enter your email.</p>
            </label>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="***********"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPass(e.target.value)}
              />
              <p className="text-red-500 text-xs italic">Please choose a password.</p>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
              Sign Up
            </button>
          </div>
          <p className="mt-6 text-center text-neutral-800">
            Have an Account?
            {' '}
            <Link
              to="/login"
              className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            >
              login
            </Link
            >
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
