import { LinkedListNode } from './linked-list-node';

describe('linkedListNode constructor', () => {
  it('should create a new node with data', () => {
    const node = new LinkedListNode(1);

    expect(node).toMatchObject<LinkedListNode>({ data: 1, next: null });
  });
});
