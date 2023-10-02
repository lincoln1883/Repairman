import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <div style={{ display: 'flex', height: '100vh' }}>
    <Navbar />
    <div
      className="flex justify-center"
      style={{
        flex: 1, padding: '20px', height: '100%', overflowY: 'auto',
      }}
    >
      <Outlet />
    </div>
  </div>
);

export default Layout;
