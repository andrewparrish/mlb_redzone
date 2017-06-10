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
        chrome.storage.local.set(data, afterSave);
    }.bind(this);
}

Team.findById = function(id, onSuccess, onFailure) {
    return new Promise(function(resolve, reject) {
        chrome.storage.local.get(id, function(result) {
            var team = result[id];
            if (team === undefined) {
                if (onFailure) { onFailure() }

                reject(team);
            } else {
                if (onSuccess) { onSuccess(team) }

                resolve(team);
            }
        });
    });
};
