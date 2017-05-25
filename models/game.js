/**
 * Created by andrewparrish on 5/24/17.
 */

function Game(teamOne, teamTwo, status) {
    this.teamOne = teamOne;
    this.teamTwo = teamTwo;
    this.status = status;
    this.lastUpdated = Date.now();
    this.id = null;
    this.setId = function() {
        this.id = "" + this.teamOne + this.teamTwo + this.lastUpdated;
    };
    this.setId();

    const COMMERCIAL_STATUSES = ["Middle"];

    this.isInCommercialBreak = function() {
        return COMMERCIAL_STATUSES.indexOf(this.status) !== -1;
    }

}
