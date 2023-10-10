import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import TradeInput from '../components/TradeInput';

const mockStore = configureStore([]);

describe ('TradeInput', () => {
  let initialState = {
    trades: {
      trades: [],
      loading: '',
      error:'',
    },
  };

  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders the TradeInput component', () => {
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

  test('submits the Add Trade form', async () => {

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

    const mockAddTrade = {
      name: 'Mobbing Service',
      description: 'Professional mobbing services',
      image: 'http://www.example.com/image.jpg',
      location: 'New York',
      price: '30',
      duration: '2 days',
      trade_type: 'Service',
    };

    fireEvent.change(TradeName, { target: { value: mockAddTrade.name } });
    fireEvent.change(Description, { target: { value: mockAddTrade.description } });
    fireEvent.change(Image, { target: { value: mockAddTrade.image } });
    fireEvent.change(Location, { target: { value: mockAddTrade.location } });
    fireEvent.change(Price, { target: { value: mockAddTrade.price } });
    fireEvent.change(Duration, { target: { value: mockAddTrade.duration } });
    fireEvent.change(TradeType, { target: { value: mockAddTrade.trade_type } });
    fireEvent.click(AddTrade);

    expect(store.dispatch).toHaveBeenCalledTimes(1);

  });

});
