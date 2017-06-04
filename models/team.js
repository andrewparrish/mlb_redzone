/**
 * Created by andrewparrish on 6/4/17.
 */

function Team(id, displayName, blackout) {
    this.id = id;
    this.displayName = displayName;
    this.blackout = blackout || false;

    this._teamAsHash = function() {
      return {
          id: this.id,
          displayName: this.displayName,
          blackout: this.blackout
      };
    };

    this.saveTeam = function(afterSave) {
        var data = {};
        data[this.id] = this._teamAsHash();
        chrome.storage.sync.set(data, afterSave);
    }.bind(this);
}

Team.findById = function(id, onSuccess, onFailure) {
    chrome.storage.sync.get(id, function(result) {
        var team = result[id];
        if (team === undefined) {
            if (onFailure) { onFailure() }
        } else {
            if (onSuccess) { onSuccess(team) }
        }
    });
};
