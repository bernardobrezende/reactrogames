import * as randomizer from '../application/Randomizer';
import GamePicker from '../application/GamePicker';
import { GAMES } from '../../tests/fixtures/games';

describe('GamePicker', () => {

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    describe('pick', () => {
        it('should pick a game within many options', () => {
            randomizer.getRandomIntBetween = jest.fn(() => 1);
            const picker = new GamePicker(GAMES, [ ...GAMES ]);
            expect(GAMES[1]).toEqual(picker.pick());
        });
        it('should pick a game within many options first index', () => {
            randomizer.getRandomIntBetween = jest.fn(() => 0);
            const picker = new GamePicker(GAMES, [ ...GAMES ]);
            expect(GAMES[0]).toEqual(picker.pick());
        });

        it('should not repeat the game pick until all games are picked', () => {
            randomizer.getRandomIntBetween = jest.fn(() => 0);
            const picker = new GamePicker(GAMES, [ ...GAMES ]);
            const firstPick = picker.pick();
            const secondPick = picker.pick();
            const thirdPick = picker.pick();
            const fourthPick = picker.pick(); // reset games here
            expect(firstPick.title).not.toEqual(secondPick.title);
            expect(firstPick.title).not.toEqual(thirdPick.title);
            expect(firstPick.title).toEqual(fourthPick.title);
        });
    });
});
