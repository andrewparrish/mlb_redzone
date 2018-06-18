import { Node } from './node';

describe('Node', () => {
    const node = new Node('a');
    const nextNode = new Node('b');

    it('sets its val', () => {
        expect(node.val).toEqual('a');
    });

    it('#setNext', () => {
        node.setNext(nextNode);
        expect(node.next).toEqual(nextNode);
    });

});

