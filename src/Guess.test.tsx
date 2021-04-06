import { render } from '@testing-library/react';
import Guess from './Guess';
import * as randomizer from './application/Randomizer';
import { GAMES } from '../tests/fixtures/games';

describe('Guess', () => {
    it('should render game guess with only screenshot and input guess', () => {
        randomizer.getRandomIntBetween = jest.fn(() => 1);
        const { asFragment } = render(<Guess options={ GAMES } />);
        expect(asFragment()).toMatchSnapshot();
    });
});