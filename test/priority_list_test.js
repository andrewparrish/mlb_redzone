var expect = require('chai').expect;
var exec_file = require("../exec_file.js");
var context = exec_file("models/priority_list.js");
var PriorityList = context.PriorityList;

describe('Priority List', function() {
    it('should properly add an element', function(done) {
        var list = new PriorityList([]);
        expect(list.priorityArr).to.deep.equal([]);
        done();
    });

    it('should properly add multiple sequential elements', function(done) {
      var list = new PriorityList([]);
      var a = { val: 'a', priority: 1 };
      list.addItem(a);
      var b = { val: 'b', priority: 2 };
      list.addItem(b);
      var c = { val: 'c', priority: 3 };
      list.addItem(c);
      expect(list.priorityArr).to.deep.equal([a, b, c]);
      done();
    });
});
