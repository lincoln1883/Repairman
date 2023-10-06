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

  const adminLinks = [
    { path: '/trade', text: 'Home' },
    { path: '/trade/reserve', text: 'Reserve' },
    { path: '/trade/reservations', text: 'My Reservations' },
    { path: '/trade/add', text: 'Add Trade' },
    { path: '/trade/delete', text: 'Delete Trade' },
  ];

  const userLinks = [
    { path: '/trade', text: 'Home' },
    { path: '/trade/reserve', text: 'Reserve' },
    { path: '/trade/reservations', text: 'My Reservations' },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const headerStyle = {
    fontFamily: 'Dancing Script',
  };

  return (
    <nav className="w-50 bg-cyan-600 text-white h-screen flex flex-col justify-between">
      <div className="p-4">
        <h1 className="text-2xl mt-4 mb-8" style={headerStyle}>
          HandyHome
        </h1>
        {user?.role === 'admin' && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Signed in as
              {' '}
              {user.name}
            </h2>
            <ul>
              {adminLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="block text-lg font-semibold py-2 hover:bg-blue-700 hover:text-white rounded-md transition duration-300"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        {user?.role === 'user' && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Signed in as
              {' '}
              {user.name}
            </h2>
            <ul>
              {userLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="block text-lg font-semibold py-2 hover:bg-blue-700 hover:text-white rounded-md transition duration-300"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="text-lg font-semibold py-2 bg-red-600 hover:bg-red-700 transition duration-300"
      >
        Logout
      </button>
      <FooterToolbar />
    </nav>
  );
};

export default Navbar;
