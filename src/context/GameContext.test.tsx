import GameProvider, { GameContext, GameContextType } from './GameContext';
import { fireEvent, render } from '@testing-library/react';
import { useContext } from 'react';

const DummyComponent = () => {
    const { currentOptions, removeGame, resetAllOptions } = useContext(GameContext) as GameContextType;
    const removeFirstGame = () : void => {
        if (currentOptions) {
            removeGame(currentOptions[0]);
        }
    }
    return <>
        <button data-testid="remove-option-button" onClick={ removeFirstGame }>Remove first game for test!</button>
        <button data-testid="reset-options-button" onClick={ resetAllOptions }>Reset!</button>
        <ul>
            { currentOptions && currentOptions.map(({ title }) => <li key={ title }>{title}</li>) }
        </ul>
    </>;
}

const renderWithGameContext = (children : JSX.Element) => render(
    <GameProvider>
        { children }
    </GameProvider>
);

describe('GameContext', () => {
    it('should return currentOptions game array', () => {
        const { queryByText } = renderWithGameContext(<DummyComponent />);
        expect(queryByText(/Alex Kidd/gi)).toBeInTheDocument();
        expect(queryByText(/Golden Axe/gi)).toBeInTheDocument();
        expect(queryByText(/Super Mario Kart/gi)).toBeInTheDocument();
    });

    it('should return removeGame to remove a game from current options', () => {
        const { queryByText, getByTestId } = renderWithGameContext(<DummyComponent />);
        fireEvent.click(getByTestId(/remove-option-button/gi));
        expect(queryByText(/Alex Kidd/gi)).not.toBeInTheDocument();
        expect(queryByText(/Golden Axe/gi)).toBeInTheDocument();
        expect(queryByText(/Super Mario Kart/gi)).toBeInTheDocument();
    });

    it('should reset all game options', () => {
        const { queryByText, getByTestId } = renderWithGameContext(<DummyComponent />);
        fireEvent.click(getByTestId(/remove-option-button/gi));
        expect(queryByText(/Alex Kidd/gi)).not.toBeInTheDocument();
        fireEvent.click(getByTestId(/reset-options-button/gi));
        expect(queryByText(/Alex Kidd/gi)).toBeInTheDocument();
        expect(queryByText(/Golden Axe/gi)).toBeInTheDocument();
        expect(queryByText(/Super Mario Kart/gi)).toBeInTheDocument();
    });
});