import { render } from '@testing-library/react';
import Game from './Game';

describe('Game', () => {
    let initialProps = {
        title: 'Golden Axe',
        url: 'https://www.retrogames.cz/play_037-SegaMS.php',
        platform: 'SMS',
        thumb: 'SMS-Golden_Axe.png'
    };
    it('initially renders only screenshot information', () => {
        const { asFragment } = render(<Game { ...initialProps } />);
        expect(asFragment()).toMatchSnapshot();
    });
    it('renders all game information', () => {
        const { asFragment } = render(<Game { ...{
            ...initialProps,
            showCompleteDetails: true
        } } />);
        expect(asFragment()).toMatchSnapshot();
    });
});