import { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Game from './Game';
import { Game as GameModel } from './model/Game';
import GamePicker from './application/GamePicker';
import GuessStatus from './GuessStatus';

const MIN_GUESS_LENGTH : number = 3;

export default function Guess({ options } : { options: InferProps<typeof Guess.propTypes> }) {

    function pickGame() : GameModel {
        return new GamePicker((options as GameModel[])).pick();
    };

    function reset() : void {
        setCurrentGame(pickGame());
        setGuessed(null);
        setGuessText("");
    };

    const selectedGame = pickGame();
    const [ guessed, setGuessed ] = useState<boolean | null>();
    const [ currentGame, setCurrentGame ] = useState<GameModel>(selectedGame);
    const [ guessText, setGuessText ] = useState<string>("");

    return <>
        <Game { ...{ ...currentGame, showCompleteDetails: guessed } }/>
        <GuessStatus guessed={ guessed } />
        <input data-testid="txtGuess" type="text" placeholder="your guess here"
            value={guessText}
            onChange={ ({ target: { value } }) => setGuessText(value) }
            onBlur={ ({ target: { value } }) => {
            const titleMatch = value.length >= MIN_GUESS_LENGTH && currentGame.title.toLowerCase().includes(value.toLocaleLowerCase());
            setGuessed(titleMatch);
        } }/>
        { guessed === true && <button data-testid="next-button" onClick={ reset }>Next!</button> }
    </>;
};

Guess.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        platform: PropTypes.string.isRequired,
        thumb: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }))
};