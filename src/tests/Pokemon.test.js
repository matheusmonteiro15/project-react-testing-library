import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/pikachu/i)).toHaveTextContent(/pikachu/i);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/electric/i);
    expect(screen.getByText(/average weight: 6\.0 kg/i)).toHaveTextContent(/average weight: 6\.0 kg/i);
    expect(screen.getByRole('img', { name: /pikachu sprite/i }).src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(screen.getByRole('img', { name: /pikachu sprite/i }).alt).toBe('Pikachu sprite');
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const pokeMoreDetails = screen.getByRole('link', { name: 'More details' });
    expect(pokeMoreDetails).toBeInTheDocument();
  });
  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const pokeMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeMoreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemon/25');
  });
  test('Teste se existe um ícone de estrela nos Pokémon favoritados:', () => {
    renderWithRouter(<App />);
    const pokeMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeMoreDetails);
    const pokeCheck = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(pokeCheck);
    const skull = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(skull).toBeInTheDocument();
    expect(skull.src).toBe('http://localhost/star-icon.svg');
    expect(skull.alt).toBe('Pikachu is marked as favorite');
  });
});
