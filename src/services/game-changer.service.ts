import { Id } from './../types/id.type';
import { Game } from './../models/game';

import { PriorityList } from './../models/priority-list';

export class GameChangerService {
    currGameId: Id;
    gameIds: Array<Id>;

    constructor(currGameId: Id, gameIds: Array<Id>) {
        this.currGameId = currGameId;
        this.gameIds = gameIds;
    }

    getNextPriority(): Promise<Game> {
        return new Promise((resolve, _reject) => {
            Game.find(this.gameIds).then((games) => {
                const gameHash = this.forGameHash(games);
                // TODO: Ignore current game
                PriorityList.allPriorities(this.gameIds).then((priorities) => {
                    for(let i = 0; i < priorities.length; i++) {
                        let game = gameHash[priorities[i].val];
                        if (game && !game.isInCommercialBreak() && priorities[i].val.toString() !== this.currGameId.toString()) {
                            gameHash[priorities[i].val].isBlackedOut().then((blackout) => {
                                if(!blackout) { resolve(gameHash[priorities[i].val]); }
                            });
                        }
                    }
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
