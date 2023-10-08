import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ShowReservation from '../../components/ShowReservations';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  reservations: {
    reservations: [],
  },
  reserve: {
    msg: 'Success message',
  },
};

let store;

beforeEach(() => {
  store = mockStore(initialState);
});

test('renders component with "Reservations" text', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ShowReservation />
      </MemoryRouter>
    </Provider>,
  );
    const loadingMessage = screen.getByText('Reservations');
    expect(loadingMessage).toBeInTheDocument();
});


test('renders component with reservations', async () => {
  const reservationsData = [
    { id: 1, trade: { name: 'Trade 1' }, date: '2023-10-09T12:00:00Z' },
    { id: 2, trade: { name: 'Trade 2' }, date: '2023-10-10T14:00:00Z' },
  ];

  const updatedState = {
    ...initialState,
    reservations: { reservations: reservationsData },
  };

  store = mockStore(updatedState);

  render(
    <Provider store={store}>
      <MemoryRouter>
        <ShowReservation />
      </MemoryRouter>
    </Provider>,
  );

  const trade1 = screen.getByText('Trade 1');
  const trade2 = screen.getByText('Trade 2');

  expect(trade1).toBeInTheDocument();
  expect(trade2).toBeInTheDocument();
});
