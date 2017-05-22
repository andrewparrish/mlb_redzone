var expect = require('chai').expect;
var exec_file = require("../exec_file.js");
var context = exec_file("models/priority_list.js");
var PriorityList = context.PriorityList;

describe('priority list', function() {
    it('should properly add an element', function(done) {
        var list = new PriorityList([]);
        expect(list.priorityArr).to.deep.equal([]);
        done();
    });
});