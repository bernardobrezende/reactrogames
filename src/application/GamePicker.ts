import { Game } from '../model/Game';
import { getRandomIntBetween } from './Randomizer';

export default class GamePicker {

    private allGames: Game[];
    private currentGames: Game[];

    constructor(games : Game[]) {
        this.currentGames = [ ...games ];
        this.allGames = [ ...games ];
    }

    private resetGames() : void {
        this.currentGames = [ ...this.allGames ];
    };

    pick() : Game {
        // reset when all games already had picked
        if (this.currentGames.length === 0) {
            this.resetGames();
        }
        const randomIndex = getRandomIntBetween(0, this.currentGames?.length);
        const game = this.currentGames[randomIndex];
        // remove game to avoid repeated pick
        this.currentGames.splice(randomIndex, 1);
        return game;
    };
};
