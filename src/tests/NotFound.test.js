import { screen, render } from '@testing-library/react';
import { NotFound } from '../pages';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    render(<NotFound />);
    const notFoundHeading = screen.getByRole('heading', { name: /page requested not found/i });
    expect(notFoundHeading).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
    render(<NotFound />);
    const notFoundImg = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(notFoundImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
// Testando
