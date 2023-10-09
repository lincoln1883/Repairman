import '@testing-library/jest-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  it('renders the Navbar component', () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>,
    );

    const navbarElement = screen.getByText('HandyHome');
    expect(navbarElement).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
