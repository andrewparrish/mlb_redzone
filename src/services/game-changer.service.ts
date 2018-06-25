import { Id } from './../types/id.type';
import { Game } from './../models/game';

import { PriorityList } from './../models/priority-list';

export class GameChanger {
    currGameIds: Array<Id>;
    gameIds: Array<Id>;

    constructor(currGameIds: Array<Id>, gameIds: Array<Id>) {
        this.currGameIds = currGameIds;
        this.gameIds = gameIds;
    }

    getNextPriority(): Promise<Game> {
        return new Promise((resolve, _reject) => {
            Game.find(this.gameIds).then((games) => {
                console.log('games', games);
                const gameHash = this.forGameHash(games);
                PriorityList.setInitialPriorities().then((priorities) => {

                });
            });
        });
    }

    private forGameHash(games: Array<Game>): any {
        let gameHash = {};
        games.filter(game => !!game).forEach((game) => {
            gameHash[game.teamOne] = game;
            gameHash[game.teamTwo] = game;    
        });

        return gameHash;
    }
}
