import { BinarySearchTreeNode } from './binary-search-tree-node';

describe('binarySearchTreeNode constructor', () => {
  it('should create a new node', () => {
    const node = new BinarySearchTreeNode(1);

    expect(node.data).toStrictEqual(1);
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
  });
});
