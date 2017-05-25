/**
 * Created by andrewparrish on 5/24/17.
 */

var expect = require('chai').expect;
var exec_file = require("../exec_file.js");
var Game = null;
var chrome = require("sinon-chrome");
var teamAsHash = null;

describe('game', function() {
    before(function(done) {
        teamAsHash = { teamOne: 'teamOne', teamTwo: 'teamTwo', status: 'Middle'};
        global.chrome = chrome;

        chrome.storage.sync.set.yields([teamAsHash]);
        chrome.storage.sync.get.yields({});

        var context = exec_file("models/game.js", { console: console, chrome: chrome });
        Game = context.Game;
        done();
    });

    describe('instance methods', function() {
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

        it('should save to chrome storage', function(done) {
            var games = [new Game(teamAsHash)];
            expect(new Game(teamAsHash).saveGame()).to.deep.equal(games);
            done();
        });

        describe('add Games to Array', function() {
            before(function(done) {
                var time = new Date();
                teamAsHash.lastUpdated = time;
                done();
            });

            it('can add games to an empty game array', function(done) {
                expect(new Game(teamAsHash)._addGameToArray(null)).to.deep.equal([teamAsHash]);
                expect(new Game(teamAsHash)._addGameToArray([])).to.deep.equal([teamAsHash]);
                done();
            });

            it('can add games to a non-empty game array', function(done) {
                done();
            });
        });
    });
});