import PropTypes, { InferProps } from 'prop-types';

export default function Game({
    title,
    platform,
    releasedAt,
    thumb,
    url,
    showCompleteDetails
}: InferProps<typeof Game.propTypes>) {
    return (
        <div>
            { showCompleteDetails &&
                <>
                    <h2>{title}</h2>
                    <h3>{releasedAt} - {platform}</h3>
                </>
            }
            <a href={url} target="_blank" rel="noreferrer">
                <img src={`/img/${thumb}`} alt={title} data-testid="game-screenshot"/>
            </a>
        </div>
    );
};

Game.propTypes = {
    title: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
    releasedAt: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    showCompleteDetails: PropTypes.bool,
};

Game.defaultProps = {
    showCompleteDetails: false
};