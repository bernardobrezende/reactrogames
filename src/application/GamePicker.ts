import { Game } from '../model/Game';
import { getRandomIntBetween } from './Randomizer';

export default class GamePicker {

    games: Game[];

    constructor(games : Game[]) {
        this.games = games;
    }

    pick() : Game {
        const randomIndex = getRandomIntBetween(0, this.games?.length);
        return this.games[randomIndex];
    };
};
