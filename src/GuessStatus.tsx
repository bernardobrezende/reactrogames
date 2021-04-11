import PropTypes, { InferProps } from 'prop-types';

export default function GuessStatus({ guessed } : InferProps<typeof GuessStatus.propTypes>) {
    return guessed !== null ? (
        <div data-testid="guess-status">
            {
                guessed === true ? 
                    <span data-testid="guess-status-success">✔️</span> :
                    <span data-testid="guess-status-fail">❌</span>
            }
        </div>
    ) : (
        <div data-testid="guess-status">
            <span data-testid="guess-status-pristine">take your chance!</span>
        </div>
    );
};

GuessStatus.propTypes = {
    guessed: PropTypes.bool
};

GuessStatus.defaultProps = {
    guessed: null
};