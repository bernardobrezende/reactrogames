import { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Game from './Game';
import { Game as GameModel } from './model/Game';
import GamePicker from './application/GamePicker';
import GuessStatus from './GuessStatus';

const MIN_GUESS_LENGTH : number = 3;

export default function Guess({ options } : { options: InferProps<typeof Guess.propTypes> }) {
    const selectedGame = new GamePicker((options as GameModel[])).pick();
    const [ guessed, setGuessed ] = useState<boolean | null>();
    const [ currentGame, ] = useState<GameModel>(selectedGame);
    return <>
        <Game { ...{ ...currentGame, showCompleteDetails: guessed } }/>
        <GuessStatus guessed={ guessed } />
        <input data-testid="txtGuess" type="text" placeholder="your guess here" onBlur={ ({ target: { value } }) => {
            const titleMatch = value.length >= MIN_GUESS_LENGTH && currentGame.title.toLowerCase().includes(value.toLocaleLowerCase());
            setGuessed(titleMatch);
        } }/>
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