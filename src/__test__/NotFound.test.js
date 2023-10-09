import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../components/NotFound';

describe('NotFound Component', () => {
  it('renders the "Redirecting....." text', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const redirectingText = screen.getByText('Redirecting.....');
    expect(redirectingText).toBeInTheDocument();
  });

  it('renders a link to go back to home', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const linkToHome = screen.getByText('Go back to home');
    expect(linkToHome).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
