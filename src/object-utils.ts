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
