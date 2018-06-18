export class Node {
    val;
    next;

    constructor(val: any) {
        this.val = val;
    }

    setNext(node: Node) {
        this.next = node;
    }
}
