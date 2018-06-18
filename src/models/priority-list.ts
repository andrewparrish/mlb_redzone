import { Node } from './node';

export class PriorityList {
    priorityArr: Array<Node>;
    head: Node = null;

    constructor(arr: Array<any> = []) {
        this.priorityArr = arr;
        this.buildList()
    }

    buildArr(): void {
        let arr = [];
        let node = this.head;
        var priority = 1;
        while(node) {
            node.val.priority = priority;
            arr.push(node.val);
            priority += 1;
            node = node.next;
        }

        this.priorityArr = arr;
    }
    
    buildList(): void {
        this.priorityArr.forEach((el) => {
            if (this.lastNode()) {
                this.lastNode().setNext(new Node(el));
            } else {
                this.head = new Node(el);
            }
        });
    }

    lastNode(): boolean {
        let lastNode = this.head;
        while(lastNode && lastNode.next) {
            lastNode = lastNode.next;
        }

        return lastNode;
    }

    addItem(priority: any): PriorityList {
        const newNode = new Node(priority);
        if (this.head) {
            let node = this.head;
            if (node.val.priority >= priority.priority) {
                this.head = newNode;
                newNode.next = node;
            } else {
                let nextNode = this.head.next;
                while(nextNode && nextNode.val.priority < priority) {
                    node = nextNode;
                    nextNode = node.next;
                }

                node.next = newNode;
                newNode.next = nextNode;
            }
        } else {
            this.head = newNode;
        }

        this.buildArr();
        return this;
    }
}
