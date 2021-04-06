import PropTypes, { InferProps } from 'prop-types';
import Game from './Game';
import { Game as GameModel } from './model/Game';
import GamePicker from './application/GamePicker';

export default function Guess({ options } : { options: InferProps<typeof Guess.propTypes> }) {
    const selectedGame = new GamePicker((options as GameModel[])).pick();
    return <Game { ...selectedGame }/>;
};

Guess.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        platform: PropTypes.string.isRequired,
        thumb: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }))
};