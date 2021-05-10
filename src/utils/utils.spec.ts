import { isArray, isObject, isDate } from './utils';

describe('utils isArray', () => {
  it('should return true if is Array', () => {
    const arr = [];
    const res = isArray(arr);

    expect(res).toBe(true);
  });

  it('should return false if is not Array', () => {
    const arr = {};
    const res = isArray(arr);

    expect(res).toBe(false);
  });
});

describe('utils isObject', () => {
  it('should return true if is Object', () => {
    const obj = {};
    const res = isObject(obj);

    expect(res).toBe(true);
  });

  it('should return false if is not Object', () => {
    const obj = [];
    const res = isObject(obj);

    expect(res).toBe(false);
  });
});

describe('utils isDate', () => {
  it('should return true if is Date', () => {
    const date = new Date();
    const res = isDate(date);

    expect(res).toBe(true);
  });

  it('should return false if is not Object', () => {
    const date = 'date';
    const res = isDate(date);

    expect(res).toBe(false);
  });
});
