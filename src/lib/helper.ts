/**
 *
 * @param {*} nul
 * @returns {boolean}
 */
const isNull = (nul: any) => {
  return "undefined" === typeof nul || null === nul;
};

/**
 *
 * @param {*} str
 * @returns {boolean}
 */
const isString = (str: string) => {
  return "string" === typeof str;
};

/**
 * isPlainObject
 * @param obj
 * @returns {*}
 */
const isPlainObject = (obj: object) => {
  let key;

  if (!obj || obj.toString() !== "[object Object]") {
    return false;
  }

  const hasOwnConstructor = obj.hasOwnProperty("constructor");
  const hasIsPrototypeOf =
    obj.constructor &&
    obj.constructor.prototype &&
    obj.constructor.prototype.hasOwnProperty("isPrototypeOf");

  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }

  for (key in obj) break;
  return typeof key === "undefined" || obj.hasOwnProperty(key);
};

/**
 *
 * @param {object} obj
 * @returns {boolean}
 */
const isEmptyObject = (obj: object) => {
  for (let name in obj) return false;
  return true;
};

/**
 *
 * @param {*} arr
 * @returns {boolean}
 */
const isArray = (arr: any[]) => {
  return "function" === typeof Array.isArray
    ? Array.isArray(arr)
    : arr.toString() === "[object Array]";
};

/**
 *  Determine whether a variable is empty
 *
 * @param value
 * @returns {boolean}
 */
export const isEmpty = (value: any) => {
  return (
    isNull(value) ||
    (isString(value) && value.trim().length === 0) ||
    (isPlainObject(value) && isEmptyObject(value)) ||
    (isArray(value) && value.length === 0)
  );
};
