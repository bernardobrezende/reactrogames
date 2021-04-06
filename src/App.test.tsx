import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const linkElement = screen.getByText(/reactrogames/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders random game', () => {
  render(<App />);
  expect(screen.getByTestId(/game-screenshot/i)).toBeInTheDocument();
});
