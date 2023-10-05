import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <div style={{ display: 'flex', height: '100vh' }}>
    <Navbar />
    <div
      className="mx-auto w-full h-full bg-gray-100"
      style={{
        flex: 1, padding: '20px', height: '100%', overflowY: 'auto',
      }}
    >
      <Outlet />
    </div>
  </div>
);

export default Layout;
