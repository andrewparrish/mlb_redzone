/**
 * Created by andrewparrish on 5/20/17.
 */
function GameChecker() {
    this.priorities = [];

    this.setInitialPriorities = function() {
        PriorityList.setInitialPriorities(function(list) {
            this.priorities = list;
        }.bind(this));
    };

    this.setInitialPriorities();

    this._getCurrentTab = function(handleTab) {
        chrome.tabs.query({ url: '*://m.mlb.com/*' }, handleTab);
    };

    this.getCurrentGame = function(handleGame) {
        this._getCurrentTab(function(results) {
            chrome.tabs.executeScript(results[0].id, { file: "injections/scrape_current_game.js" }, handleGame);
        });
    };

    this.getCurrentGameIds = function(handleIds) {
        this._getCurrentTab(function(results) {
            chrome.tabs.executeScript(results[0].id, { file: "injections/scrape_current_games.js" }, handleIds);
        });
    };

    this.updateCurrentGames = function(afterUpdate) {
        this.getCurrentGameIds(function(ids) {
            ids[0].map(function(id) {
                return this._getGameData(id, this.updateGame);
            }.bind(this));
            if (afterUpdate) { afterUpdate() }
        }.bind(this));
    };

    this.changeGame = function(gameId) {
        this._getCurrentTab(function(results) {
            chrome.tabs.executeScript(results[0].id, {
                code: 'var gameToChangeToId = \'' + gameId + '\';'
            }, function() {
                chrome.tabs.executeScript(results[0].id, { file: "injections/change_current_game.js" });
            });
        });
    };

    this.checkForGameChange = function() {
        this.getCurrentGame(function(gameId) {
            gameId = gameId[0];
            Game.findById(gameId, function(game) {
                console.log("GAME", game);
                if (game.isInCommercialBreak()) {
                    // Testing function
                    this.getCurrentGameIds(function (ids) {
                        console.log("IDS TO CHANGE", ids);
                        ids = ids[0];
                        for(var i = 0; i < ids.length; i++) {
                            if (gameId !== ids[i]) {
                                console.log("GAME TO CHANGE TO", gameId);
                                this.changeGame(ids[i]);
                                break;
                            }
                        }
                    }.bind(this));
                }
            }.bind(this));
        }.bind(this));
    }.bind(this);

    this.updateGame = function(msg) {
        var gameData = this._parseGameData(msg);
        var game = new Game(gameData.id, gameData.teamOne, gameData.teamTwo, gameData.status);
        game.saveGame();
    }.bind(this);

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
        return $(data).find('game').attr('inning_state');
    };

    this._parseGameData = function(data) {
        var id  = $(data).find('game').attr('id');
        var parsed = /\d+_\d+_\d+_(\w+)mlb_(\w+)mlb/.exec(id);
        return {
            id: id,
            teamOne: parsed[1],
            teamTwo: parsed[2],
            status: this._parseGameStatus(data)
        }
    }
}
