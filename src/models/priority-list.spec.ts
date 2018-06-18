import { PriorityList } from './priority-list';
import { Node } from './node';

describe('PriorityList', () => {
    let priorityList: PriorityList;
    const node = new Node('a');
    let priorityArrList: PriorityList;

    beforeEach(() => {
        priorityList = new PriorityList();
        priorityArrList = new PriorityList([node.val]);
    });

    describe('.new', () => {
        it('has an empty priorityArr by default', () => {
            expect(priorityList.priorityArr).toEqual([]);
        });

        it('can construct from a priority arr', () => {
            expect(priorityArrList.head).toEqual(node);
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
