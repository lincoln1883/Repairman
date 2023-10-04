import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const links = [
    { path: '/trade', text: 'Home' },
    { path: '/trade/reserve', text: 'Reserve' },
    { path: '/trade/reservations', text: 'My Reservations' },
    { path: '/trade/add', text: 'Add Trade' },
    { path: '/trade/delete', text: 'Delete Trade' },
  ];

  return (
    <nav className="w-50">
      <div className="flex flex-col justify-around items-center m-3">
        <h1 className="text-3xl">Trade Tracker</h1>
        <div className="navbar-nav mx-auto">
          <ul>
            {links.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
