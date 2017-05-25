/**
 * Created by andrewparrish on 5/24/17.
 */

var expect = require('chai').expect;
var exec_file = require("../exec_file.js");
var context = exec_file("models/game.js", { console: console });
var Game = context.Game;

describe('game', function() {
    it('should set its id', function(done) {
        var game = new Game();
        expect(game.id).to.not.equal(null);
        done();
    });

    it('should identify its in commercial', function(done) {
        expect(new Game(null, null, 'Top').isInCommercialBreak()).to.equal(false);
        expect(new Game(null, null, 'Middle').isInCommercialBreak()).to.equal(true);
        done();
    });
});