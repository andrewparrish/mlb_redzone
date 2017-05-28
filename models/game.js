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

    this.isInCommercialBreak = function() {
        return COMMERCIAL_STATUSES.indexOf(this.status) !== -1;
    };
    
    this.saveGame = function() {
        var data = {};
        data[this.id] = this._gameAsHash();
        return chrome.storage.sync.set(data, function(result) {
          return result; 
        });
    }.bind(this);

    this.updateStatus = function(status) {
      this.status = status;
      this.lastUpdated = new Date();
      return this;
    };
}
