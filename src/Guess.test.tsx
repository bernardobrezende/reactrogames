import { render, fireEvent } from '@testing-library/react';
import Guess from './Guess';
import * as randomizer from './application/Randomizer';
import { GAMES } from '../tests/fixtures/games';

describe('Guess', () => {
    it('should render game guess with only screenshot, input guess and pristine guess status', async () => {
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { asFragment, getByTestId } = render(<Guess options={ GAMES } />);
        expect(asFragment()).toMatchSnapshot();
        expect(await getByTestId("guess-status")).toBeVisible();
    });
    it('should render error message and keep the same game with wrong guess', async () => {
        // TODO: use real impl to simulate random pick and make sure game is not changed
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { getByTestId } = render(<Guess options={ GAMES } />);
        const inputGuess = getByTestId(/txtGuess/i);
        fireEvent.change(inputGuess, { target: { value: 'wrong guess' } });
        fireEvent.blur(inputGuess);
        expect(await getByTestId(/guess-status-fail/i)).toBeVisible();
    });
    it('should render game information and success indication ✔️ with right guess', async () => {
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { getByTestId, getByText } = render(<Guess options={ GAMES } />);
        const inputGuess = getByTestId(/txtGuess/i);
        fireEvent.change(inputGuess, { target: { value: 'golden axe' } });
        fireEvent.blur(inputGuess);
        expect(await getByText(/Golden Axe/i)).toBeVisible();
        expect(await getByText(/SMS/i)).toBeVisible();
        expect(await getByText(/✔️/i)).toBeVisible();
    });
    it('should render game information with minimum 3 character right guess', async () => {
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { getByTestId, getByText } = render(<Guess options={ GAMES } />);
        const inputGuess = getByTestId(/txtGuess/i);
        fireEvent.change(inputGuess, { target: { value: 'axe' } });
        fireEvent.blur(inputGuess);
        expect(await getByText(/Golden Axe/i)).toBeVisible();
        expect(await getByText(/SMS/i)).toBeVisible();
    });
    it('should not render game information with less than 3 character guess', async () => {
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { getByTestId, getByText } = render(<Guess options={ GAMES } />);
        const inputGuess = getByTestId(/txtGuess/i);
        fireEvent.change(inputGuess, { target: { value: 'ax' } });
        fireEvent.blur(inputGuess);
        const errorMessage = await getByText(/❌/i);
        expect(errorMessage).toBeVisible();
    });
});