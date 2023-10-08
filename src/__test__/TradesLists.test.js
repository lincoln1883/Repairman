import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TradesList from '../components/TradesList';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('TradesList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      trades: {
        trades: [
          {
            id: 1,
            name: 'Trade 1',
            price: 100,
            location: 'Location 1',
            image: 'image1.jpg',
          },
          {
            id: 2,
            name: 'Trade 2',
            price: 200,
            location: 'Location 2',
            image: 'image2.jpg',
          },
        ],
        loading: false,
        error: null,
      },
    });
  });

  it('renders trade items when data is loaded', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <TradesList />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      const trade1 = screen.getByText('Trade 1');
      const trade2 = screen.getByText('Trade 2');

      expect(trade1).toBeInTheDocument();
      expect(trade2).toBeInTheDocument();
    });
  });

  it('navigates to trade detail page when a trade item is clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <TradesList />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      const tradeLink = screen.getByText('Trade 1');
      expect(tradeLink).toBeInTheDocument();

      tradeLink.click();
    });
  });

  it('displays a loading message when data is loading', async () => {
    store = mockStore({
      trades: {
        trades: [],
        loading: true, // Simulate loading state
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TradesList />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      const loadingMessage = screen.getByText(/Loading/i);
      expect(loadingMessage).toBeInTheDocument();
    });
  });

  it('displays an error message when there is an error', async () => {
    store = mockStore({
      trades: {
        trades: [],
        loading: false,
        error: 'Network Error', // Simulate an error
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TradesList />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      const errorMessage = screen.getByText(/Error:Network Error/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
