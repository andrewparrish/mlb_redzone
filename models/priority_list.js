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

}