import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

test('renders App component', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // For example, if you want to check if the "Handy Home" text is present:
  expect(getByText(/Handy Home/i)).toBeInTheDocument();
});
