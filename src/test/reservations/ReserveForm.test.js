import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ReserveForm from '../../components/ReserveForm';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  reservations: {
    reservations: [],
  },
  trades: {
    trades: [
      { id: 1, name: 'Trade 1', location: 'New York' },
      { id: 2, name: 'Trade 2', location: 'Los Angeles' },
    ],
  },
  reserve: {
    msg: 'Success message',
  },
};
let store;

beforeEach(() => {
  store = mockStore(initialState);
});


test('submits the form', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ReserveForm />
      </MemoryRouter>
    </Provider>,
  );
  fireEvent.click(screen.getByText('Create Reservation'));

  const actions = store.getActions();
  const expectedType = 'reservation/createReservation/pending';
  const hasExpectedAction = actions.some(action => action.type === expectedType);

  expect(hasExpectedAction).toBeTruthy();
});



test('selects a trade', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ReserveForm />
      </MemoryRouter>
    </Provider>,
  );

  fireEvent.change(screen.getByLabelText('Select a Trade:'), {
    target: { value: '1' },
  });
  expect(screen.getByLabelText('Select a Trade:')).toHaveValue('1');
});


test('selects a city', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ReserveForm />
      </MemoryRouter>
    </Provider>,
  );

  fireEvent.change(screen.getByLabelText('Select a City:'), {
    target: { value: 'New York' },
  });
  expect(screen.getByLabelText('Select a City:')).toHaveValue('New York');
});


test('selects a date', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ReserveForm />
      </MemoryRouter>
    </Provider>,
  );

  fireEvent.change(screen.getByLabelText('Select a Date:'), {
    target: { value: '2023-10-09' },
  });
  expect(screen.getByLabelText('Select a Date:')).toHaveValue('2023-10-09');
});


test('displays an error message', () => {
  const msg = 'Reservation failed.';
  const errorState = {
    ...initialState,
    reserve: {
      ...initialState.reserve,
      msg: msg,
    },
  };

  store = mockStore(errorState);

  render(
    <Provider store={store}>
      <MemoryRouter>
        <ReserveForm />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByText(msg)).toBeInTheDocument();
});

