import { LinkedList } from './linked-list';

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

    linkedList.insert(1);

    expect(linkedList.size).toBe(1);
  });

  it('should size be two', () => {
    const linkedList = new LinkedList();

    linkedList.insert(1).insert(2);

    expect(linkedList.size).toBe(2);
  });
});

describe('linkedList insert', () => {
  it('should insert a new node in an empty linked list', () => {
    const linkedList = new LinkedList();

    linkedList.insert(1);

    expect(linkedList.head.data).toStrictEqual(1);
  });

  it('should insert a new node', () => {
    const linkedList = new LinkedList();

    linkedList.insert(1).insert(2);

    expect(linkedList.head.data).toStrictEqual(1);

    const nextNode = linkedList.head.next;
    expect(nextNode.data).toStrictEqual(2);
  });
});

describe('linkedList toArray', () => {
  it('should return the linked list in an array format', () => {
    const linkedList = new LinkedList();

    linkedList.insert(1).insert(2);

    const arr = linkedList.toArray();
    expect(arr).toStrictEqual([1, 2]);
  });
});

describe('linkedList fromArray', () => {
  it('should return the linked list in an array format', () => {
    const linkedList = new LinkedList();

    const arr = [1, 2, 3];
    linkedList.fromArray(arr);

    expect(linkedList.size).toBe(3);

    let str = '';
    for (const value of linkedList) {
      str += value.toString();
    }

    expect(str).toStrictEqual('123');
  });
});

describe('linkedList find', () => {
  it('should find an element', () => {
    const linkedList = new LinkedList();

    linkedList.insert(1);

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

    linkedList.insert(1).insert(2);

    const element = linkedList.find(3);

    expect(element).toBeNull();
  });

  it('should find an object element', () => {
    const p1 = new Person('raul', 32);
    const p2 = new Person('pedro', 52);
    const linkedList = new LinkedList<Person>();

    linkedList.insert(p1).insert(p2);

    const element = linkedList.find({ name: 'raul', age: 32 });

    expect(element).toStrictEqual(p1);
  });

  it('should not find an object element', () => {
    const p1 = new Person('raul', 32);
    const p2 = new Person('pedro', 52);
    const linkedList = new LinkedList<Person>();

    linkedList.insert(p1).insert(p2);

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
    linkedList.insert(1).insert(2);

    expect(linkedList.size).toBe(2);

    const data = linkedList.delete(3);

    expect(linkedList.size).toBe(2);
    expect(data).toBeNull();
  });

  it('should delete a node, which is the head, and return it', () => {
    const linkedList = new LinkedList();
    linkedList.insert(1);

    expect(linkedList.size).toBe(1);

    const data = linkedList.delete(1);

    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(data).toStrictEqual(1);
  });

  it('should delete the head node', () => {
    const linkedList = new LinkedList();
    linkedList.insert(1).insert(2);

    expect(linkedList.size).toBe(2);

    const data = linkedList.delete(1);

    expect(linkedList.size).toBe(1);
    expect(linkedList.head.data).toStrictEqual(2);
    expect(data).toStrictEqual(1);
  });

  it('should delete the node', () => {
    const linkedList = new LinkedList();
    linkedList.insert(1).insert(2);

    expect(linkedList.size).toBe(2);

    const data = linkedList.delete(2);

    expect(linkedList.size).toBe(1);
    expect(linkedList.head.data).toStrictEqual(1);
    expect(data).toStrictEqual(2);
  });

  it('should delete the node - object argument', () => {
    const p1 = new Person('raul', 32);
    const p2 = new Person('pedro', 52);
    const linkedList = new LinkedList<Person>();

    linkedList.insert(p1).insert(p2);

    const element = linkedList.delete({ name: 'raul', age: 32 });

    expect(element).toStrictEqual(p1);
    expect(linkedList.head.data).toStrictEqual(p2);
  });

  it('should not delete the node - object argument', () => {
    const p1 = new Person('raul', 32);
    const p2 = new Person('pedro', 52);
    const linkedList = new LinkedList<Person>();

    linkedList.insert(p1).insert(p2);

    const element = linkedList.delete({ name: 'not found', age: 32 });

    expect(element).toBeNull();
    expect(linkedList.head.data).toStrictEqual(p1);
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
    linkedList.insert(1);

    expect(linkedList.size).toBe(1);

    const data = linkedList.deleteHead();

    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(data).toStrictEqual(1);
  });

  it('should delete the head node', () => {
    const linkedList = new LinkedList();
    linkedList.insert(1).insert(2);

    expect(linkedList.size).toBe(2);

    const data = linkedList.deleteHead();

    expect(linkedList.size).toBe(1);
    expect(linkedList.head.data).toStrictEqual(2);
    expect(data).toStrictEqual(1);
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
    linkedList.insert(1);

    expect(linkedList.size).toBe(1);

    const data = linkedList.deleteTail();

    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(data).toStrictEqual(1);
  });

  it('should delete the tail node', () => {
    const linkedList = new LinkedList();
    linkedList.insert(1).insert(2).insert(3);

    expect(linkedList.size).toBe(3);

    const data = linkedList.deleteTail();

    expect(linkedList.size).toBe(2);
    expect(data).toStrictEqual(3);
  });
});

describe('linkedList deleteAt', () => {
  it('should delete a node at specified position', () => {
    const linkedList = new LinkedList();
    linkedList.insert(1).insert(2).insert(3);

    expect(linkedList.size).toBe(3);

    const data = linkedList.deleteAt(2);
    const arr = linkedList.toArray();

    expect(linkedList.size).toBe(2);
    expect(data).toStrictEqual(2);
    expect(arr).toStrictEqual([1, 3]);
  });

  it('should delete the first node', () => {
    const linkedList = new LinkedList();
    linkedList.insert(1).insert(2).insert(3);

    expect(linkedList.size).toBe(3);

    const data = linkedList.deleteAt(1);
    const arr = linkedList.toArray();

    expect(linkedList.size).toBe(2);
    expect(data).toStrictEqual(1);
    expect(arr).toStrictEqual([2, 3]);
  });

  it('should delete the last node', () => {
    const linkedList = new LinkedList();
    linkedList.insert(1).insert(2).insert(3);

    expect(linkedList.size).toBe(3);

    const data = linkedList.deleteAt(3);
    const arr = linkedList.toArray();

    expect(linkedList.size).toBe(2);
    expect(data).toStrictEqual(3);
    expect(arr).toStrictEqual([1, 2]);
  });

  it('should not delete when the position is greater than size', () => {
    const linkedList = new LinkedList();
    linkedList.insert(1).insert(2).insert(3);

    expect(linkedList.size).toBe(3);

    const data = linkedList.deleteAt(4);
    const arr = linkedList.toArray();

    expect(linkedList.size).toBe(3);
    expect(data).toBeNull();
    expect(arr).toStrictEqual([1, 2, 3]);
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

    expect(linkedList.size).toBe(0);

    linkedList.insertAt(2, 1);
    const arr = linkedList.toArray();

    expect(linkedList.size).toBe(0);
    expect(arr).toStrictEqual([]);
  });

  it('should insert a node when the position is one and the list is empty', () => {
    const linkedList = new LinkedList();

    expect(linkedList.size).toBe(0);

    const element = linkedList.insertAt(1, 1);
    const arr = linkedList.toArray();

    expect(linkedList.size).toBe(1);
    expect(element.head.data).toStrictEqual(1);
    expect(arr).toStrictEqual([1]);
  });

  it('should insert a node at given position', () => {
    const linkedList = new LinkedList();

    expect(linkedList.size).toBe(0);

    linkedList.insert(1);
    linkedList.insert(2);
    linkedList.insertAt(2, 3);
    linkedList.insertAt(1, 4);

    expect(linkedList.size).toBe(4);

    const arr = linkedList.toArray();

    expect(arr).toStrictEqual([4, 1, 3, 2]);
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

    linkedList.insert(1);

    linkedList.reverse();

    const arr = linkedList.toArray();
    expect(arr).toStrictEqual([1]);
  });

  it('should revert a linked list - 2 elements', () => {
    const linkedList = new LinkedList();

    linkedList.insert(1).insert(2);

    linkedList.reverse();

    const arr = linkedList.toArray();
    expect(arr).toStrictEqual([2, 1]);
  });

  it('should revert a linked list - 4 elements', () => {
    const linkedList = new LinkedList();

    linkedList.insert(1).insert(2).insert(3).insert(4);

    linkedList.reverse();

    const arr = linkedList.toArray();
    expect(arr).toStrictEqual([4, 3, 2, 1]);
  });
});

describe('linkedList [Symbol.iterator]', () => {
  it('should iterate through the linked list using for of', () => {
    const linkedList = new LinkedList();

    linkedList.insert('1').insert('2').insert('3').insert('4');

    let str = '';
    for (const value of linkedList) {
      str += value;
    }

    expect(str).toBe('1234');
  });
});
