/**
 * Created by andrewparrish on 5/20/17.
 */
function GameChecker() { }

GameChecker.parse_game_status = function(xml) {
    var status = $(xml).find('game');
    console.log(status);
};