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
        var priorityList = this;
        this.priorityArr.forEach(function(el) {
            if (priorityList.lastNode() === null) {
                priorityList.head = new Node(el);
            } else {
                priorityList.lastNode().setNext(new Node(el));
            }
        });

    };

    // Set up linked-list on construction
    this.buildList();


    /*
     Instance Methods
     */
    this.buildArr = function() {
        var arr = [];
        var node = this.head;
        var priority = 1;
        while(node !== null) {
            node.val.priority = priority;
            arr.push(node.val);
            priority += 1;
            node = node.next;
        }

        this.priorityArr = arr;
    };

    this.addItem = function(priority) {
        var newNode = new Node(priority);
        if (this.head === null) {
            this.head = newNode;
        } else {
            var node = this.head;
            if (node.val.priority >= priority.priority) {
                this.head = newNode;
                newNode.next = node;
            } else {
                var nextNode = this.head.next;
                while(nextNode && nextNode.val.priority > priority.priority) {
                    node = nextNode;
                    nextNode = node.next;
                }

                node.next = newNode;
                newNode.next = nextNode;
            }
        }

        this.buildArr();
        return this;
    };
}

const PRIORITIES_KEY = "priorities";

PriorityList.setInitialPriorities = function(handleResult) {
    chrome.storage.sync.get(PRIORITIES_KEY, function(result) {
        var list = result[PRIORITIES_KEY];
        if (list === undefined || Object.keys(list) === 0) { list = []; }

        handleResult(list);
    });
};

PriorityList.addPriority = function(priority, handleUpdatedList) {
    chrome.storage.sync.get(PRIORITIES_KEY, function(result) {
        var list = result[PRIORITIES_KEY];
        if (list === undefined || Object.keys(list).length === 0) { list = []; }
        var priorityList = new PriorityList(list);
        priorityList.addItem(priority);

        var newVal = {};
        newVal[PRIORITIES_KEY] = priorityList.priorityArr;
        chrome.storage.sync.set(newVal, handleUpdatedList(priorityList.priorityArr));
    });
};
