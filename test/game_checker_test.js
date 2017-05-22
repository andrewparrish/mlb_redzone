/**
 * Created by andrewparrish on 5/20/17.
 */
var fs = require('fs');
var expect = require('chai').expect;
var exec_file = require("../exec_file.js");
var jsdom = require("jsdom/lib/old-api.js");
var chrome = require("sinon-chrome");
var PriorityList = null;
const PRIORITIES_KEY = "priorities";
var GameChecker = null;

jsdom.env({
    html: "<html></html>",
    scripts: ["jquery-3.2.1.min.js", "models/priority_list.js", "services/game_checker.js"],
    done: function (err, window) {
        var $ = window.$;

        describe('Game Checker', function () {
            before(function(done) {
                var priority = {
                    val: 'atl',
                    text: 'Atlanta Braves',
                    priority: 1,
                    type: 'team'
                };
                var priorityHash = {};
                priorityHash[PRIORITIES_KEY] = [priority];

                global.chrome = chrome;
                chrome.storage.sync.get.yields(priorityHash);
                var priority_list_context = exec_file("models/priority_list.js", { chrome: chrome, console: console });
                PriorityList = priority_list_context.PriorityList;

                var context = exec_file('services/game_checker.js', { $: $, PriorityList: PriorityList, console: console });
                GameChecker = context.GameChecker;
                done();
            });

            describe('construction, setup, and getting priorities', function() {
                before(function(done) {
                    done();
                });

                it('should properly set the user priorities', function(done) {
                    var checker = new GameChecker();
                    expect(checker.priorities.length).to.equal(1);
                    done();
                });
            });

            it('should be able to parse game status', function (done) {
                var data = fs.readFileSync('test/test_data/plays.xml', { encoding: 'utf8' });
                var status = GameChecker.parse_game_status(data);
                expect(status).to.equal('Bottom');
                data = fs.readFileSync('test/test_data/commercial.plays.xml', { encoding: 'utf8' });
                status = GameChecker.parse_game_status(data);
                expect(status).to.equal('Middle');
                done();
            });
        });
    }
});

