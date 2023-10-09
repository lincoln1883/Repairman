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
import Register from '../components/auth/Register';

const mockStore = configureStore([]);

describe('Register Component', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      register: {
        status: '',
        error: '',
      },
    };

    store = mockStore(initialState);
  });

  it('renders the registration form', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/register']}>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('submits the registration form', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/register']}>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    const mockUser = { name: 'Test User', email: '__test__@example.com', password: 'password123' };
    store.dispatch = jest.fn();

    fireEvent.change(nameInput, { target: { value: mockUser.name } });
    fireEvent.change(emailInput, { target: { value: mockUser.email } });
    fireEvent.change(passwordInput, { target: { value: mockUser.password } });
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
