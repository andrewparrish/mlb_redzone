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

    describe('#addItem', () => {
        const a = { val: 'a', priority: 1 };
        const b = { val: 'b', priority: 2 };
        const c = { val: 'c', priority: 3 };
        const arr = [a, b, c];

        beforeAll(() => {
            arr.forEach(el => priorityList.addItem(el);
        });

        it('can add sequential items', () => {
            expect(priorityList.priorityArr).toEqual(arr); 
        });
    })
});
