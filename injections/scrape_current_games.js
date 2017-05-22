/**
 * Created by andrewparrish on 5/22/17.
 */

function uniqValues(val, index, self) {
    return self.indexOf(val) === index;
}

var games = document.getElementsByClassName('game during inprogress');
var arr = Object.keys(games).map(function(key) {
   return games[key];
});
var ids = arr.map(function(game) {
   return game.getAttribute('id');
});

var ids = ids.filter(uniqValues);

// Return values back to the called script
ids;