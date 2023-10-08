import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ReserveTdForm from '../../components/ReserveTdForm';// Replace with the correct import path

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  trades: {
    trades: [
      { id: 1, name: 'Trade 1', location: 'New York' },
      { id: 2, name: 'Trade 2', location: 'Los Angeles' },
    ],
  },
  reserve: {
    isCreated: false,
  },
};

let store;

beforeEach(() => {
  store = mockStore(initialState);
});

test('renders the form elements', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ReserveTdForm />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByLabelText('Select a City:')).toBeInTheDocument();
  expect(screen.getByLabelText('Select a Date:')).toBeInTheDocument();
  expect(screen.getByText('Create Reservation')).toBeInTheDocument();
});
