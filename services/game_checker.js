/**
 * Created by andrewparrish on 5/20/17.
 */
function GameChecker() { }

GameChecker.parse_game_status = function(data) {
    var xml = $.parseXML(data);
    var status = $(xml).find('game').attr('inning_state');
    return status;
};