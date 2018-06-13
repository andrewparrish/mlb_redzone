/**
 * Created by andrewparrish on 6/6/17.
 */

function GameChanger(currGameId, gameIds) {
    this.currGameId = currGameId;
    this.gameIds = gameIds;

    this.getPriorities = function() {
        return new Promise(function(resolve, reject) {
            PriorityList.setInitialPriorities(function(list) {
                resolve(list);
            });
        });
    };

    this.getGameById = function(id) {
        return new Promise(function(resolve, reject) {
            Game.findById(id, resolve, reject);
        });
    };

    this.getNextPriority = function() {
        var promises = this.gameIds.map(function(id) {
            return this.getGameById(id);
        }.bind(this));

        return Promise.all(promises).then(function(games) {
            console.log('games', games);
            var gameHash = {};
            games.filter(function(game) { return !!game; }).forEach(function(game) {
                gameHash[game.teamOne] = game;
                gameHash[game.teamTwo] = game;
            });

            return this.getPriorities().then(function(priorities) {
                console.log('games', gameHash);
                console.log('priorities', priorities);
                for(var i = 0; i < priorities.length; i++) {
                    var game = gameHash[priorities[i].val];
                    if (game && !game.isInCommercialBreak() && priorities[i].val !== this.currGameId) {
                        gameHash[priorities[i].val].isBlackedOut().then(function(blackout) {
                            if(!blackout) { return gameHash[priorities[i].val]; }

                        });
                    }
                }
            }.bind(this));
        }.bind(this));
    };

}
