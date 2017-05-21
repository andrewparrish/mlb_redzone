/**
 * Created by andrewparrish on 5/20/17.
 */

var expect = require('chai').expect;
var exec_file = require("../exec_file.js");
var jsdom = require("jsdom/lib/old-api.js");


jsdom.env({
    html: "<html></html>",
    scripts: ["jquery-3.2.1.min.js", "services/game_checker.js"],
    done: function (err, window) {
        var $ = window.$;

        describe('Game Checker', function () {
            it('should be able to parse game status', function () {
                $.ajax({
                    type: "GET",
                    url: "test/test_data/plays.xml",
                    dataType: "xml",
                    success: function (data) {
                        GameChecker.parse_game_status(data);
                        done();
                    }
                })
            });
        });
    }
});

