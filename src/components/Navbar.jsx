import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/reducers/auth/logoutSlice';
import FooterToolbar from './FooterToolbar';

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem('user')) || [];
  const user = userInfo.data;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const links = [
    { path: '/trade', text: 'Home' },
    { path: '/trade/reserve', text: 'Reserve' },
    { path: '/trade/reservations', text: 'My Reservations' },
    { path: '/trade/add', text: 'Add Trade' },
    { path: '/trade/delete', text: 'Delete Trade' },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="w-50 flex flex-col justify-between center border-e-2">
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
      <FooterToolbar />
    </nav>
  );
};

export default Navbar;
