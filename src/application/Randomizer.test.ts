import { getRandomIntBetween } from './Randomizer';

describe('randomize', () => {

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    })

    it('should randomize from 0 up to 6 result between', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
        expect(getRandomIntBetween(0, 6)).toEqual(2);
    });

    it('should randomize from 0 up to 6 result 0', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.0);
        expect(getRandomIntBetween(0, 6)).toEqual(0);
    });

    it('should randomize from 0 up to 6 exclusive result 5', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.99);
        expect(getRandomIntBetween(0, 6)).toEqual(5);
    });
});
