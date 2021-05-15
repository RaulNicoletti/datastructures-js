type Primitive = string | number | boolean;
type ReturnComparableType = 1 | 0 | -1;

export type CompareFn<T = any> = (a: T, b: T) => ReturnComparableType;

export class Comparator {
  compare: CompareFn;

  constructor(compareFn?: CompareFn) {
    this.compare = compareFn || this.defaultCompare.bind(this);
  }

  private defaultCompare: CompareFn<Primitive> = (a, b) => {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  };
}
