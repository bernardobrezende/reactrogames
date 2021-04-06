import { render, screen } from '@testing-library/react';
import App from './App';
import * as randomizer from './application/Randomizer';

test('renders app title', () => {
  render(<App />);
  const linkElement = screen.getByText(/reactrogames/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders random game', () => {
  randomizer.getRandomIntBetween = jest.fn(() => 1);
  render(<App />);
  expect(screen.getByText(/Golden Axe/i)).toBeInTheDocument();
  expect(screen.getByText(/SMS/i)).toBeInTheDocument();
});
