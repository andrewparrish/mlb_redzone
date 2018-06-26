import { Node } from './node';
import { Id } from './../types/id.type';
import { PriorityInterface } from './../interfaces/priority.interface';
import { Game } from './../models/game';
import { Team } from './../models/team';

import { GameInterface } from './../interfaces/game.interface';
import { TeamInterface } from './../interfaces/team.interface';


export class PriorityList {
    static PRIORITIES_KEY = 'priorities';

    priorityArr: Array<Node>;
    head: Node = null;

    constructor(arr: Array<any> = []) {
        this.priorityArr = arr;
        this.buildList()
    }

    static setInitialPriorities(): Promise<Array<PriorityInterface>> {
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

    static allPriorities(gameIds: Array<Id>): Promise<Array<PriorityInterface>> {
        return new Promise((resolve, _reject) => {
            Promise.all([this.setInitialPriorities(), this.scorePriorities(gameIds)]).then((results) => {
                let priorities = results[0];
                let priority;

                results[1].forEach((team) => {
                    priority = priorities.length + 1;
                    priorities.push({ val: team, priority })
                });

                resolve(priorities);
            });
        });
    }

    static scorePriorities(gameIds: Array<Id>): Promise<any> {
        return Game.find(gameIds).then((games) => {
            const priorityGames = games.map((game) => {
                game = new Game(game);
                return game;
            });

            return Promise.all(priorityGames.filter((priorityGame) => {
                return priorityGame.isBlackedOut();
            })).then((filtered) => {
                let games = [];
                filtered.forEach((filter, i) => {
                    if (filter) { games.push(priorityGames[i].teamOne); }
                })
                return games;
            });
        });
    }

    static addPriority(priority: PriorityInterface): Promise<Array<PriorityInterface>> {
        return new Promise((resolve, reject) => {
            this.setInitialPriorities().then((priorityList) => {
                let list = new PriorityList(priorityList);

                list.addItem(priority);
                let newList = { [this.PRIORITIES_KEY]: list.priorityArr };
                chrome.storage.local.set(newList, () => {
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
