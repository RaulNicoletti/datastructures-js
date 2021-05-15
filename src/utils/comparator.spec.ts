import { Comparator, CompareFn } from './comparator';

class Person {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

describe('comparator compare', () => {
  it('should return -1 when A is lesser than B', () => {
    const a = 1;
    const b = 2;

    const comparator = new Comparator();
    const res = comparator.compare(a, b);

    expect(res).toBe(-1);
  });

  it('should return 1 when A is greater than B', () => {
    const a = 2;
    const b = 1;

    const comparator = new Comparator();
    const res = comparator.compare(a, b);

    expect(res).toBe(1);
  });

  it('should return 0 when A is equal to B', () => {
    const a = 1;
    const b = 1;

    const comparator = new Comparator();
    const res = comparator.compare(a, b);

    expect(res).toBe(0);
  });

  it('should return -1 when A is lesser than B - customized compare function', () => {
    const p1 = new Person(1, 'raul');
    const p2 = new Person(2, 'pedro');

    const compareFn: CompareFn<Person> = (a, b) => {
      if (a.id === b.id) {
        return 0;
      }

      return a.id < b.id ? -1 : 1;
    };

    const comparator = new Comparator(compareFn);
    const res = comparator.compare(p1, p2);

    expect(res).toBe(-1);
  });

  it('should return 1 when A is greater than B - customized compare function', () => {
    const p1 = new Person(2, 'raul');
    const p2 = new Person(1, 'pedro');

    const compareFn: CompareFn<Person> = (a, b) => {
      if (a.id === b.id) {
        return 0;
      }

      return a.id < b.id ? -1 : 1;
    };

    const comparator = new Comparator(compareFn);
    const res = comparator.compare(p1, p2);

    expect(res).toBe(1);
  });

  it('should return 0 when A is equal to B - customized compare function', () => {
    const p1 = new Person(1, 'raul');
    const p2 = new Person(1, 'pedro');

    const compareFn: CompareFn<Person> = (a, b) => {
      if (a.id === b.id) {
        return 0;
      }

      return a.id < b.id ? -1 : 1;
    };

    const comparator = new Comparator(compareFn);
    const res = comparator.compare(p1, p2);

    expect(res).toBe(0);
  });

  it('should return -1 when A is lesser than B - customized compare function 2', () => {
    const p1 = new Person(1, 'aline');
    const p2 = new Person(2, 'bia');

    const compareFn: CompareFn<Person> = (a, b) => {
      if (a.name === b.name) {
        return 0;
      }

      return a.name < b.name ? -1 : 1;
    };

    const comparator = new Comparator(compareFn);
    const res = comparator.compare(p1, p2);

    expect(res).toBe(-1);
  });

  it('should return -1 when A is greater than B - customized compare function 2', () => {
    const p1 = new Person(1, 'bia');
    const p2 = new Person(2, 'aline');

    const compareFn: CompareFn<Person> = (a, b) => {
      if (a.name === b.name) {
        return 0;
      }

      return a.name < b.name ? -1 : 1;
    };

    const comparator = new Comparator(compareFn);
    const res = comparator.compare(p1, p2);

    expect(res).toBe(1);
  });

  it('should return 0 when A is equal to B - customized compare function 2', () => {
    const p1 = new Person(1, 'aline');
    const p2 = new Person(1, 'aline');

    const compareFn: CompareFn<Person> = (a, b) => {
      if (a.name === b.name) {
        return 0;
      }

      return a.name < b.name ? -1 : 1;
    };

    const comparator = new Comparator(compareFn);
    const res = comparator.compare(p1, p2);

    expect(res).toBe(0);
  });
});
