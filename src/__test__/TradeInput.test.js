import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import TradeInput from '../components/TradeInput';

const mockStore = configureStore([]);

jest.mock('../utils/userStorage', () => ({
  getToken: jest.fn(() => 'sampleToken'),
  getUserRole: jest.fn(() => 'admin'),
  getUserId: jest.fn(() => 1),
}));

describe('TradeInput', () => {
  let store;
  const initialState = {
    trades: {
      trades: [],
      loading: '',
      error: '',
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders the TradeInput component', () => {
    // eslint-disable-next-line global-require
    jest.spyOn(require('../utils/userStorage'), 'getUserRole').mockReturnValue('admin');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TradeInput />
        </MemoryRouter>
      </Provider>,
    );

    const TradeName = screen.getByPlaceholderText('Trade Name');
    const Description = screen.getByPlaceholderText('Description');
    const Image = screen.getByPlaceholderText('Image URL');
    const Location = screen.getByPlaceholderText('Location');
    const Price = screen.getByPlaceholderText('Price');
    const Duration = screen.getByPlaceholderText('Duration');
    const TradeType = screen.getByPlaceholderText('Trade Type');
    const AddTrade = screen.getByRole('button', { name: 'Add Trade' });

    expect(TradeName).toBeInTheDocument();
    expect(Description).toBeInTheDocument();
    expect(Image).toBeInTheDocument();
    expect(Location).toBeInTheDocument();
    expect(Price).toBeInTheDocument();
    expect(Duration).toBeInTheDocument();
    expect(TradeType).toBeInTheDocument();
    expect(AddTrade).toBeInTheDocument();
  });

  test('should have Trade Name', async () => {
    // eslint-disable-next-line global-require
    jest.spyOn(require('../utils/userStorage'), 'getUserRole').mockReturnValue('admin');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TradeInput />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('Trade Name'), {
      target: { value: 'Mobbing Service' },
    });

    expect(screen.getByPlaceholderText('Trade Name')).toHaveValue('Mobbing Service');
  });

  test('should have Description', async () => {
    // eslint-disable-next-line global-require
    jest.spyOn(require('../utils/userStorage'), 'getUserRole').mockReturnValue('admin');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TradeInput />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'Professional mobbing services' },
    });

    expect(screen.getByPlaceholderText('Description')).toHaveValue('Professional mobbing services');
  });

  test('should have Image URL', async () => {
    // eslint-disable-next-line global-require
    jest.spyOn(require('../utils/userStorage'), 'getUserRole').mockReturnValue('admin');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TradeInput />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('Image URL'), {
      target: { value: 'http://example.com/image.jpg' },
    });

    expect(screen.getByPlaceholderText('Image URL')).toHaveValue('http://example.com/image.jpg');
  });

  test('should have Location', async () => {
    // eslint-disable-next-line global-require
    jest.spyOn(require('../utils/userStorage'), 'getUserRole').mockReturnValue('admin');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TradeInput />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('Location'), {
      target: { value: 'New York' },
    });

    expect(screen.getByPlaceholderText('Location')).toHaveValue('New York');
  });

  test('should have Price', async () => {
    // eslint-disable-next-line global-require
    jest.spyOn(require('../utils/userStorage'), 'getUserRole').mockReturnValue('admin');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TradeInput />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('Price'), {
      target: { value: '30' },
    });

    expect(screen.getByPlaceholderText('Price')).toHaveValue(30);
  });

  test('should have Duration', async () => {
    // eslint-disable-next-line global-require
    jest.spyOn(require('../utils/userStorage'), 'getUserRole').mockReturnValue('admin');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TradeInput />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('Duration'), {
      target: { value: '2 days' },
    });

    expect(screen.getByPlaceholderText('Duration')).toHaveValue('2 days');
  });

  test('should have Trade Type', async () => {
    // eslint-disable-next-line global-require
    jest.spyOn(require('../utils/userStorage'), 'getUserRole').mockReturnValue('admin');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TradeInput />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('Trade Type'), {
      target: { value: 'Service' },
    });

    expect(screen.getByPlaceholderText('Trade Type')).toHaveValue('Service');
  });
});
