import ObjectUtils from './object-utils';

describe('ObjectUtils', () => {
  describe('get', () => {
    it('returns undefined if path does not exist', () => {
      const testObj: Partial<TestObj> = {
        id: 1,
        name: 'My Test',
      };

      const result = ObjectUtils.get(testObj, 'secret');

      expect(result).toBeUndefined();
    });

    it('returns default value if path does not exist', () => {
      const testObj: Partial<TestObj> = {
        id: 1,
        name: 'My Test',
      };

      const result = ObjectUtils.get(testObj, 'secret', 'test' as string);

      expect(result).toBe('test');
    });

    it('returns nested value when exists', () => {
      const testObj: TestObj = {
        id: 1,
        name: 'My Test',
        secret: 'hello',
        meta: {
          name: 'something',
          date: {
            string: '2022-04-01',
          },
          keywords: ['testing', 'bacon'],
        },
        items: [
          { id: 2 },
          { id: 3 },
          { id: 5 },
        ],
      };

      const result = ObjectUtils.get(testObj, 'meta.date.string');

      expect(result).toBe('2022-04-01');
    });

    it('returns undefined if nested property does not exist', () => {
      const testObj: TestObj = {
        id: 1,
        name: 'My Test',
        secret: 'hello',
        meta: {
          name: 'something',
          date: {
            string: '2022-04-01',
          },
          keywords: ['testing', 'bacon'],
        },
        items: [
          { id: 2 },
          { id: 3 },
          { id: 5 },
        ],
      };

      const result = ObjectUtils.get(testObj, 'meta.date.milliseconds');

      expect(result).toBeUndefined();
    });

    it('returns default value if nested property does not exist', () => {
      const testObj: TestObj = {
        id: 1,
        name: 'My Test',
        secret: 'hello',
        meta: {
          name: 'something',
          date: {
            string: '2022-04-01',
          },
          keywords: ['testing', 'bacon'],
        },
        items: [
          { id: 2 },
          { id: 3 },
          { id: 5 },
        ],
      };

      const result = ObjectUtils.get(testObj, 'meta.date.milliseconds', 69);

      expect(result).toBe(69);
    });

    it('returns the value for array indexes', () => {
      const testObj: TestObj = {
        id: 1,
        name: 'My Test',
        secret: 'hello',
        meta: {
          name: 'something',
          date: {
            string: '2022-04-01',
          },
          keywords: ['testing', 'bacon'],
        },
        items: [
          { id: 2 },
          { id: 3 },
          { id: 5 },
        ],
      };

      expect(ObjectUtils.get(testObj, 'meta.keywords.0')).toBe('testing');
      expect(ObjectUtils.get(testObj, 'meta.keywords.1')).toBe('bacon');
    });

    it('returns undefined if array index does not exist', () => {
      const testObj: TestObj = {
        id: 1,
        name: 'My Test',
        secret: 'hello',
        meta: {
          name: 'something',
          date: {
            string: '2022-04-01',
          },
          keywords: ['testing', 'bacon'],
        },
        items: [
          { id: 2 },
          { id: 3 },
          { id: 5 },
        ],
      };

      expect(ObjectUtils.get(testObj, 'meta.keywords.2')).toBeUndefined();
    });

    it('returns property value nested in array', () => {
      const testObj: TestObj = {
        id: 1,
        name: 'My Test',
        secret: 'hello',
        meta: {
          name: 'something',
          date: {
            string: '2022-04-01',
          },
          keywords: ['testing', 'bacon'],
        },
        items: [
          { id: 2 },
          { id: 3 },
          { id: 5 },
        ],
      };

      expect(ObjectUtils.get(testObj, 'items.1.id')).toBe(3);
    });

    it('works with a value of false', () => {
      const testObj: TestObj = {
        id: 1,
        name: 'My Test',
        secret: 'hello',
        meta: {
          name: 'something',
          date: {
            string: '2022-04-01',
          },
          keywords: ['testing', 'bacon'],
        },
        items: [
          { id: 2 },
          { id: 3 },
          { id: 5 },
        ],
        active: false,
      };

      expect(ObjectUtils.get(testObj, 'active')).toBe(false);
    });
  });

  describe('set', () => {
    it('sets a value on an object', () => {
      const testObj = {};

      ObjectUtils.set(testObj, 'myPath', 24);
      expect(testObj).toStrictEqual({ myPath: 24 });
    });

    it('sets a value on an object with nested path', () => {
      const testObj = {};

      ObjectUtils.set(testObj, 'hello.world.test', 'hi');
      expect(testObj).toStrictEqual({ hello: { world: { test: 'hi' } } });
    });

    it('sets a value on an object with an existing value', () => {
      const testObj = { meta: { keywords: ['test', 'bacon'] } };

      ObjectUtils.set(testObj, 'meta.keywords', ['lettuce', 'tomato']);
      expect(testObj).toStrictEqual({ meta: { keywords: ['lettuce', 'tomato'] } });
    });

    it('returns the new object', () => {
      const testObj = { meta: { test: 'hello' } };

      const result = ObjectUtils.set(testObj, 'meta.test', 'bacon');
      expect(result).toStrictEqual({ meta: { test: 'bacon' } });
    });
  });

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
  meta?: {
    name: string,
    date?: {
      string: string,
      milliseconds?: number
    },
    keywords: string[]
  },
  items?: TestItemObj[],
  active?: boolean
}

interface TestItemObj {
  id: number;
}
