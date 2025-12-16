import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente App.js', () => {
  test('Testar se o primeiro link deve possuir o texto "Home"', () => {
    const { history } = renderWithRouter(<App />);
    const homeEl = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeEl);
    expect(history.location.pathname).toBe('/');
  });
  test('Testar se o primeiro link deve possuir o texto "About"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutEl = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutEl);
    expect(history.location.pathname).toBe('/about');
  });
  test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteEl = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoriteEl);
    expect(history.location.pathname).toBe('/favorites');
  });
});
