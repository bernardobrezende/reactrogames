import PropTypes, { InferProps } from 'prop-types';
import Game from './Game';
import { getRandomIntBetween } from './application/Randomizer';

export default function RandomGame(options : InferProps<typeof RandomGame.propTypes>) {
    console.dir(options);
    const optionsValues = Object.values(options);
    const randomIndex = getRandomIntBetween(0, optionsValues?.length);
    return <Game { ...optionsValues[randomIndex] }/>;
};

RandomGame.propTypes = {
    // options: PropTypes.arrayOf(PropTypes.shape({
    //     title: PropTypes.string.isRequired,
    //     platform: PropTypes.string.isRequired,
    //     thumb: PropTypes.string.isRequired,
    //     url: PropTypes.string.isRequired
    // }))
    options: PropTypes.any.isRequired
};