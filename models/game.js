/**
 * Created by andrewparrish on 5/24/17.
 */
const GAMES_KEY = 'games';

function Game(id, teamOne, teamTwo, status) {
    this.teamOne = teamOne;
    this.teamTwo = teamTwo;
    this.status = status;
    this.lastUpdated = new Date();
    this.id = id;

    const COMMERCIAL_STATUSES = ["Middle"];

    this._gameAsHash = function() {
        return {
            teamOne: this.teamOne,
            teamTwo: this.teamTwo,
            status: this.status,
            lastUpdated: this.lastUpdated,
            id: this.id
        }
    };

    this.isInCommercialBreak = function() {
        return COMMERCIAL_STATUSES.indexOf(this.status) !== -1;
    };

    this._addGameToArray = function(gamesArray) {
        gamesArray = gamesArray || [];
        var gamesIds = gamesArray.map(function(gameHash) {
            return new Game(gameHash).id;
        });

        if (gamesIds.indexOf(this.id) !== -1) {
            gamesArray.push(this);
        } else {
            gamesArray = [this._gameAsHash()];
        }

        return gamesArray;
    };

    this.saveGame = function() {
        return chrome.storage.sync.get(GAMES_KEY, function(result) {

        });
    }.bind(this);
}
