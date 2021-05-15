import { partialDeepEqual } from '../utils/partial-deep-equal';
import { Comparator, CompareFn } from '../utils/comparator';
import { BinarySearchTreeNode } from './binary-search-tree-node';

export class BinarySearchTree<T> {
  private _root: BinarySearchTreeNode<T>;
  private comparator: Comparator;

  constructor(compareFn?: CompareFn<T>) {
    this._root = null;
    this.comparator = new Comparator(compareFn);
  }

  public get root() {
    return this._root;
  }

  public insert(data: T): BinarySearchTree<T> {
    const node = new BinarySearchTreeNode(data);

    if (!this._root) {
      this._root = node;
      return this;
    }

    let root = this._root;
    let current = root;

    while (root) {
      current = root;
      const compareResult = this.comparator.compare(data, root.data);

      if (compareResult === -1) {
        root = root.left;
      } else if (compareResult === 1) {
        root = root.right;
      } else if (compareResult === 0) {
        return this;
      }
    }

    const compareResult = this.comparator.compare(data, current.data);
    if (compareResult === -1) {
      current.left = node;
    } else if (compareResult === 1) {
      current.right = node;
    }

    return this;
  }

  public find(data: T | Partial<T>): T | null {
    if (!this.root) {
      return null;
    }

    let current = this._root;

    while (current) {
      if (partialDeepEqual(data, current.data)) {
        return current.data;
      }

      const compareResult = this.comparator.compare(data, current.data);

      if (compareResult === -1) {
        current = current.left;
      } else if (compareResult === 1) {
        current = current.right;
      }
    }

    return null;
  }

  public inOrderTraversal(node: BinarySearchTreeNode<T> | null): void {
    if (node) {
      this.inOrderTraversal(node.left);
      console.log(node.data);
      this.inOrderTraversal(node.right);
    }
  }

  public preOrderTraversal(node: BinarySearchTreeNode<T> | null): void {
    if (node) {
      console.log(node.data);
      this.preOrderTraversal(node.left);
      this.preOrderTraversal(node.right);
    }
  }
}
