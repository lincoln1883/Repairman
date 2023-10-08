import React from 'react';
import { render, screen} from '@testing-library/react';
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

test('renders the form elements', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ReserveForm/>
      </MemoryRouter>
    </Provider>,
  );

  expect(screen.getByLabelText('Select a Trade:')).toBeInTheDocument();
  expect(screen.getByLabelText('Select a City:')).toBeInTheDocument();
  expect(screen.getByLabelText('Select a Date:')).toBeInTheDocument();
  expect(screen.getByText('Create Reservation')).toBeInTheDocument();
});
