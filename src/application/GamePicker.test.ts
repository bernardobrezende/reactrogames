import * as randomizer from '../application/Randomizer';
import GamePicker from '../application/GamePicker';
import { GAMES } from '../../tests/fixtures/games';

describe('GamePicker', () => {
    describe('pick', () => {
        afterEach(() => {
            randomizer.getRandomIntBetween.mockRestore();
        })
        it('should pick a game within many options', () => {
            randomizer.getRandomIntBetween = jest.fn(() => 1);
            const picker = new GamePicker(GAMES);
            expect(GAMES[1]).toEqual(picker.pick());
        });
        it('should pick a game within many options first index', () => {
            randomizer.getRandomIntBetween = jest.fn(() => 0);
            const picker = new GamePicker(GAMES);
            expect(GAMES[0]).toEqual(picker.pick());
        });
    });
});
