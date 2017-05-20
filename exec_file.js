/**
 * Created by andrewparrish on 5/20/17.
 */
var vm = require("vm");
var fs = require("fs");
module.exports = function(path, context) {
    context = context || {};
    var data = fs.readFileSync(path);
    vm.runInNewContext(data, context, path);
    return context;
}
