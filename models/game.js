/**
 * Created by andrewparrish on 5/24/17.
 */

function Game(id, teamOne, teamTwo, status) {
    this.teamOne = teamOne;
    this.teamTwo = teamTwo;
    this.status = status;
    this.lastUpdated = new Date();
    this.id = id;

    const COMMERCIAL_STATUSES = ["Middle", "End"];

    this._gameAsHash = function() {
        return {
            teamOne: this.teamOne,
            teamTwo: this.teamTwo,
            status: this.status,
            lastUpdated: this.lastUpdated,
            id: this.id
        }
    };

    this.getTeams = function() {
        var teams = [
            Team.findById(this.teamOne),
            Team.findById(this.teamTwo)
        ];

        return Promise.all(teams);
    };

    this.isBlackedOut = function() {
        return new Promise(function(resolve, reject) {
            this.getTeams().then(function(teams) {
                var blackouts = teams.map(function(team) {
                    return team.blackout;
                });

                resolve(blackouts.indexOf(true) !== -1);
            }).catch(function(err) {
                console.warn(err);
                reject(err);  
            });
        }.bind(this));
    };

    this.isInCommercialBreak = function() {
        return COMMERCIAL_STATUSES.indexOf(this.status) !== -1;
    };

    this.saveGame = function() {
        var data = {};
        data[this.id] = this._gameAsHash();
        return chrome.storage.local.set(data, function(result) {
            return result;
        });
    }.bind(this);

    this.updateStatus = function(status) {
        this.status = status;
        this.lastUpdated = new Date();
        return this;
    };
}

Game.findById = function(id, onSuccess, onFailure) {
    chrome.storage.local.get(id, function(result) {
        var data = result[id];
        if (data === undefined) {
            if (onFailure) { onFailure('Could not find game.'); }
        } else {
            if (onSuccess) {
                var game = new Game(data.id, data.teamOne, data.teamTwo, data.status);
                onSuccess(game)
            }
        }
    });
};
