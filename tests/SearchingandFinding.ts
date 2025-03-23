import { LinkedList } from "../src/LinkedList";
//--------------------------------------------------------------------------
// SEARCHING & FINDING
//--------------------------------------------------------------------------

describe("Search and Find Methods", () => {
  // Helper function to create test lists
  const createTestList = () => {
    return new LinkedList(10, 20, 30, 40, 20, 50);
  };

  describe("includes", () => {
    it("should return true if element exists in the list", () => {
      const list = createTestList();
      expect(list.includes(30)).toBe(true);
    });

    it("should return false if element does not exist", () => {
      const list = createTestList();
      expect(list.includes(100)).toBe(false);
    });

    it("should work with fromIndex parameter", () => {
      const list = createTestList();
      expect(list.includes(20, 2)).toBe(true); // Should find the second 20
      expect(list.includes(10, 1)).toBe(false); // 10 appears before index 1
    });

    it("should handle negative fromIndex", () => {
      const list = createTestList();
      expect(list.includes(20, -3)).toBe(true); // Looking at last 3 elements
      expect(list.includes(10, -3)).toBe(false); // 10 is not in last 3 elements
    });

    it("should return false for empty list", () => {
      const list = new LinkedList<number>();
      expect(list.includes(10)).toBe(false);
    });

    it("should handle fromIndex >= length", () => {
      const list = createTestList();
      expect(list.includes(50, 6)).toBe(false); // fromIndex beyond length
      expect(list.includes(50, 10)).toBe(false); // fromIndex way beyond length
    });

    it("should handle negative fromIndex < -length", () => {
      const list = createTestList();
      expect(list.includes(10, -10)).toBe(true); // Should adjust to start from 0
    });

    it("should work with different data types", () => {
      const list = new LinkedList<string>("apple", "banana", "cherry");
      expect(list.includes("banana")).toBe(true);
      expect(list.includes("grape")).toBe(false);
    });

    it("should handle NaN correctly", () => {
      const list = new LinkedList<number>(1, NaN, 3);
      expect(list.includes(NaN)).toBe(true);
    });
  });

  describe("indexOf", () => {
    it("should return correct index if element exists", () => {
      const list = createTestList();
      expect(list.indexOf(10)).toBe(0);
      expect(list.indexOf(30)).toBe(2);
      expect(list.indexOf(50)).toBe(5);
    });

    it("should return first occurrence index for duplicate elements", () => {
      const list = createTestList(); // Contains 20 at indices 1 and 4
      expect(list.indexOf(20)).toBe(1);
    });

    it("should return -1 if element does not exist", () => {
      const list = createTestList();
      expect(list.indexOf(100)).toBe(-1);
    });

    it("should work with fromIndex parameter", () => {
      const list = createTestList();
      expect(list.indexOf(20, 2)).toBe(4); // Second occurrence of 20
      expect(list.indexOf(10, 1)).toBe(-1); // 10 appears before index 1
    });

    it("should handle negative fromIndex", () => {
      const list = createTestList();
      expect(list.indexOf(20, -3)).toBe(4); // Should find 20 in last 3 elements
      expect(list.indexOf(10, -2)).toBe(-1); // 10 is not in last 2 elements
    });

    it("should return -1 for empty list", () => {
      const list = new LinkedList<number>();
      expect(list.indexOf(10)).toBe(-1);
    });

    it("should handle fromIndex >= length", () => {
      const list = createTestList();
      expect(list.indexOf(50, 6)).toBe(-1); // fromIndex beyond length
    });

    it("should handle negative fromIndex < -length", () => {
      const list = createTestList();
      expect(list.indexOf(10, -10)).toBe(0); // Should adjust to start from 0
    });

    it("should handle NaN correctly", () => {
      const list = new LinkedList<number>(1, NaN, 3);
      expect(list.indexOf(NaN)).toBe(1);
    });
  });

  describe("lastIndexOf", () => {
    it("should return correct last index if element exists", () => {
      const list = createTestList(); // Contains 20 at indices 1 and 4
      expect(list.lastIndexOf(20)).toBe(4);
      expect(list.lastIndexOf(10)).toBe(0);
      expect(list.lastIndexOf(50)).toBe(5);
    });

    it("should return -1 if element does not exist", () => {
      const list = createTestList();
      expect(list.lastIndexOf(100)).toBe(-1);
    });

    it("should work with fromIndex parameter", () => {
      const list = createTestList();
      expect(list.lastIndexOf(20, 3)).toBe(1); // Should only find first 20
      expect(list.lastIndexOf(50, 4)).toBe(-1); // 50 appears after index 4
    });

    it("should handle negative fromIndex", () => {
      const list = createTestList();
      expect(list.lastIndexOf(20, -2)).toBe(4); // Start search from second-to-last element
      expect(list.lastIndexOf(20, -3)).toBe(4); // Start search from third-to-last element
      expect(list.lastIndexOf(10, -5)).toBe(0); // Should find 10
    });

    it("should return -1 for empty list", () => {
      const list = new LinkedList<number>();
      expect(list.lastIndexOf(10)).toBe(-1);
    });

    it("should handle fromIndex >= length", () => {
      const list = createTestList();
      expect(list.lastIndexOf(20, 10)).toBe(4); // fromIndex beyond length, should use list.length - 1
    });

    it("should handle negative fromIndex < -length", () => {
      const list = createTestList();
      expect(list.lastIndexOf(10, -10)).toBe(0); // Should adjust to start from 0
    });

    it("should handle undefined fromIndex (search whole list)", () => {
      const list = createTestList();
      expect(list.lastIndexOf(20, undefined)).toBe(4);
    });

    it("should handle NaN correctly", () => {
      const list = new LinkedList<number>(1, NaN, 3, NaN);
      expect(list.lastIndexOf(NaN)).toBe(3);
    });
  });

  describe("find", () => {
    it("should return first element that satisfies predicate", () => {
      const list = createTestList();
      expect(list.find((val) => val > 30)).toBe(40);
      expect(list.find((val) => val % 20 === 0)).toBe(20);
    });

    it("should return undefined if no element satisfies predicate", () => {
      const list = createTestList();
      expect(list.find((val) => val > 100)).toBeUndefined();
    });

    it("should provide correct index and list to predicate", () => {
      const list = createTestList();
      list.find((val, index, lst) => {
        expect(lst).toBe(list);
        expect(val).toBe(list.at(index));
        return false;
      });
    });

    it("should work with empty list", () => {
      const list = new LinkedList<number>();
      expect(list.find((val) => val > 0)).toBeUndefined();
    });

    it("should work with objects", () => {
      const list = new LinkedList(
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" }
      );
      const result = list.find((person) => person.name === "Bob");
      expect(result).toEqual({ id: 2, name: "Bob" });
    });
  });

  describe("findIndex", () => {
    it("should return index of first element that satisfies predicate", () => {
      const list = createTestList();
      expect(list.findIndex((val) => val > 30)).toBe(3); // 40 is at index 3
      expect(list.findIndex((val) => val % 20 === 0)).toBe(1); // 20 is at index 1
    });

    it("should return -1 if no element satisfies predicate", () => {
      const list = createTestList();
      expect(list.findIndex((val) => val > 100)).toBe(-1);
    });

    it("should provide correct index and list to predicate", () => {
      const list = createTestList();
      list.findIndex((val, index, lst) => {
        expect(lst).toBe(list);
        expect(val).toBe(list.at(index));
        return false;
      });
    });

    it("should work with empty list", () => {
      const list = new LinkedList<number>();
      expect(list.findIndex((val) => val > 0)).toBe(-1);
    });

    it("should work with objects", () => {
      const list = new LinkedList(
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" }
      );
      expect(list.findIndex((person) => person.name === "Bob")).toBe(1);
      expect(list.findIndex((person) => person.id > 5)).toBe(-1);
    });
  });

  describe("findLast", () => {
    it("should return last element that satisfies predicate", () => {
      const list = createTestList();
      expect(list.findLast((val) => val > 30)).toBe(50);
      expect(list.findLast((val) => val % 20 === 0)).toBe(20); // Last 20 is at index 4
    });

    it("should return undefined if no element satisfies predicate", () => {
      const list = createTestList();
      expect(list.findLast((val) => val > 100)).toBeUndefined();
    });

    it("should provide correct index and list to predicate", () => {
      const list = createTestList();
      list.findLast((val, index, lst) => {
        expect(lst).toBe(list);
        expect(val).toBe(list.at(index));
        return false;
      });
    });

    it("should work with empty list", () => {
      const list = new LinkedList<number>();
      expect(list.findLast((val) => val > 0)).toBeUndefined();
    });

    it("should work with objects", () => {
      const list = new LinkedList(
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
        { id: 4, name: "Bob" }
      );
      const result = list.findLast((person) => person.name === "Bob");
      expect(result).toEqual({ id: 4, name: "Bob" });
    });
  });

  describe("findLastIndex", () => {
    it("should return index of last element that satisfies predicate", () => {
      const list = createTestList();
      expect(list.findLastIndex((val) => val > 30)).toBe(5); // 50 is at index 5
      expect(list.findLastIndex((val) => val % 20 === 0)).toBe(4); // Last 20 is at index 4
    });

    it("should return -1 if no element satisfies predicate", () => {
      const list = createTestList();
      expect(list.findLastIndex((val) => val > 100)).toBe(-1);
    });

    it("should provide correct index and list to predicate", () => {
      const list = createTestList();
      list.findLastIndex((val, index, lst) => {
        expect(lst).toBe(list);
        expect(val).toBe(list.at(index));
        return false;
      });
    });

    it("should work with empty list", () => {
      const list = new LinkedList<number>();
      expect(list.findLastIndex((val) => val > 0)).toBe(-1);
    });

    it("should work with objects", () => {
      const list = new LinkedList(
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
        { id: 4, name: "Bob" }
      );
      expect(list.findLastIndex((person) => person.name === "Bob")).toBe(3);
      expect(list.findLastIndex((person) => person.id > 5)).toBe(-1);
    });
  });

  // Edge cases and special values
  describe("Edge cases and special values", () => {
    it("should handle null and undefined values in the list", () => {
      const list = new LinkedList(null, undefined, 10, null);

      expect(list.includes(null)).toBe(true);
      expect(list.includes(undefined)).toBe(true);
      expect(list.indexOf(null)).toBe(0);
      expect(list.indexOf(undefined)).toBe(1);
      expect(list.lastIndexOf(null)).toBe(3);

      expect(list.find((val) => val === null)).toBe(null);
      expect(list.findIndex((val) => val === undefined)).toBe(1);
      expect(list.findLast((val) => val === null)).toBe(null);
      expect(list.findLastIndex((val) => val === null)).toBe(3);
    });

    it("should correctly handle -0 and +0", () => {
      const list = new LinkedList(-0, 1, 2, +0);

      expect(list.includes(+0)).toBe(true);
      expect(list.includes(-0)).toBe(true);
      expect(list.indexOf(-0)).toBe(0);
      expect(list.lastIndexOf(+0)).toBe(3);

      expect(list.find((val) => Object.is(val, -0))).toBe(-0);
      expect(list.findLastIndex((val) => Object.is(val, +0))).toBe(3);
    });

    it("should distinguish +0 from -0 correctly using Object.is", () => {
      const list = new LinkedList(-0, +0);

      // Custom predicate that uses Object.is for strict equality
      expect(list.findIndex((val) => Object.is(val, -0))).toBe(0);
      expect(list.findIndex((val) => Object.is(val, +0))).toBe(1);
    });
  });
});
