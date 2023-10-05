import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col justify-center items-center mx-auto">
    <p className="text-2xl">Page not found</p>
    <Link to="/">Go back to home</Link>
  </div>
);

export default NotFound;
