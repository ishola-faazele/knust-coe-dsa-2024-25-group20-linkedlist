import { LinkedList, homemadeMax, homemadeMin } from "../src/LinkedList";

describe("HomeMadeMinAndMax", () => {
  describe("homemadeMin", () => {
    test("should return the minimum value in a number list", () => {
      const list = LinkedList.from([5, 2, 8, 1, 9]);
      expect(homemadeMin(list)).toBe(1);
    });

    test("should handle a list with a single element", () => {
      const list = LinkedList.from([42]);
      expect(homemadeMin(list)).toBe(42);
    });

    test("should return undefined for an empty list", () => {
      const list = new LinkedList<number>();
      expect(homemadeMin(list)).toBeUndefined();
    });

    test("should use a custom compare function when provided", () => {
      const list = LinkedList.from(["apple", "banana", "cherry", "date"]);
      const compareByLength = (a: string, b: string) => a.length - b.length;

      expect(homemadeMin(list, compareByLength)).toBe("date"); // shortest string
    });

    test("should handle object comparison with a compare function", () => {
      const list = LinkedList.from([
        { id: 1, value: 10 },
        { id: 2, value: 5 },
        { id: 3, value: 15 },
      ]);

      const compareByValue = (a: { value: number }, b: { value: number }) =>
        a.value - b.value;
      const result = homemadeMin(list, compareByValue);

      expect(result).toEqual({ id: 2, value: 5 });
    });

    test("should return undefined for non-LinkedList input", () => {
      // @ts-ignore - Testing incorrect usage
      expect(homemadeMin([])).toBeUndefined();
      // @ts-ignore - Testing incorrect usage
      expect(homemadeMin(null)).toBeUndefined();
      // @ts-ignore - Testing incorrect usage
      expect(homemadeMin(undefined)).toBeUndefined();
    });

    test("should work with boolean values", () => {
      const list = LinkedList.from([true, false, true]);
      expect(homemadeMin(list)).toBe(false); // false < true in JS
    });
  });

  describe("homemadeMax", () => {
    test("should return the maximum value in a number list", () => {
      const list = LinkedList.from([5, 2, 8, 1, 9]);
      expect(homemadeMax(list)).toBe(9);
    });

    test("should handle a list with a single element", () => {
      const list = LinkedList.from([42]);
      expect(homemadeMax(list)).toBe(42);
    });

    test("should return undefined for an empty list", () => {
      const list = new LinkedList<number>();
      expect(homemadeMax(list)).toBeUndefined();
    });

    test("should use a custom compare function when provided", () => {
      const list = LinkedList.from(["apple", "banana", "raspberry", "date"]);
      const compareByLength = (a: string, b: string) => a.length - b.length;

      expect(homemadeMax(list, compareByLength)).toBe("raspberry"); // longest string
    });

    test("should handle object comparison with a compare function", () => {
      const list = LinkedList.from([
        { id: 1, value: 10 },
        { id: 2, value: 5 },
        { id: 3, value: 15 },
      ]);

      const compareByValue = (a: { value: number }, b: { value: number }) =>
        a.value - b.value;
      const result = homemadeMax(list, compareByValue);

      expect(result).toEqual({ id: 3, value: 15 });
    });

    test("should return undefined for non-LinkedList input", () => {
      // @ts-ignore - Testing incorrect usage
      expect(homemadeMax([])).toBeUndefined();
      // @ts-ignore - Testing incorrect usage
      expect(homemadeMax(null)).toBeUndefined();
      // @ts-ignore - Testing incorrect usage
      expect(homemadeMax(undefined)).toBeUndefined();
    });

    test("should work with boolean values", () => {
      const list = LinkedList.from([true, false, true]);
      expect(homemadeMax(list)).toBe(true); // true > false in JS
    });
  });

  describe("Integration tests", () => {
    test("should find correct min and max with mixed data types", () => {
      // JavaScript comparison behavior with different types
      const list = LinkedList.from([0, "10", -5, "100"]);

      // In JavaScript, string comparison with numbers converts the strings to numbers
      expect(homemadeMin(list)).toBe(-5);
      expect(homemadeMax(list)).toBe("100"); // String "100" is greater than number 10
    });

    test("should correctly compare dates using custom comparator", () => {
      const dates = LinkedList.from([
        new Date(2023, 0, 1), // Jan 1, 2023
        new Date(2022, 0, 1), // Jan 1, 2022
        new Date(2023, 5, 15), // Jun 15, 2023
        new Date(2022, 11, 31), // Dec 31, 2022
      ]);

      const dateComparator = (a: Date, b: Date) => a.getTime() - b.getTime();

      expect(homemadeMin(dates, dateComparator)).toEqual(new Date(2022, 0, 1));
      expect(homemadeMax(dates, dateComparator)).toEqual(new Date(2023, 5, 15));
    });

    test("should handle empty lists consistently across both functions", () => {
      const emptyList = new LinkedList<number>();

      expect(homemadeMin(emptyList)).toBeUndefined();
      expect(homemadeMax(emptyList)).toBeUndefined();
    });

    test("should handle custom comparison function that returns only 1, 0, -1", () => {
      const list = LinkedList.from([5, 10, 3, 8]);

      // Simple comparator that only returns -1, 0, or 1
      const simpleComparator = (a: number, b: number) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      };

      expect(homemadeMin(list, simpleComparator)).toBe(3);
      expect(homemadeMax(list, simpleComparator)).toBe(10);
    });
  });
});
