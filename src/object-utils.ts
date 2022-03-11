class ObjectUtils {
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
