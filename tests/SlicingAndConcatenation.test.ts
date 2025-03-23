import { LinkedList } from "../dist";
//--------------------------------------------------------------------------
// SLICING & CONCATENATION
//--------------------------------------------------------------------------

describe("LinkedList Slicing & Concatenation Methods", () => {
  // Helper function to create populated list
  function createTestList<T>(values: T[]): LinkedList<T> {
    const list = new LinkedList<T>();
    values.forEach((val) => list.push(val));
    return list;
  }

  describe("slice()", () => {
    it("should return a copy of the entire list when no parameters are provided", () => {
      const list = createTestList([1, 2, 3, 4, 5]);
      const sliced = list.slice();

      expect(sliced).toBeInstanceOf(LinkedList);
      expect(sliced).not.toBe(list); // Should be a new instance
      expect(sliced.toArray()).toEqual([1, 2, 3, 4, 5]);
    });

    it("should slice from start index to the end when only start is provided", () => {
      const list = createTestList(["a", "b", "c", "d", "e"]);

      expect(list.slice(2).toArray()).toEqual(["c", "d", "e"]);
      expect(list.slice(0).toArray()).toEqual(["a", "b", "c", "d", "e"]);
      expect(list.slice(4).toArray()).toEqual(["e"]);
      expect(list.slice(5).toArray()).toEqual([]);
    });

    it("should slice between start (inclusive) and end (exclusive) indices", () => {
      const list = createTestList([1, 2, 3, 4, 5]);

      expect(list.slice(1, 4).toArray()).toEqual([2, 3, 4]);
      expect(list.slice(0, 2).toArray()).toEqual([1, 2]);
      expect(list.slice(2, 3).toArray()).toEqual([3]);
    });

    it("should handle negative start and end indices", () => {
      const list = createTestList(["a", "b", "c", "d", "e"]);

      expect(list.slice(-3).toArray()).toEqual(["c", "d", "e"]); // Last three elements
      expect(list.slice(-3, -1).toArray()).toEqual(["c", "d"]); // Last three elements except the last one
      expect(list.slice(1, -1).toArray()).toEqual(["b", "c", "d"]); // From second to second-to-last
      expect(list.slice(-2, -1).toArray()).toEqual(["d"]); // Just the second-to-last
    });

    it("should handle out-of-bounds indices gracefully", () => {
      const list = createTestList([1, 2, 3]);

      expect(list.slice(-10).toArray()).toEqual([1, 2, 3]); // Too negative start becomes 0
      expect(list.slice(1, 10).toArray()).toEqual([2, 3]); // Too large end becomes list length
      expect(list.slice(10).toArray()).toEqual([]); // Start beyond length returns empty list
    });

    it("should return empty list when start >= end", () => {
      const list = createTestList([1, 2, 3, 4]);

      expect(list.slice(2, 2).toArray()).toEqual([]);
      expect(list.slice(3, 1).toArray()).toEqual([]);
    });

    it("should handle empty list", () => {
      const list = new LinkedList<number>();

      expect(list.slice().toArray()).toEqual([]);
      expect(list.slice(0, 5).toArray()).toEqual([]);
      expect(list.slice(-3, -1).toArray()).toEqual([]);
    });
  });

  describe("concat()", () => {
    it("should concatenate with other LinkedList instances", () => {
      const list1 = createTestList([1, 2]);
      const list2 = createTestList([3, 4]);
      const list3 = createTestList([5, 6]);

      const result = list1.concat(list2, list3);

      expect(result).toBeInstanceOf(LinkedList);
      expect(result.toArray()).toEqual([1, 2, 3, 4, 5, 6]);

      // Original lists should remain unchanged
      expect(list1.toArray()).toEqual([1, 2]);
      expect(list2.toArray()).toEqual([3, 4]);
      expect(list3.toArray()).toEqual([5, 6]);
    });

    it("should concatenate with arrays", () => {
      const list = createTestList(["a", "b"]);
      const result = list.concat(["c", "d"], ["e", "f"]);

      expect(result.toArray()).toEqual(["a", "b", "c", "d", "e", "f"]);
      expect(list.toArray()).toEqual(["a", "b"]); // Original unchanged
    });

    it("should handle mixed LinkedList and array arguments", () => {
      const list1 = createTestList([1, 2]);
      const list2 = createTestList([5, 6]);

      const result = list1.concat([3, 4], list2);

      expect(result.toArray()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should handle empty lists and arrays", () => {
      const list = createTestList([1, 2]);
      const emptyList = new LinkedList<number>();

      expect(list.concat(emptyList).toArray()).toEqual([1, 2]);
      expect(list.concat([]).toArray()).toEqual([1, 2]);
      expect(list.concat([], emptyList, []).toArray()).toEqual([1, 2]);
      expect(emptyList.concat(list).toArray()).toEqual([1, 2]);
    });

    it("should return a clone of the original list when no arguments provided", () => {
      const list = createTestList([1, 2, 3]);
      const result = list.concat();

      expect(result).not.toBe(list); // Not the same instance
      expect(result.toArray()).toEqual([1, 2, 3]);
    });

    it("should preserve element types", () => {
      const list = createTestList<number | string>([1, 2]);
      const result = list.concat(["a", "b"], [3, 4]);

      expect(result.toArray()).toEqual([1, 2, "a", "b", 3, 4]);
    });
  });

  describe("toSpliced()", () => {
    it("should remove elements without adding", () => {
      const list = createTestList([1, 2, 3, 4, 5]);

      const result = list.toSpliced(1, 2);

      expect(result).toBeInstanceOf(LinkedList);
      expect(result).not.toBe(list); // Not the same instance
      expect(result.toArray()).toEqual([1, 4, 5]);
      expect(list.toArray()).toEqual([1, 2, 3, 4, 5]); // Original unchanged
    });

    it("should add elements without removing", () => {
      const list = createTestList(["a", "b", "e"]);

      const result = list.toSpliced(2, 0, "c", "d");

      expect(result.toArray()).toEqual(["a", "b", "c", "d", "e"]);
      expect(list.toArray()).toEqual(["a", "b", "e"]); // Original unchanged
    });

    it("should both remove and add elements", () => {
      const list = createTestList([1, 2, 3, 7, 8]);

      const result = list.toSpliced(3, 2, 4, 5, 6);

      expect(result.toArray()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should handle negative start index", () => {
      const list = createTestList(["a", "b", "c", "d"]);

      const result = list.toSpliced(-2, 1, "x");

      expect(result.toArray()).toEqual(["a", "b", "x", "d"]);
    });

    it("should handle start index beyond the end of the list", () => {
      const list = createTestList([1, 2, 3]);

      const result = list.toSpliced(10, 0, 4, 5);

      expect(result.toArray()).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle removing more elements than available", () => {
      const list = createTestList(["a", "b", "c"]);

      const result = list.toSpliced(1, 10, "d");

      expect(result.toArray()).toEqual(["a", "d"]);
    });

    it("should handle removing all elements", () => {
      const list = createTestList([1, 2, 3]);

      const result = list.toSpliced(0, list.length);

      expect(result.toArray()).toEqual([]);
    });

    it("should handle undefined deleteCount", () => {
      const list = createTestList(["a", "b", "c", "d"]);

      // With undefined deleteCount, it should remove all elements from start
      const result = list.toSpliced(1);

      expect(result.toArray()).toEqual(["a"]);
    });

    it("should handle empty list", () => {
      const list = new LinkedList<number>();

      const result = list.toSpliced(0, 0, 1, 2);

      expect(result.toArray()).toEqual([1, 2]);
    });

    it("should work with multiple method calls chained", () => {
      const list = createTestList<number>([1, 2, 3, 4, 5]);

      const result = list
        .toSpliced(1, 1) // [1, 3, 4, 5]
        .toSpliced(2, 1, 6, 7) // [1, 3, 6, 7, 5]
        .toSpliced(0, 0, 0); // [0, 1, 3, 6, 7, 5]

      expect(result.toArray()).toEqual([0, 1, 3, 6, 7, 5]);
      expect(list.toArray()).toEqual([1, 2, 3, 4, 5]); // Original unchanged
    });
  });

  // Testing interactions between methods
  describe("method interactions", () => {
    it("should work with slice and concat together", () => {
      const list = createTestList([1, 2, 3, 4, 5]);

      const sliced1 = list.slice(0, 2); // [1, 2]
      const sliced2 = list.slice(3); // [4, 5]
      const result = sliced1.concat(sliced2);

      expect(result.toArray()).toEqual([1, 2, 4, 5]);
    });

    it("should work with toSpliced and slice together", () => {
      const list = createTestList(["a", "b", "c", "d", "e"]);

      const result = list
        .toSpliced(1, 2, "x", "y") // ['a', 'x', 'y', 'd', 'e']
        .slice(2, 4); // ['y', 'd']

      expect(result.toArray()).toEqual(["y", "d"]);
    });
  });
});
