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
            var gameHash = {};
            games.forEach(function(game) {
               gameHash[game.teamOne] = game;
               gameHash[game.teamTwo] = game;
            });

            return this.getPriorities().then(function(priorities) {
                for(var i = 0; i < priorities.length; i++) {
                    if (!gameHash[priorities[i].val].isInCommercialBreak() && priorities[i].val !== this.currGameId) {
                       return gameHash[priorities[i].val];
                    }
                }
            }.bind(this));
        }.bind(this));
    };

}