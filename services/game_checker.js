/**
 * Created by andrewparrish on 5/20/17.
 */
function GameChecker() {
    this.priorities = [];
    this.currentGames = [];
    this.currentGameId = null;

    this.setInitialPriorities = function() {
        PriorityList.setInitialPriorities(function(list) {
            this.priorities = list;
        }.bind(this));
    };

    this.setInitialPriorities();

    this.getCurrentGame = function() {
        this.currentGameId = chrome.tabs.executeScript(null, { file: "injections/scrape_current_game.js" });
        return this.currentGameId;
    };

    this.getCurrentGameIds = function() {
        this.currentGames = chrome.tabs.executeScript(null, { file: "injections/scrape_current_games.js" });
        return this.currentGames;
    };

    this.getCurrentGames = function() {
        this.getCurrentGames().map(function(id) {
            this._getGameData(id, function(msg) {

            });
        }.bind(this));
    };

    this._getServiceUrl = function(gameId, date) {

    };

    this._parseTimeToObj = function(date) {
        var toTwoDigit = function(str) {
            if (str.length == 1) {
                str = "0" + str;
            }
            return str;
        };

        var timeObj = {
            month: toTwoDigit(date.getUTCMonth().toString() + 1),
            day: toTwoDigit(date.getUTCDate().toString()),
            hour: toTwoDigit(date.getUTCHours().toString()),
            min: toTwoDigit(date.getUTCMinutes().toString()),
            sec: toTwoDigit(Math.round(date.getSeconds() / 10) * 10)
        };

        timeObj.timecode = "" + date.getFullYear() + timeObj.month +
            timeObj.day + "_"+ timeObj.hour + timeObj.min + timeObj.sec;

        return timeObj;
    };

    this._getGameData = function(gameId, handleGameData) {
        $.ajax({
           type: "GET",
            url: this._getServiceUrl(gameId, new Date()),
            success: handleGameData,
            error: function(err) {
               console.error(err);
            }
        });
    };
    
    this._parseGameStatus = function(data) {
      var xml = $.parseXML(data);
      var status = $(xml).find('game').attr('inning_state');
      return status;
    };
}
