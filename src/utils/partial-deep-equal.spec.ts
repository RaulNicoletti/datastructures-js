import { delay } from './utils';
import { partialDeepEqual } from './partial-deep-equal';

describe('partialDeepEqual partialDeepEqual', () => {
  it('should return true if is string and equal', () => {
    const res = partialDeepEqual('str', 'str');
    expect(res).toBe(true);
  });

  it('should return false if is string and not equal', () => {
    const res = partialDeepEqual('str', 1);
    expect(res).toBe(false);
  });

  it('should return true if is number and equal', () => {
    const res = partialDeepEqual(1, 1);
    expect(res).toBe(true);
  });

  it('should return false if is number and not equal', () => {
    const res = partialDeepEqual(1, '1');
    expect(res).toBe(false);
  });

  it('should return true if is boolean and equal', () => {
    const res = partialDeepEqual(true, true);
    const res2 = partialDeepEqual(false, false);
    expect(res).toBe(true);
    expect(res2).toBe(true);
  });

  it('should return false if is boolean and not equal', () => {
    const res = partialDeepEqual(true, 1);
    expect(res).toBe(false);
  });

  it('should return true if is Date and equal', () => {
    const d1 = new Date();
    const d2 = new Date(d1);
    const res = partialDeepEqual(d1, d2);
    expect(res).toBe(true);
  });

  it('should return false if is Date and not equal', async () => {
    expect.assertions(1);
    const d1 = new Date();
    await delay(1);
    const d2 = new Date();
    const res = partialDeepEqual(d1, d2);
    expect(res).toBe(false);
  });

  it('should return true if is Object and both are empty', () => {
    const obj1 = {};
    const obj2 = {};
    const res = partialDeepEqual(obj1, obj2);
    expect(res).toBe(true);
  });

  it('should return false if is Object and do not has the property', () => {
    const obj1 = { name: 'raul' };
    const obj2 = { age: 32 };
    const res = partialDeepEqual(obj1, obj2);
    expect(res).toBe(false);
  });

  it('should return true if is Object and has the property with same value', () => {
    const obj1 = { name: 'raul' };
    const obj2 = { name: 'raul' };
    const res = partialDeepEqual(obj1, obj2);
    expect(res).toBe(true);
  });

  it('should return false if is Object and has the property with different value', () => {
    const obj1 = { name: 'raul' };
    const obj2 = { name: 'pedro' };
    const res = partialDeepEqual(obj1, obj2);
    expect(res).toBe(false);
  });

  it('should return true if is Object and the second object has the properties with same values of the first one, but they are no equal', () => {
    const obj1 = { name: 'raul' };
    const obj2 = { name: 'raul', age: 32, city: 'São Paulo' };
    const res = partialDeepEqual(obj1, obj2);
    expect(res).toBe(true);
  });

  it('should return false if is Object and the second object do not has the properties of the first one', () => {
    const obj1 = { name: 'raul', adress: 'foo street' };
    const obj2 = { name: 'raul', age: 32, city: 'São Paulo' };
    const res = partialDeepEqual(obj1, obj2);
    expect(res).toBe(false);
  });

  it('should return true if is Object nested and they are equal', () => {
    const date = new Date();
    const obj1 = {
      name: 'raul',
      age: 32,
      date,
      address: {
        street: 'foo street',
        number: 32,
      },
    };

    const obj2 = {
      name: 'raul',
      age: 32,
      date,
      address: {
        street: 'foo street',
        number: 32,
      },
    };

    const res = partialDeepEqual(obj1, obj2);
    expect(res).toBe(true);
  });

  it('should return false if is Object nested and the arrays are different', () => {
    const obj1 = {
      name: 'raul',
      age: 32,
      ids: [{ number: 1 }, { number: 2 }],
      address: {
        street: 'foo street',
        number: 32,
      },
    };

    const obj2 = {
      name: 'raul',
      age: 32,
      ids: [{ number: 1 }, { number: 3 }],
      address: {
        street: 'foo street',
        number: 32,
      },
    };

    const res = partialDeepEqual(obj1, obj2);
    expect(res).toBe(false);
  });

  it('should return false if is Object nested and the dates are different', async () => {
    expect.assertions(1);
    const d1 = new Date();
    await delay(50);
    const d2 = new Date();
    const obj1 = {
      name: 'raul',
      age: 32,
      address: {
        street: 'foo street',
        number: 32,
        date: d1,
      },
    };

    const obj2 = {
      name: 'raul',
      age: 32,
      address: {
        street: 'foo street',
        number: 32,
        date: d2,
      },
    };

    const res = partialDeepEqual(obj1, obj2);
    expect(res).toBe(false);
  });

  it('should return true if is Array and they are equal', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];

    const res = partialDeepEqual(arr1, arr2);
    expect(res).toBe(true);
  });

  it('should return false if is Array and they are not equal', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 2, 1];

    const res = partialDeepEqual(arr1, arr2);
    expect(res).toBe(false);
  });

  it('should return true if is Array nested object and they are equal', () => {
    const arr1 = [
      { name: 'raul', age: 32 },
      { name: 'pedro', age: 20 },
    ];

    const arr2 = [
      { name: 'raul', age: 32 },
      { name: 'pedro', age: 20 },
      { name: 'paulo', age: 14 },
    ];

    const res = partialDeepEqual(arr1, arr2);
    expect(res).toBe(true);
  });

  it('should return false if is Array nested object and they are not equal', () => {
    const arr1 = [
      { name: 'raul', age: 32 },
      { name: 'pedro', age: 20 },
    ];

    const arr2 = [
      { name: 'raul', age: 32 },
      { name: 'paulo', age: 14 },
    ];

    const res = partialDeepEqual(arr1, arr2);
    expect(res).toBe(false);
  });

  it('should return true if is Array nested object and they are equal - 2', () => {
    const arr1 = [
      { name: 'raul', age: 32, ids: [{ id: 1 }, { id: 2 }] },
      { name: 'pedro', age: 20, ids: [{ id: 3 }, { id: 4 }] },
    ];

    const arr2 = [
      { name: 'raul', age: 32, ids: [{ id: 1 }, { id: 2 }] },
      { name: 'pedro', age: 20, ids: [{ id: 3 }, { id: 4 }] },
      { name: 'paulo', age: 14 },
    ];

    const res = partialDeepEqual(arr1, arr2);
    expect(res).toBe(true);
  });
});
