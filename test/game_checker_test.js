/**
 * Created by andrewparrish on 5/20/17.
 */
var fs = require('fs');
var expect = require('chai').expect;
var exec_file = require("../exec_file.js");
var jsdom = require("jsdom/lib/old-api.js");


jsdom.env({
    html: "<html></html>",
    scripts: ["jquery-3.2.1.min.js", "services/game_checker.js"],
    done: function (err, window) {
        var $ = window.$;

        var context = exec_file('services/game_checker.js', { $: $ });
        var GameChecker = context.GameChecker;

        describe('Game Checker', function () {
            it('should be able to parse game status', function (done) {
                var data = fs.readFileSync('test/test_data/plays.xml', { encoding: 'utf8' });
                var status = GameChecker.parse_game_status(data);
                expect(status).to.equal('Bottom');
                done();
                // $.ajax({
                //     type: "GET",
                //     url: "test/test_data/plays.xml",
                //     dataType: "xml",
                //     success: function (data) {
                //         console.log(data);
                //         GameChecker.parse_game_status(data);
                //         done();
                //     },
                //     error: function(err) {
                //         console.log("ERROR");
                //         console.log(err);
                //     }
                // })
            });
        });
    }
});

