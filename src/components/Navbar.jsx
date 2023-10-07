import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/reducers/auth/logoutSlice';
import FooterToolbar from './FooterToolbar';
import { getUserData } from '../utils/userStorage';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { role, name } = getUserData().data;
  const user = { role, name };

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

  const toggleMenu = () => {
    setMenu(!menu);
  };
  const closeMenu = () => {
    setMenu(false);
  };
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={toggleMenu}
        className="items-start p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden
         hover:bg-gray-100 focus:outline-none focus:ring-2
         focus:ring-gray-200
         dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        style={{ position: 'absolute', margin: 0 }}
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
        </svg>
      </button>
      <aside
        id="default-sidebar"
        aria-label="Sidebar"
        className={`fixed top-0 left-0 z-40 w-full h-screen bg-white transition-transform sm:relative sm:w-64 ${
          menu ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        <nav className="h-screen flex flex-col justify-between items-center border-e-2 p-3">
          <h1
            className="text-3xl mt-4 -rotate-6 text-bold underline"
            style={headerStyle}
          >
            HandyHome
          </h1>
          { user.role === 'admin' && (
            <>
              <div className="navbar-nav">
                <ul>
                  {adminLinks.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="text-lg font-serif pt-2" onClick={closeMenu}>{link.text}</Link>
                    </li>
                  ))}
                  <button type="button" className="text-lg font-serif pt-2" onClick={handleLogout}>Logout</button>
                </ul>
              </div>
            </>
          )}
          { user.role === 'user' && (
            <>
              <div className="navbar-nav">
                <ul>
                  {userLinks.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="text-lg font-serif pt-2" onClick={closeMenu}>{link.text}</Link>
                    </li>
                  ))}
                  <button type="button" className="text-lg font-serif pt-2" onClick={handleLogout}>Logout</button>
                </ul>
              </div>
            </>
          )}
          <FooterToolbar />
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
