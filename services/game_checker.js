/**
 * Created by andrewparrish on 5/20/17.
 */
function GameChecker() {
    this.priorities = [];
    this.currentGames = [];

    this.setInitialPriorities = function() {
        PriorityList.setInitialPriorities(function(list) {
            this.priorities = list;
        }.bind(this));
    };

    this.getCurrentGames = function() {
        this.currentGames = chrome.tabs.executeScript(null, { file: "injections/scrape_current_games.js" });
        return this.currentGames;
    };

    this.setInitialPriorities();

    this.parseGameStatus = function(data) {

    };
}

GameChecker.parse_game_status = function(data) {
    var xml = $.parseXML(data);
    var status = $(xml).find('game').attr('inning_state');
    return status;
};

