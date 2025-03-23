import { LinkedList } from "../dist";
//--------------------------------------------------------------------------
// TRANSFORMATION & ITERATION
//--------------------------------------------------------------------------

describe("Transformation & Iteration Methods", () => {
  // Helper function to create populated list
  function createTestList<T>(values: T[]): LinkedList<T> {
    const list = new LinkedList<T>();
    values.forEach((val) => list.push(val));
    return list;
  }

  describe("forEach()", () => {
    it("should iterate over all elements in the list", () => {
      const list = createTestList([1, 2, 3, 4]);
      const values: number[] = [];
      const indices: number[] = [];
      const listRefs: any[] = [];

      list.forEach((value, index, listRef) => {
        values.push(value);
        indices.push(index);
        listRefs.push(listRef);
      });

      expect(values).toEqual([1, 2, 3, 4]);
      expect(indices).toEqual([0, 1, 2, 3]);
      listRefs.forEach((ref) => expect(ref).toBe(list));
    });

    it("should not call callback for empty list", () => {
      const list = new LinkedList<number>();
      const mockCallback = jest.fn();

      list.forEach(mockCallback);

      expect(mockCallback).not.toHaveBeenCalled();
    });
  });

  describe("map()", () => {
    it("should transform each element in the list", () => {
      const list = createTestList([1, 2, 3]);
      const mappedList = list.map((x) => x * 2);

      expect(mappedList).toBeInstanceOf(LinkedList);
      expect(mappedList.toArray()).toEqual([2, 4, 6]);
    });

    it("should provide correct index to callback", () => {
      const list = createTestList(["a", "b", "c"]);
      const indices: number[] = [];

      list.map((_, index) => {
        indices.push(index);
        return "x";
      });

      expect(indices).toEqual([0, 1, 2]);
    });

    it("should return empty list when mapping empty list", () => {
      const list = new LinkedList<number>();
      const mappedList = list.map((x) => x * 2);

      expect(mappedList.toArray()).toEqual([]);
    });

    it("should handle type transformations", () => {
      const list = createTestList([1, 2, 3]);
      const mappedList = list.map((x) => x.toString());

      expect(mappedList.toArray()).toEqual(["1", "2", "3"]);
    });
  });

  describe("filter()", () => {
    it("should filter elements based on predicate", () => {
      const list = createTestList([1, 2, 3, 4, 5]);
      const filtered = list.filter((x) => x % 2 === 0);

      expect(filtered.toArray()).toEqual([2, 4]);
    });

    it("should provide correct index to predicate", () => {
      const list = createTestList(["a", "b", "c", "d"]);
      const indices: number[] = [];

      list.filter((_, index) => {
        indices.push(index);
        return true;
      });

      expect(indices).toEqual([0, 1, 2, 3]);
    });

    it("should return empty list when no elements pass the test", () => {
      const list = createTestList([1, 3, 5]);
      const filtered = list.filter((x) => x % 2 === 0);

      expect(filtered.toArray()).toEqual([]);
    });

    it("should return empty list when filtering empty list", () => {
      const list = new LinkedList<number>();
      const filtered = list.filter(() => true);

      expect(filtered.toArray()).toEqual([]);
    });
  });

  describe("reduce()", () => {
    it("should reduce list to a single value", () => {
      const list = createTestList([1, 2, 3, 4]);
      const sum = list.reduce((acc, val) => acc + val, 0);

      expect(sum).toBe(10);
    });

    it("should use initialValue as starting accumulator", () => {
      const list = createTestList([1, 2, 3]);
      const result = list.reduce((acc, val) => acc + val, 10);

      expect(result).toBe(16);
    });

    it("should provide correct index to callback", () => {
      const list = createTestList(["a", "b", "c"]);
      const indices: number[] = [];

      list.reduce((acc, _, index) => {
        indices.push(index);
        return acc;
      }, "");

      expect(indices).toEqual([0, 1, 2]);
    });

    it("should return initialValue for empty list", () => {
      const list = new LinkedList<number>();
      const result = list.reduce((acc, val) => acc + val, 42);

      expect(result).toBe(42);
    });
  });

  describe("reduceRight()", () => {
    it("should reduce list from right to left", () => {
      const list = createTestList([1, 2, 3, 4]);
      const result = list.reduceRight((acc, val) => acc + val, 0);

      expect(result).toBe(10);
    });

    it("should process elements in reverse order", () => {
      const list = createTestList(["a", "b", "c"]);
      const concatenated = list.reduceRight((acc, val) => acc + val, "");

      expect(concatenated).toBe("cba");
    });

    it("should provide correct index to callback", () => {
      const list = createTestList([1, 2, 3, 4]);
      const indices: number[] = [];

      list.reduceRight((acc, _, index) => {
        indices.push(index);
        return acc;
      }, 0);

      // Note: reduceRight uses array indices which go right-to-left but maintain their original index values
      expect(indices).toEqual([3, 2, 1, 0]);
    });

    it("should return initialValue for empty list", () => {
      const list = new LinkedList<string>();
      const result = list.reduceRight((acc, val) => acc + val, "x");

      expect(result).toBe("x");
    });
  });

  describe("every()", () => {
    it("should return true when all elements pass the test", () => {
      const list = createTestList([2, 4, 6, 8]);
      const allEven = list.every((x) => x % 2 === 0);

      expect(allEven).toBe(true);
    });

    it("should return false when any element fails the test", () => {
      const list = createTestList([2, 4, 5, 8]);
      const allEven = list.every((x) => x % 2 === 0);

      expect(allEven).toBe(false);
    });

    it("should short-circuit when an element fails the test", () => {
      const list = createTestList([2, 4, 5, 8]);
      const mockPredicate = jest.fn((x) => x % 2 === 0);

      list.every(mockPredicate);

      expect(mockPredicate).toHaveBeenCalledTimes(3); // Only called for first 3 elements
      expect(mockPredicate.mock.calls[0][0]).toBe(2);
      expect(mockPredicate.mock.calls[1][0]).toBe(4);
      expect(mockPredicate.mock.calls[2][0]).toBe(5);
    });

    it("should return true for empty list", () => {
      const list = new LinkedList<number>();
      const result = list.every(() => false);

      expect(result).toBe(true);
    });
  });

  describe("some()", () => {
    it("should return true when any element passes the test", () => {
      const list = createTestList([1, 3, 4, 7]);
      const hasEven = list.some((x) => x % 2 === 0);

      expect(hasEven).toBe(true);
    });

    it("should return false when no elements pass the test", () => {
      const list = createTestList([1, 3, 5, 7]);
      const hasEven = list.some((x) => x % 2 === 0);

      expect(hasEven).toBe(false);
    });

    it("should short-circuit when an element passes the test", () => {
      const list = createTestList([1, 3, 4, 8]);
      const mockPredicate = jest.fn((x) => x % 2 === 0);

      list.some(mockPredicate);

      expect(mockPredicate).toHaveBeenCalledTimes(3); // Only called for first 3 elements
      expect(mockPredicate.mock.calls[0][0]).toBe(1);
      expect(mockPredicate.mock.calls[1][0]).toBe(3);
      expect(mockPredicate.mock.calls[2][0]).toBe(4);
    });

    it("should return false for empty list", () => {
      const list = new LinkedList<number>();
      const result = list.some(() => true);

      expect(result).toBe(false);
    });
  });

  describe("flatMap()", () => {
    it("should map and flatten array results", () => {
      const list = createTestList([1, 2, 3]);
      const result = list.flatMap((x) => [x, x * 2]);

      expect(result.toArray()).toEqual([1, 2, 2, 4, 3, 6]);
    });

    it("should handle mixed array and non-array results", () => {
      const list = createTestList([1, 2, 3]);
      const result = list.flatMap((x) => (x % 2 === 0 ? [x, x] : x));

      expect(result.toArray()).toEqual([1, 2, 2, 3]);
    });

    it("should handle nested LinkedList results", () => {
      const list = createTestList([1, 2]);
      const nestedList1 = createTestList(["a", "b"]);
      const nestedList2 = createTestList(["c", "d"]);

      const result = list.flatMap((x) => (x === 1 ? nestedList1 : nestedList2));

      expect(result.toArray()).toEqual(["a", "b", "c", "d"]);
    });

    it("should provide correct index to callback", () => {
      const list = createTestList(["a", "b", "c"]);
      const mockCallback = jest.fn((val) => val);

      list.flatMap(mockCallback);

      expect(mockCallback).toHaveBeenCalledTimes(3);
      expect(mockCallback).toHaveBeenNthCalledWith(
        1,
        "a",
        0,
        expect.any(LinkedList)
      );
      expect(mockCallback).toHaveBeenNthCalledWith(
        2,
        "b",
        1,
        expect.any(LinkedList)
      );
      expect(mockCallback).toHaveBeenNthCalledWith(
        3,
        "c",
        2,
        expect.any(LinkedList)
      );
    });

    it("should return empty list when flatMapping empty list", () => {
      const list = new LinkedList<number>();
      const result = list.flatMap((x) => [x, x]);

      expect(result.toArray()).toEqual([]);
    });
  });

  // Edge cases
  describe("edge cases", () => {
    it("should handle list with a single element", () => {
      const list = createTestList([42]);

      expect(list.map((x) => x * 2).toArray()).toEqual([84]);
      expect(list.filter((x) => x > 20).toArray()).toEqual([42]);
      expect(list.reduce((acc, val) => acc + val, 0)).toBe(42);
      expect(list.every((x) => x === 42)).toBe(true);
      expect(list.some((x) => x === 42)).toBe(true);
    });

    it("should handle list with non-primitive values", () => {
      const objA = { id: 1, name: "A" };
      const objB = { id: 2, name: "B" };
      const list = createTestList([objA, objB]);

      const idSum = list.reduce((acc, obj) => acc + obj.id, 0);
      expect(idSum).toBe(3);

      const namesList = list.map((obj) => obj.name);
      expect(namesList.toArray()).toEqual(["A", "B"]);
    });

    it("should handle nested method calls", () => {
      const list = createTestList([1, 2, 3, 4, 5]);
      const result = list
        .filter((x) => x > 2)
        .map((x) => x * 2)
        .reduce((acc, val) => acc + val, 0);

      expect(result).toBe(24); // (3*2 + 4*2 + 5*2) = 24
    });
  });
});
