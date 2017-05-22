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
}

GameChecker.parse_game_status = function(data) {
    var xml = $.parseXML(data);
    var status = $(xml).find('game').attr('inning_state');
    return status;
};

