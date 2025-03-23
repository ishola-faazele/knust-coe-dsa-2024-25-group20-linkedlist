import { LinkedList } from "../src/LinkedList";
//--------------------------------------------------
// Conversion and Utility
//--------------------------------------------------
describe("Conversion & Utility", () => {
  describe("toString", () => {
    test("should convert the list to a comma-separated string", () => {
      const list = LinkedList.from([1, 2, 3, 4, 5]);

      expect(list.toString()).toBe("1,2,3,4,5");
    });

    test("should return an empty string for an empty list", () => {
      const list = new LinkedList<number>();

      expect(list.toString()).toBe("");
    });

    test("should handle non-string values by converting them to strings", () => {
      const list = LinkedList.from([1, null, undefined, true, {}]);

      expect(list.toString()).toBe("1,,,[object Object]");
    });
  });

  describe("join", () => {
    test("should join elements with the specified separator", () => {
      const list = LinkedList.from([1, 2, 3, 4, 5]);

      expect(list.join("-")).toBe("1-2-3-4-5");
    });

    test("should use comma as default separator", () => {
      const list = LinkedList.from([1, 2, 3]);

      expect(list.join()).toBe("1,2,3");
    });

    test("should return an empty string for an empty list", () => {
      const list = new LinkedList<number>();

      expect(list.join("-")).toBe("");
    });

    test("should handle non-string values by converting them to strings", () => {
      const list = LinkedList.from([1, null, undefined, true, {}]);

      expect(list.join("-")).toBe("1--true-[object Object]");
    });
  });

  describe("toArray", () => {
    test("should convert the list to an array", () => {
      const array = [1, 2, 3, 4, 5];
      const list = LinkedList.from(array);

      expect(list.toArray()).toEqual(array);
    });

    test("should return an empty array for an empty list", () => {
      const list = new LinkedList<number>();

      expect(list.toArray()).toEqual([]);
    });

    test("should preserve the order of elements", () => {
      const list = LinkedList.from(["a", "b", "c"]);

      expect(list.toArray()).toEqual(["a", "b", "c"]);
    });
  });

  describe("clone", () => {
    test("should create a deep copy of the list", () => {
      const list = LinkedList.from([1, 2, 3]);
      const clone = list.clone();

      expect(clone.toArray()).toEqual([1, 2, 3]);
      expect(clone).not.toBe(list);
    });

    test("should create an empty list when cloning an empty list", () => {
      const list = new LinkedList<number>();
      const clone = list.clone();

      expect(clone.toArray()).toEqual([]);
      expect(clone).not.toBe(list);
    });

    test("cloned list should be independent from original", () => {
      const list = LinkedList.from([1, 2, 3]);
      const clone = list.clone();

      list.push(4);

      expect(list.toArray()).toEqual([1, 2, 3, 4]);
      expect(clone.toArray()).toEqual([1, 2, 3]);
    });
  });

  describe("keys", () => {
    test("should return an iterator of indices", () => {
      const list = LinkedList.from(["a", "b", "c"]);
      const keysIterator = list.keys();

      expect(keysIterator.next().value).toBe(0);
      expect(keysIterator.next().value).toBe(1);
      expect(keysIterator.next().value).toBe(2);
      expect(keysIterator.next().done).toBe(true);
    });

    test("should return an empty iterator for an empty list", () => {
      const list = new LinkedList<string>();
      const keysIterator = list.keys();

      expect(keysIterator.next().done).toBe(true);
    });

    test("all keys can be collected into an array", () => {
      const list = LinkedList.from([10, 20, 30, 40]);
      const keys = Array.from(list.keys());

      expect(keys).toEqual([0, 1, 2, 3]);
    });
  });

  describe("entries", () => {
    test("should return an iterator of [index, value] pairs", () => {
      const list = LinkedList.from(["a", "b", "c"]);
      const entriesIterator = list.entries();

      expect(entriesIterator.next().value).toEqual([0, "a"]);
      expect(entriesIterator.next().value).toEqual([1, "b"]);
      expect(entriesIterator.next().value).toEqual([2, "c"]);
      expect(entriesIterator.next().done).toBe(true);
    });

    test("should return an empty iterator for an empty list", () => {
      const list = new LinkedList<string>();
      const entriesIterator = list.entries();

      expect(entriesIterator.next().done).toBe(true);
    });

    test("all entries can be collected into an array", () => {
      const list = LinkedList.from([10, 20, 30]);
      const entries = Array.from(list.entries());

      expect(entries).toEqual([
        [0, 10],
        [1, 20],
        [2, 30],
      ]);
    });
  });

  describe("Symbol.iterator", () => {
    test("should make the list iterable with for...of", () => {
      const list = LinkedList.from([1, 2, 3]);
      const values: number[] = [];

      for (const value of list) {
        values.push(value);
      }

      expect(values).toEqual([1, 2, 3]);
    });

    test("should allow spreading the list into an array", () => {
      const list = LinkedList.from([1, 2, 3]);
      const array = [...list];

      expect(array).toEqual([1, 2, 3]);
    });

    test("should handle an empty list", () => {
      const list = new LinkedList<number>();
      const values: number[] = [];

      for (const value of list) {
        values.push(value);
      }

      expect(values).toEqual([]);
    });

    // test("should iterate in insertion order", () => {
    //   const list = new LinkedList<number>();
    //   list.push(3).push(1).push(2);
    //   const values: number[] = [];

    //   for (const value of list) {
    //     values.push(value);
    //   }

    //   expect(values).toEqual([3, 1, 2]);
    // });
  });
});
