import { render } from '@testing-library/react';
import RandomGame from './RandomGame';
import * as randomizer from './application/Randomizer';

describe('RandomGame', () => {
    it('should randomize game from several options', () => {
        const options = {
            1: {
                title: 'Alex Kidd in Miracle World',
                url: 'https://www.retrogames.cz/play_170-SegaMS.php',
                platform: 'SMS',
                thumb: 'SMS-Alex_Kidd_in_Miracle_World.gif'
            },
            2: {
                title: 'Golden Axe',
                url: 'https://www.retrogames.cz/play_037-SegaMS.php',
                platform: 'SMS',
                thumb: 'SMS-Golden_Axe.png'
            },
            3: {
                title: 'Super Mario Kart',
                url: 'https://www.retrogames.cz/play_789-SNES.php',
                platform: 'SNES',
                thumb: 'SNES-Super_Mario_Kart.gif'
            }
        };
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { container } = render(<RandomGame { ...options } />);
        expect(container.firstChild).toMatchSnapshot();
    });
});