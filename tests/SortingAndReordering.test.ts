import { LinkedList } from "../dist";
//--------------------------------------------------------------------------
// SORTING & REORDERING
//--------------------------------------------------------------------------
describe("Sorting & Reordering", () => {
  //--------------------------------------------------
  // sort() method tests
  //--------------------------------------------------
  describe("sort()", () => {
    it("should return the list unchanged when empty", () => {
      const list = new LinkedList<number>();
      const sorted = list.sort();
      expect(sorted.length).toBe(0);
      expect(sorted).toBe(list); // Should return the same instance
    });

    it("should return the list unchanged when it has only one element", () => {
      const list = new LinkedList<number>(42);
      const sorted = list.sort();
      expect(sorted.length).toBe(1);
      expect(sorted.at(0)).toBe(42);
      expect(sorted).toBe(list); // Should return the same instance
    });

    it("should sort numbers in ascending order by default", () => {
      const list = new LinkedList<number>(5, 3, 8, 1, 2);
      const sorted = list.sort();
      expect(sorted.toArray()).toEqual([1, 2, 3, 5, 8]);
      expect(sorted).toBe(list); // Should return the same instance
    });

    it("should sort strings in lexicographic order by default", () => {
      const list = new LinkedList<string>("banana", "apple", "orange", "grape");
      const sorted = list.sort();
      expect(sorted.toArray()).toEqual(["apple", "banana", "grape", "orange"]);
      expect(sorted).toBe(list); // Should return the same instance
    });

    it("should sort using a custom comparison function", () => {
      const list = new LinkedList<number>(5, 3, 8, 1, 2);
      const sorted = list.sort((a, b) => b - a); // Descending order
      expect(sorted.toArray()).toEqual([8, 5, 3, 2, 1]);
      expect(sorted).toBe(list); // Should return the same instance
    });

    it("should sort objects based on a property", () => {
      type Person = { name: string; age: number };
      const list = new LinkedList<Person>(
        { name: "Alice", age: 30 },
        { name: "Bob", age: 25 },
        { name: "Charlie", age: 35 }
      );
      const sorted = list.sort((a, b) => a.age - b.age);
      expect(sorted.toArray().map((p) => p.name)).toEqual([
        "Bob",
        "Alice",
        "Charlie",
      ]);
      expect(sorted).toBe(list); // Should return the same instance
    });

    it("should maintain the correct head, tail, and length after sorting", () => {
      const list = new LinkedList<number>(5, 3, 8, 1, 2);
      list.sort();

      expect(list.length).toBe(5);
      expect(list.at(0)).toBe(1); // Head should be 1
      expect(list.at(list.length - 1)).toBe(8); // Tail should be 8

      // Verify we can still add elements after sorting
      list.push(10);
      expect(list.length).toBe(6);
      expect(list.at(list.length - 1)).toBe(10);
    });
  });

  //--------------------------------------------------
  // reverse() method tests
  //--------------------------------------------------
  describe("reverse()", () => {
    it("should return the list unchanged when empty", () => {
      const list = new LinkedList<number>();
      const reversed = list.reverse();
      expect(reversed.length).toBe(0);
      expect(reversed).toBe(list); // Should return the same instance
    });

    it("should return the list unchanged when it has only one element", () => {
      const list = new LinkedList<number>(42);
      const reversed = list.reverse();
      expect(reversed.length).toBe(1);
      expect(reversed.at(0)).toBe(42);
      expect(reversed).toBe(list); // Should return the same instance
    });

    it("should reverse a list with multiple elements", () => {
      const list = new LinkedList<number>(1, 2, 3, 4, 5);
      const reversed = list.reverse();
      expect(reversed.toArray()).toEqual([5, 4, 3, 2, 1]);
      expect(reversed).toBe(list); // Should return the same instance
    });

    it("should properly handle a list with exactly two elements", () => {
      const list = new LinkedList<string>("first", "second");
      const reversed = list.reverse();
      expect(reversed.toArray()).toEqual(["second", "first"]);
      expect(reversed).toBe(list); // Should return the same instance
    });

    it("should maintain the correct head, tail, and length after reversing", () => {
      const list = new LinkedList<number>(1, 2, 3, 4, 5);
      list.reverse();

      expect(list.length).toBe(5);
      expect(list.at(0)).toBe(5); // Head should be 5
      expect(list.at(list.length - 1)).toBe(1); // Tail should be 1

      // Verify we can still add elements after reversing
      list.push(0);
      expect(list.length).toBe(6);
      expect(list.at(list.length - 1)).toBe(0);
    });

    it("should be able to reverse a list multiple times", () => {
      const list = new LinkedList<number>(1, 2, 3);
      list.reverse().reverse();
      expect(list.toArray()).toEqual([1, 2, 3]);

      list.reverse().reverse().reverse();
      expect(list.toArray()).toEqual([3, 2, 1]);
    });
  });

  //--------------------------------------------------
  // toSorted() method tests
  //--------------------------------------------------
  describe("toSorted()", () => {
    it("should return a new empty list when the original list is empty", () => {
      const list = new LinkedList<number>();
      const sorted = list.toSorted();
      expect(sorted.length).toBe(0);
      expect(sorted).not.toBe(list); // Should return a different instance
    });

    it("should return a new list with the same element when original has only one element", () => {
      const list = new LinkedList<number>(42);
      const sorted = list.toSorted();
      expect(sorted.length).toBe(1);
      expect(sorted.at(0)).toBe(42);
      expect(sorted).not.toBe(list); // Should return a different instance
    });

    it("should return a new sorted list without modifying the original", () => {
      const list = new LinkedList<number>(5, 3, 8, 1, 2);
      const original = list.toArray(); // Save original state
      const sorted = list.toSorted();

      expect(sorted.toArray()).toEqual([1, 2, 3, 5, 8]);
      expect(list.toArray()).toEqual(original); // Original should be unchanged
      expect(sorted).not.toBe(list); // Should return a different instance
    });

    it("should sort using a custom comparison function", () => {
      const list = new LinkedList<number>(5, 3, 8, 1, 2);
      const sorted = list.toSorted((a, b) => b - a); // Descending order
      expect(sorted.toArray()).toEqual([8, 5, 3, 2, 1]);
      expect(list.toArray()).toEqual([5, 3, 8, 1, 2]); // Original should be unchanged
    });
  });

  //--------------------------------------------------
  // toReversed() method tests
  //--------------------------------------------------
  describe("toReversed()", () => {
    it("should return a new empty list when the original list is empty", () => {
      const list = new LinkedList<number>();
      const reversed = list.toReversed();
      expect(reversed.length).toBe(0);
      expect(reversed).not.toBe(list); // Should return a different instance
    });

    it("should return a new list with the same element when original has only one element", () => {
      const list = new LinkedList<number>(42);
      const reversed = list.toReversed();
      expect(reversed.length).toBe(1);
      expect(reversed.at(0)).toBe(42);
      expect(reversed).not.toBe(list); // Should return a different instance
    });

    it("should return a new reversed list without modifying the original", () => {
      const list = new LinkedList<number>(1, 2, 3, 4, 5);
      const original = list.toArray(); // Save original state
      const reversed = list.toReversed();

      expect(reversed.toArray()).toEqual([5, 4, 3, 2, 1]);
      expect(list.toArray()).toEqual(original); // Original should be unchanged
      expect(reversed).not.toBe(list); // Should return a different instance
    });
  });

  //--------------------------------------------------
  // numericSort() method tests
  //--------------------------------------------------
  describe("numericSort()", () => {
    it("should return the list unchanged when empty", () => {
      const list = new LinkedList<number>();
      const sorted = list.numericSort();
      expect(sorted.length).toBe(0);
      expect(sorted).toBe(list); // Should return the same instance
    });

    it("should return the list unchanged when it has only one element", () => {
      const list = new LinkedList<number>(42);
      const sorted = list.numericSort();
      expect(sorted.length).toBe(1);
      expect(sorted.at(0)).toBe(42);
      expect(sorted).toBe(list); // Should return the same instance
    });

    it("should sort numbers in ascending order", () => {
      const list = new LinkedList<number>(5, 3, 8, 1, 2);
      const sorted = list.numericSort();
      expect(sorted.toArray()).toEqual([1, 2, 3, 5, 8]);
      expect(sorted).toBe(list); // Should return the same instance
    });

    it("should sort numeric strings correctly", () => {
      const list = new LinkedList<string>("10", "5", "1", "20");
      const sorted = list.numericSort();
      // Note: Regular string sort would give ['1', '10', '20', '5']
      // But numeric sort should give ['1', '5', '10', '20']
      expect(sorted.toArray()).toEqual(["1", "5", "10", "20"]);
    });

    it("should maintain the correct head, tail, and length after numeric sorting", () => {
      const list = new LinkedList<number>(5, 10, 3, 8, 1);
      list.numericSort();

      expect(list.length).toBe(5);
      expect(list.at(0)).toBe(1); // Head should be 1
      expect(list.at(list.length - 1)).toBe(10); // Tail should be 10

      // Verify we can still add elements after sorting
      list.push(20);
      expect(list.length).toBe(6);
      expect(list.at(list.length - 1)).toBe(20);
    });
  });

  //--------------------------------------------------
  // randomSort() method tests
  //--------------------------------------------------
  describe("randomSort()", () => {
    // Mock Math.random for predictable tests
    const originalRandom = Math.random;

    beforeEach(() => {
      // Mock to return values in sequence 0.1, 0.2, 0.3, etc.
      let counter = 0;
      jest.spyOn(Math, "random").mockImplementation(() => {
        counter = (counter + 0.1) % 1;
        return counter;
      });
    });

    afterEach(() => {
      jest.spyOn(Math, "random").mockRestore();
    });

    it("should return the list unchanged when empty", () => {
      const list = new LinkedList<number>();
      const sorted = list.randomSort();
      expect(sorted.length).toBe(0);
      expect(sorted).toBe(list); // Should return the same instance
    });

    it("should return the list unchanged when it has only one element", () => {
      const list = new LinkedList<number>(42);
      const sorted = list.randomSort();
      expect(sorted.length).toBe(1);
      expect(sorted.at(0)).toBe(42);
      expect(sorted).toBe(list); // Should return the same instance
    });

    it("should shuffle the list elements", () => {
      const list = new LinkedList<number>(1, 2, 3, 4, 5);
      const original = [...list.toArray()]; // Create a copy

      list.randomSort();

      // Due to the mocked Math.random, we can predict the outcome
      // The exact order will depend on the sort algorithm's specific implementation
      // We just need to verify the list has the same elements but in a different order
      expect(list.length).toBe(original.length);
      expect(list.toArray().sort()).toEqual(original.sort());

      // With our mocked Math.random, we should get a consistent shuffle result
      // This test might be fragile if the sort algorithm changes
      expect(list.toArray()).not.toEqual(original);
    });

    it("should maintain the correct head, tail, and length after random sorting", () => {
      const list = new LinkedList<number>(1, 2, 3, 4, 5);
      const originalLength = list.length;

      list.randomSort();

      expect(list.length).toBe(originalLength);

      // Verify we can still add elements after shuffling
      list.push(6);
      expect(list.length).toBe(originalLength + 1);
      expect(list.at(list.length - 1)).toBe(6);
    });
  });
});
