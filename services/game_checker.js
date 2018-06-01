/**
 * Created by andrewparrish on 5/20/17.
 */
function GameChecker() {

    const BASE_URL = "https://statsapi.mlb.com";

    this.priorities = [];

    this.setInitialPriorities = function() {
        PriorityList.setInitialPriorities(function(list) {
            this.priorities = list;
        }.bind(this));
    };

    this.setInitialPriorities();

    this._getCurrentTab = function(handleTab) {
        chrome.tabs.query({ url: '*://www.mlb.com/tv/*' }, handleTab);
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
        this._getAllGameData(this.updateGames);
        if (afterUpdate) { afterUpdate() }
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
            this.getCurrentGameIds(function (ids) {
                ids = ids[0];
                var changer = new GameChanger(gameId, ids);
                var next = changer.getNextPriority();
                next.then(function(next) {
                    if(next) { this.changeGame(next.id); }
                }.bind(this));
            }.bind(this));
        }.bind(this));
    }.bind(this);

    this.updateGames = function(msg) {
      this._parseGamesData(msg).map(this.mergeGameData);
    }.bind(this);

    this.mergeGameData = function(gameData) {
        this._getData(this._gameFeedUrl(gameData.link), function(specificGameData) {
            gameData.alerts = specificGameData.gameData.alerts;
            var game = new Game(gameData);
            console.log('Game', game);
            game.saveGame();
        }, this._defaultErrorHandler, 'GET');
    }.bind(this);

    this._parseTimeToObj = function(date) {
        var toTwoDigit = function(str) {
            if (str.length === 1) {
                str = "0" + str;
            }
            return str;
        };

        var timeObj = {
            month: toTwoDigit((date.getMonth() + 1).toString()),
            day: toTwoDigit(date.getDate().toString()),
            hour: toTwoDigit(date.getHours().toString()),
            min: toTwoDigit(date.getMinutes().toString()),
            sec: toTwoDigit(Math.round(date.getSeconds() / 10) * 10),
            year: date.getFullYear()
        };

        timeObj.timecode = "" + date.getFullYear() + timeObj.month +
            timeObj.day + "_"+ timeObj.hour + timeObj.min + timeObj.sec;

            return timeObj;
    };

    this._defaultErrorHandler = function(err) { console.log(err) };

    this._getData = function(url, handleSuccess, handleError, method) {
        $.ajax({
            type: method,
            url: url,
            success: handleSuccess,
            error: handleError
        });
    };

    this._getAllGameData = function(handleGameData) {
        this._getData(this._getAllGamesUrl(new Date()), handleGameData, this._defaultErrorHandler, 'GET');
    };

    this._gameFeedUrl = function(link) { return BASE_URL + link; };

    this._getAllGamesUrl = function(date) {
        var timeObj = this._parseTimeToObj(date);
        return BASE_URL + "/api/v1/schedule?language=&sportId=1&date=" + timeObj.month + "/" + timeObj.day + "/" + timeObj.year
                        + "&sortBy=gameDate&hydrate=game(content(summary,media(epg))),linescore(runners),flags,team,review";
    };

    this._parseGamesData = function(data) {
      return data.dates[0].games.filter(this._activeGame).map(function(game) {
          return {
              id: game.gamePk.toString(),
              teamOne: game.teams.away.team.fileCode,
              teamTwo: game.teams.home.team.fileCode,
              status: game.status.detailedState,
              link: game.link
          }
      });
    };

    this._activeGame = function(gameData) {
        return gameData.status.detailedState == 'In Progress';
    };
}
