import { LinkedList } from "../dist";
//--------------------------------------------------
// Advanced Operations
//--------------------------------------------------

describe("Advanced Operations", () => {
  describe("copyWithin", () => {
    // test("should return the same list for lists with 0 or 1 elements", () => {
    //   const emptyList = new LinkedList<number>();
    //   const singleItemList = new LinkedList<number>().push(1);

    //   expect(emptyList.copyWithin(0, 0)).toBe(emptyList);
    //   expect(singleItemList.copyWithin(0, 0)).toBe(singleItemList);
    // });

    test("should copy part of the list to another location", () => {
      const list = LinkedList.from([1, 2, 3, 4, 5]);
      const result = list.copyWithin(0, 3);

      expect(result.toArray()).toEqual([4, 5, 3, 4, 5]);
    });

    test("should respect the end parameter", () => {
      const list = LinkedList.from([1, 2, 3, 4, 5]);
      const result = list.copyWithin(0, 2, 4);

      expect(result.toArray()).toEqual([3, 4, 3, 4, 5]);
    });

    test("should handle negative target", () => {
      const list = LinkedList.from([1, 2, 3, 4, 5]);
      const result = list.copyWithin(-2, 0, 2);

      expect(result.toArray()).toEqual([1, 2, 3, 1, 2]);
    });
  });

  describe("flat", () => {
    test("should flatten array elements one level by default", () => {
      const list = LinkedList.from([
        [1, 2],
        [3, 4],
      ]);
      const result = list.flat();

      expect(result.toArray()).toEqual([1, 2, 3, 4]);
    });

    test("should flatten to specified depth", () => {
      const list = LinkedList.from([[[1, 2]], [[3, 4]]]);

      const result1 = list.flat(1);
      expect(result1.toArray()).toEqual([
        [1, 2],
        [3, 4],
      ]);

      const result2 = list.flat(2);
      expect(result2.toArray()).toEqual([1, 2, 3, 4]);
    });

    test("should flatten nested LinkedLists", () => {
      const nestedList1 = LinkedList.from([1, 2]);
      const nestedList2 = LinkedList.from([3, 4]);
      const list = LinkedList.from([nestedList1, nestedList2]);

      const result = list.flat();
      expect(result.toArray()).toEqual([1, 2, 3, 4]);
    });

    test("should handle mixed nested structures", () => {
      const nestedList = LinkedList.from([5, 6]);
      const list = LinkedList.from([[1, 2], nestedList, [3, 4]]);

      const result = list.flat();
      expect(result.toArray()).toEqual([1, 2, 5, 6, 3, 4]);
    });

    test("should return a new empty list when flattening an empty list", () => {
      const list = new LinkedList();
      const result = list.flat();

      expect(result.toArray()).toEqual([]);
      expect(result).not.toBe(list);
    });
  });

  describe("with", () => {
    test("should change a value at a specific index", () => {
      const list = LinkedList.from([1, 2, 3, 4, 5]);
      const result = list.with(2, 10);

      expect(result.toArray()).toEqual([1, 2, 10, 4, 5]);
      expect(list.toArray()).toEqual([1, 2, 3, 4, 5]); // Original unchanged
    });

    test("should handle negative indices", () => {
      const list = LinkedList.from([1, 2, 3, 4, 5]);
      const result = list.with(-2, 10);

      expect(result.toArray()).toEqual([1, 2, 3, 10, 5]);
    });

    test("should throw RangeError for out-of-bounds indices", () => {
      const list = LinkedList.from([1, 2, 3]);

      expect(() => list.with(3, 4)).toThrow(RangeError);
      expect(() => list.with(-4, 4)).toThrow(RangeError);
    });

    test("should return a new list, not modify the original", () => {
      const list = LinkedList.from([1, 2, 3]);
      const result = list.with(1, 10);

      expect(result).not.toBe(list);
      expect(list.toArray()).toEqual([1, 2, 3]);
    });
  });
});
