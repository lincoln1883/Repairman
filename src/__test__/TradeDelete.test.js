/**
 * @jest-environment jsdom
 */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TradeDelete from '../components/TradeDelete';

// Mock the getToken function to return a sample token
jest.mock('../utils/userStorage', () => ({
  getToken: jest.fn(() => 'sampleToken'),
}));

// mock the getRole function to return a admin role
jest.mock('../utils/userStorage', () => ({
  getUserRole: jest.fn(() => 'admin'),
}));

// mock the fetchTrades action creator to return a sample list of trades
jest.mock('../redux/reducers/tradesSlice', () => ({
  fetchTrades: jest.fn(() => ({
    type: 'trades/fetchTrades/fulfilled',
    payload: [
      {
        id: 1, name: 'Trade 1', removed: false, image: 'mock-image-1.jpg',
      },
      {
        id: 2, name: 'Trade 2', removed: true, image: 'mock-image-2.jpg',
      },
    ],
  })),
}));


describe('TradeDelete Component', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders the component correctly', () => {
    const store = configureStore({
      reducer: {
        trades: () => ({ status: 'idle',
          loading : false,
          error: null,
          trades : [] }),
      },
    });

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <TradeDelete />
      </Provider>,
    );

    expect(getByText(/Trades Administration/i)).toBeInTheDocument();
  });

  test('renders loading message when loading', () => {
    const store = configureStore({
      reducer: {
        trades: () => ({ status: 'idle', loading: true, error: null, trades: [] }),
      },
    });
  
    const { getByText } = render(
      <Provider store={store}>
        <TradeDelete />
      </Provider>,
    );
  
    expect(getByText('Loading...')).toBeInTheDocument();
  });
  
  test('renders admin-only message when user is not an admin', () => {
    // Mock getUserRole to return a non-admin role
    jest.spyOn(require('../utils/userStorage'), 'getUserRole').mockReturnValue('user');
  
    const store = configureStore({
      reducer: {
        trades: () => ({ status: 'idle', loading: false, error: null, trades: [] }),
      },
    });
  
    const { getByText } = render(
      <Provider store={store}>
        <TradeDelete />
      </Provider>,
    );
  
    expect(getByText('You must be an admin to see this page')).toBeInTheDocument();
  });
});
