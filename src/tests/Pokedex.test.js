import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente Pokedex.js', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const existPokemon = screen.getByRole('heading', { name: /encountered pokémon/i, level: 2 });
    expect(existPokemon).toBeInTheDocument();
    expect(existPokemon).toHaveTextContent('Encountered Pokémon');
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', () => {
    renderWithRouter(<App />);
    const currentPokemon = screen.getByText(/pikachu/i);
    expect(currentPokemon).toBeInTheDocument();
    expect(currentPokemon).toHaveTextContent('Pikachu');
    const nextPokemon = screen.getByTestId('next-pokemon');
    expect(nextPokemon).toBeInTheDocument();
    expect(nextPokemon).toHaveTextContent('Próximo Pokémon');
    userEvent.click(nextPokemon);
    const newPokemon = screen.getByText(/Charmander/i);
    expect(newPokemon).toBeInTheDocument();
    expect(newPokemon).toHaveTextContent('Charmander');
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getAllByRole('link', { name: /more details/i });
    expect(moreDetails).toHaveLength(1);
  });
});
test('Teste se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);
  const btnFilters = screen.getAllByTestId('pokemon-type-button');
  btnFilters.forEach((btn) => {
    userEvent.click(btn);
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(btn).toHaveTextContent(typePokemon.innerHTML);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  });
});
test('Teste se a Pokédex contém um botão para resetar o filtro ', () => {
  renderWithRouter(<App />);
  const btnAll = screen.getByRole('button', { name: /all/i });
  expect(btnAll).toBeInTheDocument();
  const btnFire = screen.getByRole('button', { name: /fire/i });
  userEvent.click(btnFire);
  const typePokemon = screen.getByTestId('pokemon-type');
  expect(typePokemon).toHaveTextContent(/fire/i);
  userEvent.click(btnAll);
  expect(typePokemon).toHaveTextContent(/electric/i);
});
