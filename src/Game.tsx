import { Fragment } from 'react';
import PropTypes, { InferProps } from 'prop-types';

export default function Game({
    title,
    platform,
    thumb,
    url
}: InferProps<typeof Game.propTypes>) {
    return (
        <div>
            <h1>{title}</h1>
            <h2>{platform}</h2>
            <a href={url} target="_blank">
                <img src={`/img/${thumb}`} alt={title}/>
            </a>
        </div>
    );
};

Game.propTypes = {
    title: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};