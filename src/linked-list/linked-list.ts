import { LinkedListNode } from './linked-list-node';
import { partialDeepEqual } from '../utils/partial-deep-equal';

export class LinkedList<T = any> {
  private _head: LinkedListNode<T> | null;
  private _size: number;

  constructor() {
    this._head = null;
    this._size = 0;
  }

  public get size() {
    return this._size;
  }

  public get head() {
    return this._head;
  }

  private incrementSize() {
    this._size++;
  }

  private decrementSize() {
    this._size--;
  }

  public insert(data: T): LinkedList<T> {
    const node = new LinkedListNode<T>(data);
    this.incrementSize();

    if (!this._head) {
      this._head = node;
      return this;
    }

    let root = this._head;
    while (root.next) {
      root = root.next;
    }

    root.next = node;

    return this;
  }

  public insertAt(position: number, data: T): LinkedList<T> {
    const node = new LinkedListNode<T>(data);
    if (position === 1) {
      this.incrementSize();
      const oldHead = this._head;
      this._head = node;
      this._head.next = oldHead;
      return this;
    }

    if (position > this.size) {
      return this;
    }

    let currentNode = this._head;
    let previousNode = currentNode;
    for (let i = 1; i < position; i++) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    this.incrementSize();
    previousNode.next = node;
    node.next = currentNode;

    return this;
  }

  public toArray(): T[] {
    const arr = new Array<T>();

    let node = this._head;
    while (node) {
      arr.push(node.data);
      node = node.next;
    }

    return arr;
  }

  public fromArray(arr: T[]): LinkedList<T> {
    arr.forEach((value) => this.insert(value));
    return this;
  }

  public find(data: T | Partial<T>): T | null {
    let node = this._head;

    while (node) {
      if (partialDeepEqual(data, node.data)) {
        return node.data;
      }

      node = node.next;
    }

    return null;
  }

  public delete(data: T | Partial<T>): T | null {
    if (!this._head) {
      return null;
    }

    if (partialDeepEqual(data, this._head.data)) {
      return this.deleteHead();
    }

    let node = this._head;
    let previousNode = null;

    while (node) {
      if (partialDeepEqual(data, node.data)) {
        this.decrementSize();
        previousNode.next = node.next;
        return node.data;
      }

      previousNode = node;
      node = node.next;
    }

    return null;
  }

  public deleteHead(): T | null {
    if (!this._head) {
      return null;
    }

    this.decrementSize();
    const data = this._head.data;
    this._head = this._head.next;
    return data;
  }

  public deleteTail(): T | null {
    if (!this._head) {
      return null;
    }

    if (this.size === 1) {
      return this.deleteHead();
    }

    let node = this._head;
    let previousNode = node;
    while (node.next) {
      previousNode = node;
      node = node.next;
    }

    this.decrementSize();
    previousNode.next = null;
    return node.data;
  }

  public deleteAt(position: number): T | null {
    if (!this._head) {
      return null;
    }

    if (position === 1) {
      return this.deleteHead();
    }

    if (position === this.size) {
      return this.deleteTail();
    }

    if (position > this.size) {
      return null;
    }

    let node = this._head;
    let previousNode = node;
    for (let i = 1; i < position; i++) {
      previousNode = node;
      node = node.next;
    }

    this.decrementSize();
    previousNode.next = node.next;
    return node.data;
  }

  public reverse() {
    if (!this._head) {
      return;
    }

    let previousNode = null;
    let currentNode = null;
    let nextNode = this._head;

    while (nextNode) {
      previousNode = currentNode;
      currentNode = nextNode;
      nextNode = nextNode.next;
      currentNode.next = previousNode;
    }

    previousNode = currentNode;
    this._head = previousNode;
  }

  protected [Symbol.iterator]() {
    let node = this._head;

    return {
      next: () => {
        if (node) {
          const data = node.data;
          node = node.next;
          return { value: data, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}
