import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../App';

test('renders the Splash page for the root path', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </MemoryRouter>,
  );

  const splashText = screen.getByText('Trade appointment app for tradesmen and customers');
  expect(splashText).toBeInTheDocument();
});

test('renders the Login page for the /login path', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Route path="/login" element={<App />} />
    </MemoryRouter>,
  );

  const loginText = screen.getByText('Login Page');
  expect(loginText).toBeInTheDocument();
});
