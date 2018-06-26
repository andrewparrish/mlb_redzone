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
                console.log('games', games);
                const gameHash = this.forGameHash(games);
                // TODO: Ignore current game
                PriorityList.allPriorities(this.gameIds).then((priorities) => {
                    console.log('games', gameHash);
                    console.log('prioriteis', priorities);
                    for(let i = 0; i < priorities.length; i++) {
                        let game = gameHash[priorities[i].val];
                        if (game && !game.isInCommercialBreak() && priorities[i].val !== this.currGameId) {
                            gameHash[priorities[i].val].isBlackedOut().then(function(blackout) {
                                console.log('change to?', gameHash);
                                if(!blackout) { return gameHash[priorities[i].val]; }
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
