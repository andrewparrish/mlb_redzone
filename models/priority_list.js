/**
 * Created by andrew on 5/12/17.
 */

function Node(val) {
    this.val = val;
    this.next = null;

    this.setNext = function(node) {
        this.next = node;
    }
}

function PriorityList(priorityArr) {
    this.priorityArr = priorityArr;
    this.head = null;

    this.lastNode = function() {
        var lastNode = this.head;
        while(lastNode && lastNode.next !== null) {
            lastNode = lastNode.next;
        }

        return lastNode;
    };

    this.buildList = function() {
        for(var i = 0; i < this.priorityArr.length; i++) {
            if (this.lastNode() === null) {
                this.head = new Node(priorityArr[i]);
            } else {
                this.lastNode().setNext(new Node(priorityArr[i]));
            }
        }
    };

    this.buildList();
}