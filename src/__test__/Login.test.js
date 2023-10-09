import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import Login from '../components/auth/Login';

const mockStore = configureStore([]);

describe('Login Component', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      login: {
        status: '',
        error: '',
      },
    };

    store = mockStore(initialState);
  });

  it('renders the login form', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('submits the login form', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    const mockUser = { email: '__test__@example.com', password: 'password123' };
    store.dispatch = jest.fn();

    fireEvent.change(emailInput, { target: { value: mockUser.email } });
    fireEvent.change(passwordInput, { target: { value: mockUser.password } });
    fireEvent.click(loginButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
