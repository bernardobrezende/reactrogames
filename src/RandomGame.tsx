import PropTypes, { InferProps } from 'prop-types';
import Game from './Game';
import { Game as GameModel } from './model/Game';
import GamePicker from './application/GamePicker';

export default function RandomGame({ options } : { options: InferProps<typeof RandomGame.propTypes> }) {
    const selectedGame = new GamePicker((options as GameModel[])).pick();
    return <Game { ...selectedGame }/>;
};

RandomGame.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        platform: PropTypes.string.isRequired,
        thumb: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }))
};