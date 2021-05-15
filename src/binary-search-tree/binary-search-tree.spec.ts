import { CompareFn } from 'src/utils/comparator';
import { BinarySearchTree } from './binary-search-tree';

class Person {
  public id: number;
  public name: string;
  public age?: number;

  constructor(id: number, name: string, age?: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}

describe('binarySearchTree constructor', () => {
  it('should create a new tree', () => {
    const tree = new BinarySearchTree();

    expect(tree.root).toBeNull();
  });
});

describe('binarySearchTree insert', () => {
  it('should insert a new node', () => {
    const tree = new BinarySearchTree();

    tree.insert(1);

    expect(tree.root.data).toStrictEqual(1);
  });

  it('should insert a new node on the left side', () => {
    const tree = new BinarySearchTree();

    tree.insert(2).insert(1);

    expect(tree.root.data).toStrictEqual(2);
    expect(tree.root.left.data).toStrictEqual(1);
  });

  it('should insert a new node on the rigth side', () => {
    const tree = new BinarySearchTree<number>();

    tree.insert(1).insert(2);

    expect(tree.root.data).toStrictEqual(1);
    expect(tree.root.right.data).toStrictEqual(2);
  });

  it('should insert a new node on the rigth and on the left side', () => {
    const tree = new BinarySearchTree<number>();

    tree.insert(2).insert(1).insert(3);

    expect(tree.root.data).toStrictEqual(2);
    expect(tree.root.left.data).toStrictEqual(1);
    expect(tree.root.right.data).toStrictEqual(3);
  });

  it('should insert a new node on the left and on the left side', () => {
    const tree = new BinarySearchTree<number>();

    tree.insert(3).insert(2).insert(1);

    expect(tree.root.data).toStrictEqual(3);
    expect(tree.root.left.data).toStrictEqual(2);
    expect(tree.root.left.left.data).toStrictEqual(1);
  });

  it('should insert a new node on the right and on the right side', () => {
    const tree = new BinarySearchTree<number>();

    tree.insert(1).insert(2).insert(3);

    expect(tree.root.data).toStrictEqual(1);
    expect(tree.root.right.data).toStrictEqual(2);
    expect(tree.root.right.right.data).toStrictEqual(3);
  });

  it('should insert a new node on the right and then on the right-left side', () => {
    const tree = new BinarySearchTree<number>();

    tree.insert(2).insert(4).insert(3);

    expect(tree.root.data).toStrictEqual(2);
    expect(tree.root.right.data).toStrictEqual(4);
    expect(tree.root.right.left.data).toStrictEqual(3);
  });

  it('should insert nodes correctly when it an object', () => {
    const compareFn: CompareFn<Person> = (a, b) => {
      if (a.id === b.id) {
        return 0;
      }

      return a.id < b.id ? -1 : 1;
    };

    const tree = new BinarySearchTree<Person>(compareFn);
    const p1 = new Person(1, 'raul');
    const p2 = new Person(2, 'pedro', 27);

    tree.insert(p1).insert(p2);

    expect(tree.root.data).toStrictEqual(p1);
    expect(tree.root.right.data).toStrictEqual(p2);
  });
});

describe('binarySearchTree find', () => {
  it('should return null when the tree is empty', () => {
    const tree = new BinarySearchTree();

    const res = tree.find(1);

    expect(res).toBeNull();
  });

  it('should return the element when found', () => {
    const tree = new BinarySearchTree();

    tree.insert(1);
    const res = tree.find(1);

    expect(res).toBe(1);
  });

  it('should return null when the element is not found', () => {
    const tree = new BinarySearchTree();

    tree.insert(1).insert(2);
    const res = tree.find(3);

    expect(res).toBeNull();
  });

  it('should return the element when found - object test', () => {
    const compareFn: CompareFn<Person> = (a, b) => {
      if (a.id === b.id) {
        return 0;
      }

      return a.id < b.id ? -1 : 1;
    };

    const tree = new BinarySearchTree<Person>(compareFn);
    const p1 = new Person(1, 'raul');
    const p2 = new Person(2, 'pedro', 27);

    tree.insert(p1).insert(p2);
    const res = tree.find({ name: 'pedro' });

    expect(res).toBe(p2);
  });

  it('should return null when the element is not found - object test', () => {
    const compareFn: CompareFn<Person> = (a, b) => {
      if (a.id === b.id) {
        return 0;
      }

      return a.id < b.id ? -1 : 1;
    };

    const tree = new BinarySearchTree<Person>(compareFn);
    const p1 = new Person(1, 'raul');
    const p2 = new Person(2, 'pedro', 27);

    tree.insert(p1).insert(p2);
    const res = tree.find({ name: 'paulo' });

    expect(res).toBeNull();
  });
});

describe('binarySearchTree inOrderTraversal', () => {
  it('should perform Inorder traversal and return the values', () => {
    const tree = new BinarySearchTree<number>();

    const arr: number[] = [];
    jest.spyOn(console, 'log').mockImplementation((msg) => arr.push(msg));

    tree.insert(10).insert(5).insert(20).insert(8).insert(30);
    tree.inOrderTraversal(tree.root);

    expect(arr).toStrictEqual([5, 8, 10, 20, 30]);
  });
});
