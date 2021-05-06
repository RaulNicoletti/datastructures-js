import { LinkedListNode } from './linked-list-node';

describe('LinkedListNode constructor', () => {
  it('should create a new node with data', () => {
    const node = new LinkedListNode('teste');

    expect(node).toMatchObject<LinkedListNode>({ data: 'teste', next: null });
  });
});
