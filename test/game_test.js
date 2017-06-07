/**
 * Created by andrewparrish on 5/24/17.
 */

var expect = require('chai').expect;
var exec_file = require("../exec_file.js");
var Game = null;
var chrome = require("sinon-chrome");
var teamAsHash = null;
var time = new Date();

describe('game', function() {
    before(function(done) {
        teamAsHash = { teamOne: 'teamOne', teamTwo: 'teamTwo', status: 'Middle', id: '2017_05_21_miamlb_lanmlb_1'};
        global.chrome = chrome;

        chrome.storage.local.set.yields([teamAsHash]).returns(teamAsHash);
        chrome.storage.local.get.yields({});

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
            expect(new Game(null, null, null, 'Top').isInCommercialBreak()).to.equal(false);
            expect(new Game(null, null, null, 'Middle').isInCommercialBreak()).to.equal(true);
            done();
        });

        it('should save to chrome storage', function(done) {
            expect(new Game(teamAsHash).saveGame()).to.deep.equal(teamAsHash);
            done();
        });

        it('should be able to update status', function(done) {
            expect(new Game(teamAsHash).updateStatus('Top').status).to.equal('Top');
            expect(new Game(teamAsHash).updateStatus('Top').lastUpdated).to.be.greaterThan(time);
            done();
        });
    });
});
