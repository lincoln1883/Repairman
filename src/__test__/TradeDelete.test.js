import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TradeDelete from '../components/TradeDelete';

const mockStore = configureStore([thunk]);

// Mock the getToken function to return a sample token and getUserRole to return an user role
jest.mock('../utils/userStorage', () => ({
  getToken: jest.fn(() => 'sampleToken'),
  getUserRole: jest.fn(() => 'user'),
}));

describe('TradeDelete Component', () => {
  let store;
  const tradeData = [
    {
      id: 1,
      name: 'Trade Name',
      description: 'Trade Description',
      location: 'Trade Location',
      price: 100,
      duration: '1 hour',
      trade_type: 'Type of Trade',
      image: 'image-url',
    },
  ];

  beforeEach(() => {
    store = mockStore({
      trades: {
        status: 'idle', loading: false, error: null, trades: tradeData,
      },
    });
  });

  it('renders admin-only message when user is not an admin', () => {
    render(
      <Provider store={store}>
        <TradeDelete />
      </Provider>,
    );

    expect(screen.getByText('You must be an admin to see this page')).toBeInTheDocument();
  });

  test('renders loading message when loading', () => {
    // mock the user role to be admin
    // eslint-disable-next-line global-require
    jest.spyOn(require('../utils/userStorage'), 'getUserRole').mockReturnValue('admin');

    store = mockStore({
      trades: {
        status: 'idle', loading: true, error: null, trades: [],
      },
    });

    render(
      <Provider store={store}>
        <TradeDelete />
      </Provider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders the component correctly when the user is an admin', () => {
    // mock the user role to be admin
    // eslint-disable-next-line global-require
    jest.spyOn(require('../utils/userStorage'), 'getUserRole').mockReturnValue('admin');

    store = mockStore({
      trades: {
        status: 'success', loading: false, error: null, trades: tradeData,
      },
    });

    render(
      <Provider store={store}>
        <TradeDelete />
      </Provider>,
    );

    expect(screen.getByText('Trades Administration')).toBeInTheDocument();
  });
});
