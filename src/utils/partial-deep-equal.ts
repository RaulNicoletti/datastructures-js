import { isArray, isDate, isObject, dateIsEqual } from './utils';

export function partialDeepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true;
  }

  if (isDate(obj1) && isDate(obj2)) {
    return dateIsEqual(obj1, obj2);
  }

  if (isObject(obj1) && isObject(obj2)) {
    const props = Object.keys(obj1);

    for (const prop of props) {
      if (!obj2.hasOwnProperty(prop)) {
        return false;
      }

      const prop1 = obj1[prop];
      const prop2 = obj2[prop];

      if (isObject(prop1) && isObject(prop2)) {
        if (!partialDeepEqual(prop1, prop2)) {
          return false;
        }
      } else if (isArray(prop1) && isArray(prop2)) {
        if (!partialDeepEqual(prop1, prop2)) {
          return false;
        }
      } else if (isDate(prop1) && isDate(prop2)) {
        if (!dateIsEqual(prop1, prop2)) {
          return false;
        }
      } else if (prop1 !== prop2) {
        return false;
      }
    }

    return true;
  }

  if (isArray(obj1) && isArray(obj2)) {
    for (let i = 0; i < obj1.length; i++) {
      if (!partialDeepEqual(obj1[i], obj2[i])) {
        return false;
      }
    }

    return true;
  }

  return false;
}
