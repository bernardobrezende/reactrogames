import { render } from '@testing-library/react';
import Game from './Game';

describe('Game', () => {
    it('renders game information', () => {
        const game = {
            title: 'Golden Axe',
            url: 'https://www.retrogames.cz/play_037-SegaMS.php',
            platform: 'SMS',
            thumb: 'SMS-Golden_Axe.png'
        };
        const { asFragment } = render(<Game { ...game } />);
        expect(asFragment()).toMatchSnapshot();
    });
});