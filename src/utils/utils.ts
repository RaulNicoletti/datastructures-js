import { promisify } from 'util';

export const delay = promisify(setTimeout);

export function isPrimitive(obj: any) {
  const isString = typeof obj === 'string';
  const isNumber = typeof obj === 'number';
  const isBoolean = typeof obj === 'boolean';
  const isUndefined = typeof obj === 'undefined';
  return isString || isNumber || isBoolean || isUndefined || isNull(obj);
}

export function isNull(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Null]';
}

export function isArray(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

export function isObject(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function isDate(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Date]';
}

export function dateIsEqual(date1: Date, date2: Date): boolean {
  const d1 = date1.getTime();
  const d2 = date2.getTime();
  return d1 === d2;
}
