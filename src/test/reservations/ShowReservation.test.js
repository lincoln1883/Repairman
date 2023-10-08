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


