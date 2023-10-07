import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/reducers/auth/loginSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const loginStatus = useSelector((state) => state.login.status);
  const loginError = useSelector((state) => state.login.error);
  const loginLoading = useSelector((state) => state.login.status === 'loading');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const login = {
      user: {
        email,
        password,
      },
    };
    dispatch(loginUser(login));
    setEmail('');
    setPass('');
  };

  useEffect(() => {
    if (loginStatus === 'success') {
      navigate('/trade');
    }
  }, [loginStatus, navigate]);
  return (
    <div className="flex flex-col justify-center bg-gray-200 items-center mx-auto h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-2xl w-full rounded-xl px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
          <div className="mb-4">
            <h1 className="text-center text-2xl font-bold">Login</h1>
          </div>
          <div className="mb-4">
            <p className="text-center text-red-500 font-bold">
              {loginStatus === 'failed' && loginError}
              {loginLoading && 'Loading...'}
            </p>
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
              <p className="text-xs italic">Password must be (atleast 6 characters).</p>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
              Login
            </button>
          </div>
          <p className="mt-6 text-center text-neutral-800">
            Not a member?
            {' '}
            <Link
              to="/register"
              className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            >
              Sign up
            </Link
            >
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
