import React, { useState } from 'react';
import { Game } from '../model/Game';

export interface GameContextType {
    picked?: Game[];
    all?: Game[];
    currentOptions?: Game[];
    removeGame: (picked: Game) => void;
    resetAllOptions: () => void;
};

const GAMES = {
    picked: [],
    all: [
        {
            title: 'Alex Kidd in Miracle World',
            url: 'https://www.retrogames.cz/play_170-SegaMS.php',
            platform: 'SMS',
            releasedAt: '1986',
            thumb: 'SMS-Alex_Kidd_in_Miracle_World.gif'
        },
        {
            title: 'Golden Axe',
            url: 'https://www.retrogames.cz/play_037-SegaMS.php',
            platform: 'SMS',
            releasedAt: '1989',
            thumb: 'SMS-Golden_Axe.png'
        },
        {
            title: 'Super Mario Kart',
            url: 'https://www.retrogames.cz/play_789-SNES.php',
            platform: 'SNES',
            releasedAt: '1992',
            thumb: 'SNES-Super_Mario_Kart.gif'
        }
    ]
};

export const GameContext = React.createContext<GameContextType | null>(null);
// in the future we might want to inject game data into provider
const GameProvider : React.FC<React.ReactNode> = ({ children }) => {
    const [ all, ] = useState<Game[] | undefined>([ ...GAMES.all ]);
    const [ currentOptions, setCurrentOptions ] = useState<Game[] | undefined>([ ...GAMES.all ]);
    const [ picked, ] = useState<Game[] | undefined>(GAMES.picked);

    const removeGame = (game: Game) : void => {
        if (currentOptions) {
            const index = currentOptions.findIndex(({ title }) => title === game.title);
            currentOptions.splice(index, 1);
            setCurrentOptions([ ...currentOptions ]);
        }
    };

    const resetAllOptions = () : void => {
        setCurrentOptions([ ...(all ?? []) ]);
    };

    return (
        <GameContext.Provider value={{ all, picked, removeGame, currentOptions, resetAllOptions }}>
            { children }
        </GameContext.Provider>
    );
};  

export default GameProvider;