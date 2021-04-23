import { useEffect, useState, useContext } from 'react';
import Game from './Game';
import { Game as GameModel } from './model/Game';
import GamePicker from './application/GamePicker';
import GuessStatus from './GuessStatus';
import { GameContext, GameContextType } from './context/GameContext';

const MIN_GUESS_LENGTH : number = 3;

export default function Guess() {

    const { all, currentOptions, resetAllOptions, removeGame } = useContext(GameContext) as GameContextType;

    const gamerPicker = new GamePicker(all ?? [], currentOptions ?? []); // TODO: resolver isso ??
    const [ currentGame, setCurrentGame ] = useState<GameModel | null>(null);
    const [ guessed, setGuessed ] = useState<boolean | null>();    
    const [ guessText, setGuessText ] = useState<string>("");    

    useEffect(() => {
        if (!currentGame) {
            pickNewGame();
        }
    }, [ guessed ]);

    function pickNewGame() : void {
        const pickedGame = gamerPicker.pick();
        setCurrentGame(pickedGame);
        if (pickedGame) removeGame(pickedGame);
    };

    function reset() : void {
        resetAllOptions();
        pickNewGame();
        setGuessed(null);
        setGuessText("");        
    };

    function checkGuess(value : string) : void {
        const titleMatch = value.length >= MIN_GUESS_LENGTH && currentGame?.title.toLowerCase().includes(value.toLocaleLowerCase());
        if (titleMatch !== guessed) {
            setGuessed(titleMatch);
        };
    };

    return currentGame ? <>
        <Game { ...{ ...currentGame, showCompleteDetails: guessed } }/>
        <GuessStatus guessed={ guessed } />
        <input data-testid="guess-input" type="text" placeholder="your guess here"
            value={ guessText }
            onChange={ (e) => {
                setGuessText(e.target.value);
                e.preventDefault();
            }}
            onBlur={ ({ target: { value } }) => checkGuess(value) }/>
        { guessed === true && <button data-testid="next-button" onClick={ reset }>Next!</button> }
    </> : (<></>);
};