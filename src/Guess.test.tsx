import { render, fireEvent, queryByTestId } from '@testing-library/react';
import Guess from './Guess';
import * as randomizer from './application/Randomizer';
import GameProvider from './context/GameContext';

const renderWithGameContext = (children : JSX.Element) => render(
    <GameProvider>
        { children }
    </GameProvider>
);

describe('Guess', () => {

    it('should render game guess with only screenshot, input guess and pristine guess status', () => {
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { asFragment, getByTestId } = renderWithGameContext(<Guess />);
        expect(asFragment()).toMatchSnapshot();
        expect(getByTestId("guess-status")).toBeVisible();
    });

    it('should render error message and keep the same game with wrong guess', () => {
        // TODO: use real impl to simulate random pick and make sure game is not changed
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { getByTestId, queryByTestId } = renderWithGameContext(<Guess/>);
        const inputGuess = getByTestId(/guess-input/i);
        fireEvent.change(inputGuess, { target: { value: 'wrong guess' } });
        fireEvent.blur(inputGuess);
        expect(getByTestId(/guess-status-fail/i)).toBeVisible();
        expect(queryByTestId(/next-button/i)).not.toBeInTheDocument();
    });

    it('should render game information, success indication and show next game button with right guess', () => {
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { getByTestId, getByText, queryByTestId } = renderWithGameContext(<Guess/>);
        const inputGuess = getByTestId(/guess-input/i);
        fireEvent.change(inputGuess, { target: { value: 'golden axe' } });
        fireEvent.blur(inputGuess);
        expect(getByText(/Golden Axe/i)).toBeVisible();
        expect(getByText(/SMS/i)).toBeVisible();
        expect(queryByTestId(/guess-status-success/i)).toBeVisible();
        expect(queryByTestId(/next-button/i)).toBeInTheDocument();
    });

    it('should render game information with minimum 3 character right guess', () => {
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { getByTestId, getByText } = renderWithGameContext(<Guess/>);
        const inputGuess = getByTestId(/guess-input/i);
        fireEvent.change(inputGuess, { target: { value: 'axe' } });
        fireEvent.blur(inputGuess);
        expect(getByText(/Golden Axe/i)).toBeVisible();
        expect(getByText(/SMS/i)).toBeVisible();
    });

    it('should not render game information with less than 3 character guess', () => {
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { getByTestId, queryByTestId } = renderWithGameContext(<Guess/>);
        const inputGuess = getByTestId(/guess-input/i);
        fireEvent.change(inputGuess, { target: { value: 'ax' } });
        fireEvent.blur(inputGuess);
        expect(queryByTestId(/guess-status-fail/i)).toBeVisible();
    });

    it('should reset screen information when click next after successfull guess', () => {
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { getByTestId, queryByTestId } = renderWithGameContext(<Guess/>);
        const inputGuess = getByTestId(/guess-input/i);
        fireEvent.change(inputGuess, { target: { value: 'golden axe' } });
        fireEvent.blur(inputGuess);
        //
        fireEvent.click(getByTestId(/next-button/i));
        expect(queryByTestId(/guess-status-success/i)).not.toBeInTheDocument();
        expect(queryByTestId(/guess-status-fail/i)).not.toBeInTheDocument();
        expect(queryByTestId(/guess-status-pristine/i)).toBeInTheDocument();
        expect(inputGuess.value).toEqual("");
    });

    it('should not repeat game after guessing', () => {
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { getByTestId, getByText, queryByTestId, queryByText } = renderWithGameContext(<Guess/>);
        const inputGuess = getByTestId(/guess-input/i);
        fireEvent.change(inputGuess, { target: { value: 'golden axe' } });
        fireEvent.blur(inputGuess);
        expect(getByText(/Golden Axe/i)).toBeVisible();
        expect(queryByTestId(/guess-status-success/i)).toBeVisible();
        expect(queryByTestId(/next-button/i)).toBeInTheDocument();
        fireEvent.click(getByTestId(/next-button/i));
        fireEvent.change(inputGuess, { target: { value: 'golden axe' } });
        fireEvent.blur(inputGuess);
        expect(queryByText(/Golden Axe/i)).not.toBeInTheDocument();
    });

    it('should reset all games after guessing all options', () => {
        randomizer.getRandomIntBetween = jest.fn(() => 0);
        const { getByTestId, getByText, queryByTestId, queryByText } = renderWithGameContext(<Guess/>);
        const inputGuess = getByTestId(/guess-input/i);

        fireEvent.change(inputGuess, { target: { value: 'alex kidd' } });
        fireEvent.blur(inputGuess);
        expect(getByText(/Alex Kidd in Miracle World/i)).toBeVisible();
        expect(queryByTestId(/guess-status-success/i)).toBeVisible();
        expect(queryByTestId(/next-button/i)).toBeInTheDocument();
        fireEvent.click(getByTestId(/next-button/i));

        fireEvent.change(inputGuess, { target: { value: 'golden axe' } });
        fireEvent.blur(inputGuess);
        expect(queryByText(/Golden Axe/i)).toBeInTheDocument();
        fireEvent.click(getByTestId(/next-button/i));

        fireEvent.change(inputGuess, { target: { value: 'kart' } });
        fireEvent.blur(inputGuess);
        expect(queryByText(/Super Mario Kart/i)).toBeInTheDocument();
        fireEvent.click(getByTestId(/next-button/i));

        fireEvent.change(inputGuess, { target: { value: 'alex kidd' } });
        fireEvent.blur(inputGuess);
        expect(getByText(/Alex Kidd in Miracle World/i)).toBeInTheDocument();
    });

});