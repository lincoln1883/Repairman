import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
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

test('submits the form', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/trade/1/reserve']}>
        <Routes>
          <Route path="/trade/:tradeId/reserve" element={<ReserveTdForm />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  fireEvent.change(screen.getByLabelText('Select a City:'), {
    target: { value: 'New York' },
  });

  fireEvent.change(screen.getByLabelText('Select a Date:'), {
    target: { value: '2023-10-09' },
  });

  const createReservationButton = screen.getByText('Create Reservation');
  fireEvent.click(createReservationButton);
  const actions = store.getActions();

  const expectedActionType = 'reservation/createReservation/pending';

  const submittedAction = actions.find((action) => action.type === expectedActionType);
  expect(submittedAction).toBeTruthy();
});

test('displays loading message when trades are not available', async () => {
  const loadingText = 'Loading...';
  const loadingState = {
    ...initialState,
    trades: {
      trades: null,
    },
  };
  store = mockStore(loadingState);

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/trade/1/reserve']}>
        <Routes>
          <Route path="/trade/:tradeId/reserve" element={<ReserveTdForm />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText(loadingText)).toBeInTheDocument();
});

