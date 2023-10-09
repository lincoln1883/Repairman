import '@testing-library/jest-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Layout from '../components/Layout';

describe('Testing the Layout Component', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Layout />
        </Router>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
