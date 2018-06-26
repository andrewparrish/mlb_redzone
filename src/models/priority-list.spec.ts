import { PriorityList } from './priority-list';
import { Node } from './node';

import { Game } from './../models/game';
import { Team } from './../models/team';

import { GameInterface } from './../interfaces/game.interface';
import { TeamInterface } from './../interfaces/team.interface';

import { teamFactory } from './../interfaces/factories/team.factory';
import { gameFactory } from './../interfaces/factories/game.factory';

import * as testChrome from 'sinon-chrome';
declare const window: any;

describe('PriorityList', () => {
    let priorityList: PriorityList;
    const node = new Node('a');
    let priorityArrList: PriorityList;

    beforeEach(() => {
        priorityList = new PriorityList();
        priorityArrList = new PriorityList([node.val]);
    });

    beforeAll(() => {
        window.chrome = testChrome;
    });

    describe('.new', () => {
        it('has an empty priorityArr by default', () => {
            expect(priorityList.priorityArr).toEqual([]);
        });

        it('can construct from a priority arr', () => {
            expect(priorityArrList.head).toEqual(node);
        });
    });

    describe('.setInitialPriorities', () => {
        beforeEach(() => {
            testChrome.storage.local.get.yields({ 'priorities': priorityList.priorityArr });
        });

        it('returns the intial priorities', () => {
            PriorityList.setInitialPriorities().then((list) => {
                expect(list).toEqual(priorityList.priorityArr); 
            });
        });
    });

    describe('.addPriority', () => {
        beforeAll(() => {
            testChrome.storage.local.get.yields({});
            testChrome.storage.local.set.yields({});
        });

        it('adds a priority', () => {
            PriorityList.addPriority({ val: 'a' }).then((list) => {
                expect(list).toEqual([{ val: 'a', priority: 1 }]);
            });
        });
    });

    const teamOne = teamFactory();
    const teamTwo = teamFactory({ id: '2' });
    const teamThree = teamFactory({ id: '3' });
    const teamFour = teamFactory({ id: '4' });
    let game: GameInterface = gameFactory({ teamOne: teamOne.id, teamTwo: teamTwo.id });
    let gameTwo: GameInterface = gameFactory({ id: '2', teamOne: teamThree.id, teamTwo: teamFour.id });

    describe('.allPriorities', () => {
        beforeAll(() => {
            testChrome.storage.local.get.yields({
                game_1: game,
                game_2: gameTwo,
                team_1: teamOne,
                team_2: teamTwo,
                team_3: teamThree,
                team_4: teamFour,
                priorities: {}
            });
        });

        describe('no saved priorities', () => {
            it('has games in the allPriorities list', () => {
                PriorityList.allPriorities([game.id]).then((priorities) => {
                    expect(priorities).toEqual([{ val: teamOne.id, priority: 1 }]);
                });
            });
        });
    });

    describe('.scorePriorities', () => {
        beforeEach(() => {
            testChrome.storage.local.get.yields({
                game_1: game,
                game_2: gameTwo,
                team_1: teamOne,
                team_2: teamTwo,
                team_3: teamThree,
                team_4: teamFour,
                priorities: {}
            });
        });

        it('returns an array of teamOne values', () => {
            PriorityList.scorePriorities([game.id]).then((priorities) => {
                expect(priorities).toEqual([ teamOne.id ]);
            });
        });

        it('returns an array of multiple teams', () => {
            PriorityList.scorePriorities([game.id, gameTwo.id]).then((priorities) => {
                expect(priorities).toEqual([ teamOne.id, teamThree.id ]);
            });
        });

    });

    describe('#lastNode', () => {
        it('has no last node when empty', () => {
            expect(priorityList.lastNode()).toBeNull();
        });

        it('returns a node when it has a last node', () => {
            expect(priorityArrList.lastNode()).toEqual(node); 
        });
    });

    describe('#buildArr', () => {
        const priority = { val: 'a' };
        const priorityTwo = { val: 'b' };

        it('builds the array when there are no priorities', () => {
            priorityList.buildArr();
            expect(priorityList.priorityArr).toEqual([]);
        });

        it('builds the array with one item', () => {
            let list = new PriorityList([priority]);
            list.buildArr();
            expect(list.priorityArr).toEqual([{ val: 'a', priority: 1 }])
        });

        it('build an array with multiple items', () => {
            let list = new PriorityList([priority, priorityTwo]);
            list.buildArr();
            expect(list.priorityArr).toEqual([{ val: 'a', priority: 1 }, { val: 'b', priority: 2 }]);
        });
    });

    describe('#addItem', () => {
        const a = { val: 'a', priority: 1 };
        const b = { val: 'b', priority: 2 };
        const c = { val: 'c', priority: 3 };
        const arr = [a, b, c];

        it('can add a single item', () => {
            priorityList.addItem(a);
            expect(priorityList.priorityArr).toEqual([a]);
        });

        it('can add multiple items', () => {
            priorityList.addItem(a);
            priorityList.addItem(b);

            expect(priorityList.priorityArr).toEqual([a, b]);
        });

        it('can add sequential items', () => {
            arr.forEach(el => priorityList.addItem(el));
            expect(priorityList.priorityArr).toEqual(arr); 
        });

        it('can add items out of order', () => {
            priorityList.addItem(a);
            priorityList.addItem(c);
            priorityList.addItem(b);

            expect(priorityList.priorityArr).toEqual(arr);
        });
    });
});
