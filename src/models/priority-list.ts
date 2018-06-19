import { Node } from './node';
import { PriorityInterface } from './../interfaces/priority.interface';

export class PriorityList {
    static PRIORITIES_KEY = 'priorities';

    priorityArr: Array<Node>;
    head: Node = null;

    constructor(arr: Array<any> = []) {
        this.priorityArr = arr;
        this.buildList()
    }

    static setInitialPriorities(): Promise {
        return new Promise((resolve, _reject) => {
            chrome.storage.local.get(this.PRIORITIES_KEY, (result) => {
                let list = result[this.PRIORITIES_KEY];
                if(list === undefined || Object.keys(list).length === 0)  {
                    list = [];
                }

                resolve(list);            
            });
        });
    }

    static addPriority(priority: PriorityInterface): Promise {
        return new Promise((resolve, reject) => {
            this.setInitialPriorities().then((priorityList) => {
                let list = new PriorityList(priorityList);

                list.addItem(priority);
                let newList = { [this.PRIORITIES_KEY]: list };
                chrome.storage.local.set(newList, (result) => {
                    resolve(list.priorityArr);
                });
            });
        });
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

    lastNode(): Node {
        let lastNode = this.head;
        while(lastNode && lastNode.next) {
            lastNode = lastNode.next;
        }

        return lastNode;
    }

    addItem(priority: PriorityInterface): PriorityList {
        const newNode = new Node(priority);
        if (this.head) {
            let node = this.head;
            if (node.val.priority >= priority.priority) {
                this.head = newNode;
                newNode.next = node;
            } else {
                let nextNode = this.head.next;
                while(nextNode && nextNode.val.priority < priority.priority) {
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
