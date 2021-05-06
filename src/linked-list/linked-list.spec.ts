import { LinkedList } from './linked-list';
import { LinkedListNode } from './linked-list-node';

describe('LinkedList constructor', () => {
  it('should create a new linked list without a node', () => {
    const linkedList = new LinkedList();

    expect(linkedList.head).toBeNull();
  });

  it('should create a new linked list with a node', () => {
    const node = new LinkedListNode('test');
    const linkedList = new LinkedList(node);

    expect(linkedList.head).toStrictEqual(node);
  });
});

describe('LinkedList size', () => {
  it('should size be zero', () => {
    const linkedList = new LinkedList();

    expect(linkedList.size).toBe(0);
  });

  it('should size be one', () => {
    const node = new LinkedListNode('test');
    const linkedList = new LinkedList(node);

    expect(linkedList.size).toBe(1);
  });

  it('should size be two', () => {
    const node = new LinkedListNode('test');
    const linkedList = new LinkedList(node);

    const anotherNode = new LinkedListNode('test 2');
    linkedList.insert(anotherNode);

    expect(linkedList.size).toBe(2);
  });
});

describe('LinkedList insert', () => {
  it('should insert a new node in an empty linked list', () => {
    const node = new LinkedListNode('test');
    const linkedList = new LinkedList();
    linkedList.insert(node);

    expect(linkedList.head).toStrictEqual(node);
  });

  it('should insert a new node', () => {
    const node = new LinkedListNode('test');
    const linkedList = new LinkedList(node);

    const anotherNode = new LinkedListNode('test 2');
    linkedList.insert(anotherNode);

    expect(linkedList.head).toStrictEqual(node);

    const nextNode = linkedList.head.next;
    expect(nextNode).toStrictEqual(anotherNode);
  });
});

describe('LinkedList toArray', () => {
  it('should return the linked list in an array format', () => {
    const linkedList = new LinkedList();
    const node = new LinkedListNode('test');
    const anotherNode = new LinkedListNode('test 2');
    linkedList.insert(node).insert(anotherNode);

    const arr = linkedList.toArray();
    expect(arr).toStrictEqual(['test', 'test 2']);
  });
});

describe('LinkedList search', () => {
  it('should search an element and find', () => {
    const node = new LinkedListNode('test');
    const linkedList = new LinkedList(node);

    const element = linkedList.search('test');

    expect(element).toStrictEqual(node);
  });

  it('should search an element and not find', () => {
    const linkedList = new LinkedList();

    const element = linkedList.search('test');

    expect(element).toBeNull();
  });

  it('should search an element and not find 2', () => {
    const linkedList = new LinkedList();
    const node = new LinkedListNode('test');
    const anotherNode = new LinkedListNode('test 2');
    linkedList.insert(node).insert(anotherNode);

    const element = linkedList.search('test 3');

    expect(element).toBeNull();
  });
});

describe('Linked List delete', () => {
  it('should not delete a node on an empty list and return null', () => {
    const linkedList = new LinkedList();

    expect(linkedList.size).toBe(0);

    const element = linkedList.delete('test');

    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(element).toBeNull();
  });

  it('should not delete a node when not found and return null', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode('test');
    const secondNode = new LinkedListNode('test 2');
    linkedList.insert(firstNode).insert(secondNode);

    expect(linkedList.size).toBe(2);

    const data = linkedList.delete('test 3');

    expect(linkedList.size).toBe(2);
    expect(data).toBeNull();
  });

  it('should delete a node, which is the head, and return it', () => {
    const linkedList = new LinkedList();
    const node = new LinkedListNode('test');
    linkedList.insert(node);

    expect(linkedList.size).toBe(1);

    const data = linkedList.delete('test');

    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(data).toStrictEqual(node.data);
  });

  it('should delete the head node', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode('test');
    const secondNode = new LinkedListNode('test 2');
    linkedList.insert(firstNode).insert(secondNode);

    expect(linkedList.size).toBe(2);

    const data = linkedList.delete('test');

    expect(linkedList.size).toBe(1);
    expect(linkedList.head).toStrictEqual(secondNode);
    expect(data).toStrictEqual(firstNode.data);
  });

  it('should delete the node', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode('test');
    const secondNode = new LinkedListNode('test 2');
    linkedList.insert(firstNode).insert(secondNode);

    expect(linkedList.size).toBe(2);

    const data = linkedList.delete('test 2');

    expect(linkedList.size).toBe(1);
    expect(linkedList.head).toStrictEqual(firstNode);
    expect(data).toStrictEqual(secondNode.data);
  });
});

describe('LinkedList deleteHead', () => {
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
    const firstNode = new LinkedListNode('test');
    linkedList.insert(firstNode);

    expect(linkedList.size).toBe(1);

    const data = linkedList.deleteHead();

    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(data).toStrictEqual(firstNode.data);
  });

  it('should delete the head node', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode('test');
    const secondNode = new LinkedListNode('test 2');
    linkedList.insert(firstNode).insert(secondNode);

    expect(linkedList.size).toBe(2);

    const data = linkedList.deleteHead();

    expect(linkedList.size).toBe(1);
    expect(linkedList.head).toStrictEqual(secondNode);
    expect(data).toStrictEqual(firstNode.data);
  });
});

describe('LinkedList deleteTail', () => {
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
    const firstNode = new LinkedListNode('test');
    linkedList.insert(firstNode);

    expect(linkedList.size).toBe(1);

    const data = linkedList.deleteTail();

    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(data).toStrictEqual(firstNode.data);
  });

  it('should delete the tail node', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode('test');
    const secondNode = new LinkedListNode('test 2');
    const thirdNode = new LinkedListNode('test 3');
    linkedList.insert(firstNode).insert(secondNode).insert(thirdNode);

    expect(linkedList.size).toBe(3);

    const data = linkedList.deleteTail();

    expect(linkedList.size).toBe(2);
    expect(data).toStrictEqual(thirdNode.data);
  });
});

describe('LinkedList deleteAt', () => {
  it('should delete a node at specified position', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode('test');
    const secondNode = new LinkedListNode('test 2');
    const thirdNode = new LinkedListNode('test 3');
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
    const firstNode = new LinkedListNode('test');
    const secondNode = new LinkedListNode('test 2');
    const thirdNode = new LinkedListNode('test 3');
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
    const firstNode = new LinkedListNode('test');
    const secondNode = new LinkedListNode('test 2');
    const thirdNode = new LinkedListNode('test 3');
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
    const firstNode = new LinkedListNode('test');
    const secondNode = new LinkedListNode('test 2');
    const thirdNode = new LinkedListNode('test 3');
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

describe('LinkedList insertAt', () => {
  it('should not insert a node when the position is greater than the size and greater than one', () => {
    const linkedList = new LinkedList();
    const node = new LinkedListNode('test');

    expect(linkedList.size).toBe(0);

    linkedList.insertAt(2, node);
    const arr = linkedList.toArray();

    expect(linkedList.size).toBe(0);
    expect(arr).toStrictEqual([]);
  });

  it('should insert a node when the position is one and the list is empty', () => {
    const linkedList = new LinkedList();
    const node = new LinkedListNode('test');

    expect(linkedList.size).toBe(0);

    const element = linkedList.insertAt(1, node);
    const arr = linkedList.toArray();

    expect(linkedList.size).toBe(1);
    expect(element.head).toStrictEqual(node);
    expect(arr).toStrictEqual([node.data]);
  });

  it('should insert a node at given position', () => {
    const linkedList = new LinkedList();
    const firstNode = new LinkedListNode('test');
    const secondNode = new LinkedListNode('test 2');
    const thirdNode = new LinkedListNode('test 3');
    const fourthNode = new LinkedListNode('test 4');

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

describe('LinkedList reverse', () => {
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

describe('LinkedList [Symbol.iterator]', () => {
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
