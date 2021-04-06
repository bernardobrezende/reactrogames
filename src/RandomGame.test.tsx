import { render } from '@testing-library/react';
import RandomGame from './RandomGame';
import * as randomizer from './application/Randomizer';
import { GAMES } from '../tests/fixtures/games';

describe('RandomGame', () => {
    it('should randomize game from several options', () => {
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { container } = render(<RandomGame options={ GAMES } />);
        expect(container.firstChild).toMatchSnapshot();
    });
});