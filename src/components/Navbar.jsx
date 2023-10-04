import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, redirect } from 'react-router-dom';
import { logoutUser } from '../redux/reducers/auth/logoutSlice';

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem('user')) || [];
  const user = userInfo.data;

  const dispatch = useDispatch();

  const links = [
    { path: '/', text: 'Home' },
    { path: '/reserve', text: 'Reserve' },
    { path: '/reservations', text: 'My Reservations' },
    { path: '/add', text: 'Add Trade' },
    { path: '/delete', text: 'Delete Trade' },
    { path: '/login', text: 'Login' },
    { path: '/register', text: 'Register' },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  if (!user) {
    redirect('/home');
  }

  return (
    <nav className="w-50">
      <div className="flex flex-col justify-around items-center m-3">
        <h1 className="text-3xl">Trade Tracker</h1>
        <h2 className="text-xl">
          Welcome
          {' '}
          { user ? user.name : 'Guest'}
        </h2>
        <div className="navbar-nav mx-auto">
          <ul>
            {links.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.text}</Link>
              </li>
            ))}
            <button type="button" onClick={handleLogout}>Logout</button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
