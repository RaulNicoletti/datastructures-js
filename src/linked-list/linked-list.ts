import { LinkedListNode } from './linked-list-node';

export class LinkedList {
  public head: LinkedListNode | null;
  private _size: number;

  constructor(node?: LinkedListNode) {
    this.head = node || null;
    this._size = node ? 1 : 0;
  }

  public get size() {
    return this._size;
  }

  private incrementSize() {
    this._size++;
  }

  private decrementSize() {
    this._size--;
  }

  public insert(node: LinkedListNode): LinkedList {
    this.incrementSize();

    if (!this.head) {
      this.head = node;
      return this;
    }

    let root = this.head;
    while (root.next) {
      root = root.next;
    }

    root.next = node;

    return this;
  }

  public insertAt(position: number, node: LinkedListNode): LinkedList {
    if (position === 1) {
      this.incrementSize();
      const oldHead = this.head;
      this.head = node;
      this.head.next = oldHead;
      return this;
    }

    if (position > this.size) {
      return this;
    }

    let currentNode = this.head;
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

  public toArray(): any[] {
    const arr = [];

    let node = this.head;
    while (node) {
      arr.push(node.data);
      node = node.next;
    }

    return arr;
  }

  public search(data: any): LinkedListNode | null {
    let node = this.head;

    while (node) {
      if (node.data === data) {
        return node;
      }

      node = node.next;
    }

    return null;
  }

  public delete(data: any): any | null {
    if (this.size === 0) {
      return null;
    }

    if (this.head.data === data) {
      this.decrementSize();
      const data = this.head.data;
      this.head = this.head.next;
      return data;
    }

    let node = this.head;
    let previousNode = null;

    while (node) {
      if (node.data === data) {
        this.decrementSize();
        previousNode.next = node.next;
        return node.data;
      }

      previousNode = node;
      node = node.next;
    }

    return null;
  }

  public deleteHead(): any | null {
    if (!this.head) {
      return null;
    }

    this.decrementSize();
    const data = this.head.data;
    this.head = this.head.next;
    return data;
  }

  public deleteTail(): any | null {
    if (!this.head) {
      return null;
    }

    if (this.size === 1) {
      const data = this.deleteHead();
      return data;
    }

    let node = this.head;
    let previousNode = node;
    while (node.next) {
      previousNode = node;
      node = node.next;
    }

    this.decrementSize();
    previousNode.next = null;
    return node.data;
  }

  public deleteAt(position: number): any | null {
    if (this.size === 0) {
      return null;
    }

    if (position === 1) {
      const data = this.deleteHead();
      return data;
    }

    if (position === this.size) {
      const data = this.deleteTail();
      return data;
    }

    if (position > this.size) {
      return null;
    }

    let node = this.head;
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
    if (!this.head) {
      return;
    }

    let previousNode = null;
    let currentNode = null;
    let nextNode = this.head;

    while (nextNode) {
      previousNode = currentNode;
      currentNode = nextNode;
      nextNode = nextNode.next;
      currentNode.next = previousNode;
    }

    previousNode = currentNode;
    this.head = previousNode;
  }

  protected [Symbol.iterator]() {
    let node = this.head;

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
