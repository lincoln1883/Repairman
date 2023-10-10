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

describe ('TradeInput', () => {
  let store;
  let initialState = {
    trades: {
      trades: [],
      loading: '',
      error:'',
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders the TradeInput component', () => {

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
    jest.spyOn(require('../utils/userStorage'), 'getUserRole').mockReturnValue('admin');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TradeInput />
        </MemoryRouter>
      </Provider>,
    );
    
  });
  

});
