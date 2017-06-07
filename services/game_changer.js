/**
 * Created by andrewparrish on 6/6/17.
 */

function GameChanger(gameIds) {
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
            var gameHash = {};
            games.forEach(function(game) {
               gameHash[game.teamOne] = game;
               gameHash[game.teamTwo] = game;
            });

            return this.getPriorities().then(function(priorities) {
                console.log(priorities);
                for(var i = 0; i < priorities.length; i++) {
                    console.log("GAME", gameHash[priorities[i].val]);
                    if (!gameHash[priorities[i].val].isInCommercialBreak()) {
                       return gameHash[priorities[i].val];
                    }
                }
            });
        }.bind(this));
    };

}