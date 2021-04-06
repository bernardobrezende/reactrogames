import { render } from '@testing-library/react';
import Guess from './Guess';
import * as randomizer from './application/Randomizer';
import { GAMES } from '../tests/fixtures/games';

describe('Guess', () => {
    it('should randomize game from several options', () => {
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { container } = render(<Guess options={ GAMES } />);
        expect(container.firstChild).toMatchSnapshot();
    });
});