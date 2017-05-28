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
        this.currentGameId = chrome.tabs.executeScript({ file: "injections/scrape_current_game.js" });
        return this.currentGameId;
    };

    this.getCurrentGameIds = function(handleIds) {
        chrome.tabs.query({ url: '*://m.mlb.com/*' }, function(results) {
           chrome.tabs.executeScript(results[0].id, { file: "injections/scrape_current_games.js" }, handleIds);
        });
    };

    this.getCurrentGames = function() {
        this.getCurrentGameIds(function(ids) {
            ids[0].map(function(id) {
                this._getGameData(id, function(msg) {
                    console.log("STATUS", this._parseGameStatus(msg));
                }.bind(this));
            }.bind(this));
        }.bind(this));
    };

    this._getServiceUrl = function(gameId, date) {
        var timeObj = this._parseTimeToObj(date);
        return "http://lwsa.mlb.com/tfs/tfs?file=/components/game/mlb/year_" +
                timeObj.year + "/month_" + timeObj.month + "/day_" + timeObj.day +
                "/gid_" + gameId + "/plays.xml&timecode=" + timeObj.timecode;
    };

    this._parseTimeToObj = function(date) {
        var toTwoDigit = function(str) {
            if (str.length === 1) {
                str = "0" + str;
            }
            return str;
        };

        var timeObj = {
            month: toTwoDigit(date.getUTCMonth().toString() + 1),
            day: toTwoDigit(date.getUTCDate().toString()),
            hour: toTwoDigit(date.getUTCHours().toString()),
            min: toTwoDigit(date.getUTCMinutes().toString()),
            sec: toTwoDigit(Math.round(date.getSeconds() / 10) * 10),
            year: date.getFullYear()
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
      var status = $(data).find('game').attr('inning_state');
      return status;
    };
}
