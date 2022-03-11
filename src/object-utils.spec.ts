import ObjectUtils from './object-utils';

describe('ObjectUtils', () => {
  describe('filter', () => {
    it('filters an object down to the specified properties', () => {
      const testObj: TestObj = {
        id: 1,
        name: 'My Test',
        secret: 'bacon',
      };

      const result = ObjectUtils.filter<TestObj, Omit<TestObj, 'secret'>>(testObj, ['id', 'name']);

      expect(result).toEqual({ id: 1, name: 'My Test' });
    });
  });

  describe('omit', () => {
    it('omits specified properties from object', () => {
      const testObj: TestObj = {
        id: 1,
        name: 'My Test',
        secret: 'bacon',
      };

      const result = ObjectUtils.omit<TestObj, Omit<TestObj, 'secret'>>(testObj, ['secret']);

      expect(result).toEqual({ id: 1, name: 'My Test' });
    });
  });
});

interface TestObj {
  id: number;
  name: string;
  secret: string;
}
