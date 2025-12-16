import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Teste o componente <About.js />.', () => {
  test('É exibido na tela um h2 com texto About Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexHeading = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(pokedexHeading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutEl = screen.getByRole('heading', { name: /about pokédex/i });
    expect(aboutEl).toBeInTheDocument();
  });

  test('O atributo src da imagem é https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);

    const pokedexImg = screen.getByRole('img', { name: /pokédex/i });

    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
