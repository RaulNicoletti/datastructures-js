import { LinkedList } from './linked-list';
import { LinkedListNode } from './linked-list-node';

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

describe('linkedList constructor', () => {
  it('should create a new linked list without a node', () => {
    const linkedList = new LinkedList();

    expect(linkedList.head).toBeNull();
  });
});

describe('linkedList size', () => {
  it('should size be zero', () => {
    const linkedList = new LinkedList();

    expect(linkedList.size).toBe(0);
  });

  it('should size be one', () => {
    const linkedList = new LinkedList();
    const node = new LinkedListNode(1);

    linkedList.insert(node);

    expect(linkedList.size).toBe(1);
  });

  it('should size be two', () => {
    const linkedList = new LinkedList();
    const node1 = new LinkedListNode(1);
    const node2 = new LinkedListNode(2);

    linkedList.insert(node1).insert(node2);

    expect(linkedList.size).toBe(2);
  });
});

describe('linkedList insert', () => {
  it('should insert a new node in an empty linked list', () => {
    const linkedList = new LinkedList();
    const node = new LinkedListNode(1);

    linkedList.insert(node);

    expect(linkedList.head).toStrictEqual(node);
  });

  it('should insert a new node', () => {
    const linkedList = new LinkedList();
    const node1 = new LinkedListNode(1);
    const node2 = new LinkedListNode(2);

    linkedList.insert(node1).insert(node2);

    expect(linkedList.head).toStrictEqual(node1);

    const nextNode = linkedList.head.next;
    expect(nextNode).toStrictEqual(node2);
  });
});

describe('linkedList toArray', () => {
  it('should return the linked list in an array format', () => {
    const linkedList = new LinkedList();
    const node1 = new LinkedListNode(1);
    const node2 = new LinkedListNode(2);

    linkedList.insert(node1).insert(node2);

    const arr = linkedList.toArray();
    expect(arr).toStrictEqual([1, 2]);
  });
});

describe('linkedList find', () => {
  it('should find an element', () => {
    const linkedList = new LinkedList();
    const node = new LinkedListNode(1);

    linkedList.insert(node);

    const element = linkedList.find(1);

    expect(element).toStrictEqual(1);
  });

  it('should not find an element', () => {
    const linkedList = new LinkedList();

    const element = linkedList.find(1);

    expect(element).toBeNull();
  });

  it('should not find an element - 2', () => {
    const linkedList = new LinkedList();
    const node1 = new LinkedListNode(1);
    const node2 = new LinkedListNode(2);

    linkedList.insert(node1).insert(node2);

    const element = linkedList.find(3);

    expect(element).toBeNull();
  });

  it('should find an object element', () => {
    const p1 = new Person('raul', 32);
    const p2 = new Person('pedro', 52);
    const linkedList = new LinkedList<Person>();
    const node1 = new LinkedListNode(p1);
    const node2 = new LinkedListNode(p2);

    linkedList.insert(node1).insert(node2);

    const element = linkedList.find({ name: 'raul', age: 32 });

    expect(element).toStrictEqual(node1.data);
  });

  it('should not find an object element', () => {
    const p1 = new Person('raul', 32);
    const p2 = new Person('pedro', 52);
    const linkedList = new LinkedList<Person>();
    const node1 = new LinkedListNode(p1);
    const node2 = new LinkedListNode(p2);

    linkedList.insert(node1).insert(node2);

    const element = linkedList.find({ name: 'not found', age: 32 });

    expect(element).toBeNull();
  });
});

describe('linked List delete', () => {
  it('should not delete a node on an empty list and return null', () => {
    const linkedList = new LinkedList();

    expect(linkedList.size).toBe(0);

    const element = linkedList.delete(1);

    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(element).toBeNull();
  });

  it('should not delete a node when not found and return null', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode(1);
    const secondNode = new LinkedListNode(2);
    linkedList.insert(firstNode).insert(secondNode);

    expect(linkedList.size).toBe(2);

    const data = linkedList.delete(3);

    expect(linkedList.size).toBe(2);
    expect(data).toBeNull();
  });

  it('should delete a node, which is the head, and return it', () => {
    const linkedList = new LinkedList();
    const node = new LinkedListNode(1);
    linkedList.insert(node);

    expect(linkedList.size).toBe(1);

    const data = linkedList.delete(1);

    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(data).toStrictEqual(node.data);
  });

  it('should delete the head node', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode(1);
    const secondNode = new LinkedListNode(2);
    linkedList.insert(firstNode).insert(secondNode);

    expect(linkedList.size).toBe(2);

    const data = linkedList.delete(1);

    expect(linkedList.size).toBe(1);
    expect(linkedList.head).toStrictEqual(secondNode);
    expect(data).toStrictEqual(firstNode.data);
  });

  it('should delete the node', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode(1);
    const secondNode = new LinkedListNode(2);
    linkedList.insert(firstNode).insert(secondNode);

    expect(linkedList.size).toBe(2);

    const data = linkedList.delete(2);

    expect(linkedList.size).toBe(1);
    expect(linkedList.head).toStrictEqual(firstNode);
    expect(data).toStrictEqual(secondNode.data);
  });

  it('should delete the node - object argument', () => {
    const p1 = new Person('raul', 32);
    const p2 = new Person('pedro', 52);
    const linkedList = new LinkedList<Person>();
    const node1 = new LinkedListNode(p1);
    const node2 = new LinkedListNode(p2);

    linkedList.insert(node1).insert(node2);

    const element = linkedList.delete({ name: 'raul', age: 32 });

    expect(element).toStrictEqual(node1.data);
    expect(linkedList.head).toStrictEqual(node2);
  });

  it('should not delete the node - object argument', () => {
    const p1 = new Person('raul', 32);
    const p2 = new Person('pedro', 52);
    const linkedList = new LinkedList<Person>();
    const node1 = new LinkedListNode(p1);
    const node2 = new LinkedListNode(p2);

    linkedList.insert(node1).insert(node2);

    const element = linkedList.delete({ name: 'not found', age: 32 });

    expect(element).toBeNull();
    expect(linkedList.head).toStrictEqual(node1);
  });
});

describe('linkedList deleteHead', () => {
  it('should return null when the size is zero', () => {
    const linkedList = new LinkedList();

    expect(linkedList.size).toBe(0);

    const data = linkedList.deleteHead();

    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(data).toBeNull();
  });

  it('should delete the head node when there is only the head node', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode(1);
    linkedList.insert(firstNode);

    expect(linkedList.size).toBe(1);

    const data = linkedList.deleteHead();

    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(data).toStrictEqual(firstNode.data);
  });

  it('should delete the head node', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode(1);
    const secondNode = new LinkedListNode(2);
    linkedList.insert(firstNode).insert(secondNode);

    expect(linkedList.size).toBe(2);

    const data = linkedList.deleteHead();

    expect(linkedList.size).toBe(1);
    expect(linkedList.head).toStrictEqual(secondNode);
    expect(data).toStrictEqual(firstNode.data);
  });
});

describe('linkedList deleteTail', () => {
  it('should return null when the size is zero', () => {
    const linkedList = new LinkedList();

    expect(linkedList.size).toBe(0);

    const data = linkedList.deleteTail();

    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(data).toBeNull();
  });

  it('should delete the tail node when there is only the head', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode(1);
    linkedList.insert(firstNode);

    expect(linkedList.size).toBe(1);

    const data = linkedList.deleteTail();

    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(data).toStrictEqual(firstNode.data);
  });

  it('should delete the tail node', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode(1);
    const secondNode = new LinkedListNode(2);
    const thirdNode = new LinkedListNode(3);
    linkedList.insert(firstNode).insert(secondNode).insert(thirdNode);

    expect(linkedList.size).toBe(3);

    const data = linkedList.deleteTail();

    expect(linkedList.size).toBe(2);
    expect(data).toStrictEqual(thirdNode.data);
  });
});

describe('linkedList deleteAt', () => {
  it('should delete a node at specified position', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode(1);
    const secondNode = new LinkedListNode(2);
    const thirdNode = new LinkedListNode(3);
    linkedList.insert(firstNode).insert(secondNode).insert(thirdNode);

    expect(linkedList.size).toBe(3);

    const data = linkedList.deleteAt(2);
    const arr = linkedList.toArray();

    expect(linkedList.size).toBe(2);
    expect(data).toStrictEqual(secondNode.data);
    expect(arr).toStrictEqual([firstNode.data, thirdNode.data]);
  });

  it('should delete the first node', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode(1);
    const secondNode = new LinkedListNode(2);
    const thirdNode = new LinkedListNode(3);
    linkedList.insert(firstNode).insert(secondNode).insert(thirdNode);

    expect(linkedList.size).toBe(3);

    const data = linkedList.deleteAt(1);
    const arr = linkedList.toArray();

    expect(linkedList.size).toBe(2);
    expect(data).toStrictEqual(firstNode.data);
    expect(arr).toStrictEqual([secondNode.data, thirdNode.data]);
  });

  it('should delete the last node', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode(1);
    const secondNode = new LinkedListNode(2);
    const thirdNode = new LinkedListNode(3);
    linkedList.insert(firstNode).insert(secondNode).insert(thirdNode);

    expect(linkedList.size).toBe(3);

    const data = linkedList.deleteAt(3);
    const arr = linkedList.toArray();

    expect(linkedList.size).toBe(2);
    expect(data).toStrictEqual(thirdNode.data);
    expect(arr).toStrictEqual([firstNode.data, secondNode.data]);
  });

  it('should not delete when the position is greater than size', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode(1);
    const secondNode = new LinkedListNode(2);
    const thirdNode = new LinkedListNode(3);
    linkedList.insert(firstNode).insert(secondNode).insert(thirdNode);

    expect(linkedList.size).toBe(3);

    const data = linkedList.deleteAt(4);
    const arr = linkedList.toArray();

    expect(linkedList.size).toBe(3);
    expect(data).toBeNull();
    expect(arr).toStrictEqual([
      firstNode.data,
      secondNode.data,
      thirdNode.data,
    ]);
  });

  it('should return null when the size is zero', () => {
    const linkedList = new LinkedList();

    expect(linkedList.size).toBe(0);

    const data = linkedList.deleteAt(2);
    const arr = linkedList.toArray();

    expect(linkedList.size).toBe(0);
    expect(data).toBeNull();
    expect(arr).toStrictEqual([]);
  });
});

describe('linkedList insertAt', () => {
  it('should not insert a node when the position is greater than the size and greater than one', () => {
    const linkedList = new LinkedList();
    const node = new LinkedListNode(1);

    expect(linkedList.size).toBe(0);

    linkedList.insertAt(2, node);
    const arr = linkedList.toArray();

    expect(linkedList.size).toBe(0);
    expect(arr).toStrictEqual([]);
  });

  it('should insert a node when the position is one and the list is empty', () => {
    const linkedList = new LinkedList();
    const node = new LinkedListNode(1);

    expect(linkedList.size).toBe(0);

    const element = linkedList.insertAt(1, node);
    const arr = linkedList.toArray();

    expect(linkedList.size).toBe(1);
    expect(element.head).toStrictEqual(node);
    expect(arr).toStrictEqual([node.data]);
  });

  it('should insert a node at given position', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode(1);
    const secondNode = new LinkedListNode(2);
    const thirdNode = new LinkedListNode(3);
    const fourthNode = new LinkedListNode(4);

    expect(linkedList.size).toBe(0);

    linkedList.insert(firstNode);
    linkedList.insert(secondNode);
    linkedList.insertAt(2, thirdNode);
    linkedList.insertAt(1, fourthNode);

    expect(linkedList.size).toBe(4);

    const arr = linkedList.toArray();

    expect(arr).toStrictEqual([
      fourthNode.data,
      firstNode.data,
      thirdNode.data,
      secondNode.data,
    ]);
  });
});

describe('linkedList reverse', () => {
  it('should do nothing on an empty list', () => {
    const linkedList = new LinkedList();

    linkedList.reverse();

    const arr = linkedList.toArray();
    expect(arr).toStrictEqual([]);
  });

  it('should revert a linked list - 1 element', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode(1);

    linkedList.insert(firstNode);

    linkedList.reverse();

    const arr = linkedList.toArray();
    expect(arr).toStrictEqual([1]);
  });

  it('should revert a linked list - 2 elements', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode(1);
    const secondNode = new LinkedListNode(2);

    linkedList.insert(firstNode).insert(secondNode);

    linkedList.reverse();

    const arr = linkedList.toArray();
    expect(arr).toStrictEqual([2, 1]);
  });

  it('should revert a linked list - 4 elements', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode(1);
    const secondNode = new LinkedListNode(2);
    const thirdNode = new LinkedListNode(3);
    const fourthNode = new LinkedListNode(4);

    linkedList
      .insert(firstNode)
      .insert(secondNode)
      .insert(thirdNode)
      .insert(fourthNode);

    linkedList.reverse();

    const arr = linkedList.toArray();
    expect(arr).toStrictEqual([4, 3, 2, 1]);
  });
});

describe('linkedList [Symbol.iterator]', () => {
  it('should iterate through the linked list using for of', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode('1');
    const secondNode = new LinkedListNode('2');
    const thirdNode = new LinkedListNode('3');
    const fourthNode = new LinkedListNode('4');

    linkedList
      .insert(firstNode)
      .insert(secondNode)
      .insert(thirdNode)
      .insert(fourthNode);

    let str = '';
    for (const value of linkedList) {
      str += value;
    }

    expect(str).toBe('1234');
  });
});
