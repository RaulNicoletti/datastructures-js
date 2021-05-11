export class LinkedListNode<T = any> {
  public data: T;
  public next: LinkedListNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}
