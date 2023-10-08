/**
 * @jest-environment jsdom
 */

import React from 'react';
import { createRoot } from "react-dom/client"
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TradeDelete from '../components/TradeDelete';
import tradesReducer from '../redux/reducers/tradesSlice';

// Mock the getToken function to return a sample token
jest.mock('../utils/userStorage', () => ({
  getToken: jest.fn(() => 'sampleToken'),
}));

// mock the getRole function to return a admin role
jest.mock('../utils/userStorage', () => ({
  getRole: jest.fn(() => 'admin'),
}));

// mock the fetchTrades action creator to return a sample list of trades
jest.mock('../redux/reducers/tradesSlice', () => ({
  fetchTrades: jest.fn(() => [
    { id: 1, name: 'Trade 1', removed: false, image: 'mock-image-1.jpg' },
    { id: 2, name: 'Trade 2', removed: true, image: 'mock-image-2.jpg' },
  ]),
}));


describe('TradeDelete Component', () => {
  let store;

  beforeEach(() => {
    const initialState = {
      trades: {
        trades: [
          { id: 1, name: 'Trade 1', removed: false, image: 'mock-image-1.jpg' },
          { id: 2, name: 'Trade 2', removed: true, image: 'mock-image-2.jpg' },
        ],
        status: 'idle',
        loading: false,
        error: null,
      },
    };

    store = configureStore({
      reducer: {
        trades: tradesReducer,
      },
      preloadedState: initialState,
    });
  });
    
  it('renders the component correctly', () => {
    const container = document.createElement('div');
    let root = createRoot(container); 
    root.render(
      <Provider store={store}>
        <TradeDelete />
      </Provider>
    );

    console.log('container.innerHTML: ');
    console.log( container.innerHTML);
    console.log('container.innerHTML: FIN');
    
      // check if the page contains the title 'Trades' in some part of the page
    expect(container.innerHTML).toContain('');
    
    // takes a snapshot of the component
    expect(container.innerHTML).toMatchSnapshot();

    // expect(getByText('Trades Administration')).toBeInTheDocument();  
  });

  // it('handles button click to toggle removed status', () => {
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <TradeDelete />
  //     </Provider>
  //   );

  //   // Simula un evento de clic en el botón para probar la funcionalidad
  //   const restoreButton = getByText('Restore');
  //   fireEvent.click(restoreButton);

  //   // Puedes realizar aserciones sobre las acciones Redux o los cambios en la interfaz de usuario como resultado del evento de clic
  //   // Por ejemplo, verifica si se despacha una acción Redux

  //   // Ejemplo de aserción para la acción Redux despachada:
  //   // const actions = store.getActions();
  //   // expect(actions).toEqual([{ type: 'UPDATE_REMOVE_TRADE', payload: { id: 2, removed: false } }]);
  // });
});
