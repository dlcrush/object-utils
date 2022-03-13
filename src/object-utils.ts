class ObjectUtils {
  static get<T, R>(obj: T, path: string, defaultValue?: R): R | undefined;
  static get<T, R>(obj: T, path: string[], defaultValue?: R): R | undefined;
  static get<T, R>(obj: T, path: string | string[], defaultValue?: R): R | undefined {
    const pathArr = Array.isArray(path) ? path : path.split('.');
    let valid = true;
    let returnValue: R | undefined;

    for (let i = 0; i < pathArr.length && valid; i += 1) {
      if (i === 0) {
        returnValue = obj[pathArr[i]];
      } else {
        returnValue = returnValue ? returnValue[pathArr[i]] : undefined;
      }

      if (typeof returnValue === 'undefined' || returnValue === null) {
        valid = false;
      }
    }

    return valid ? returnValue : defaultValue;
  }

  static set<T, V, RV>(obj: T, path: string, value: V): RV;
  static set<T, V, RV>(obj: T, path: string[], value: V): RV;
  static set<T, V, RV>(obj: T, path: string | string[], value: V): RV {
    const pathArr = Array.isArray(path) ? path : path.split('.');
    const returnVal = obj || {} as RV;
    let currentProp = returnVal as unknown as object;

    for (let i = 0; i < pathArr.length - 1; i += 1) {
      if (typeof currentProp[pathArr[i]] === 'undefined' || currentProp[pathArr[i]] === null) {
        currentProp[pathArr[i]] = {};
      }

      currentProp = currentProp[pathArr[i]];
    }

    currentProp[pathArr[pathArr.length - 1]] = value;

    return returnVal as RV;
  }

  static filter<T, R>(obj: T, props: string[]): R {
    return Object.keys(obj).reduce((result: R, key: string) => {
      const returnVal = result;

      if (props.some((x) => x === key)) {
        returnVal[key] = obj[key];
      }

      return returnVal;
    }, {} as R);
  }

  static omit<T, R>(obj: T, props: string[]): R {
    return Object.keys(obj).reduce((result: R, key: string) => {
      const returnVal = result;

      if (!props.some((x) => x === key)) {
        returnVal[key] = obj[key];
      }

      return returnVal;
    }, {} as R);
  }
}

export default ObjectUtils;
