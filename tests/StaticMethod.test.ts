import { LinkedList } from "../src/LinkedList";
// Static methods
describe("Static Methods", () => {
  describe("fromArray", () => {
    it("should create a LinkedList from an array", () => {
      const array = [1, 2, 3];
      const list = LinkedList.fromArray(array);
      expect(list.length).toBe(3);
      expect(list.toArray()).toEqual(array);
    });
    it("should create an empty LinkedList from an empty array", () => {
      const list = LinkedList.fromArray([]);
      expect(list.length).toBe(0);
      expect(list.toArray()).toEqual([]);
    });
  });
  describe("from", () => {
    it("should create a LinkedList from a string", () => {
      const string = "abc";
      const list = LinkedList.from(string);
      expect(list.length).toBe(3);
    });
    it("should create an empty LinkedList from an empty string", () => {
      const list = LinkedList.from("");
      expect(list.length).toBe(0);
      expect(list.toArray()).toEqual([]);
    });
    it("should create a LinkedList from an iterable (Set)", () => {
      const set = new Set([5, 6, 7]);
      const list = LinkedList.from(set);
      expect(list.toArray()).toEqual([5, 6, 7]);
    });
    it("should apply a mapping function when using from", () => {
      const list = LinkedList.from([1, 2, 3], (x) => x * 2);
      expect(list.toArray()).toEqual([2, 4, 6]);
    });
  });
  describe("min/max", () => {
    it("should return min value", () => {
      const array = [1, 2, 3];
      const list = LinkedList.fromArray(array);
      expect(LinkedList.min(list)).toBe(1);
    });
    it("should return max value", () => {
      const array = [1, 2, 3];
      const list = LinkedList.fromArray(array);
      expect(LinkedList.max(list)).toBe(3);
    });
    it("should return undefined for min of an empty list", () => {
      const list = new LinkedList<number>();
      expect(LinkedList.min(list)).toBeUndefined();
    });

    it("should return undefined for max of an empty list", () => {
      const list = new LinkedList<number>();
      expect(LinkedList.max(list)).toBeUndefined();
    });
    it("should return correct min for negative numbers", () => {
      const list = LinkedList.fromArray([-3, -1, -2]);
      expect(LinkedList.min(list)).toBe(-3);
    });

    it("should return correct max for negative numbers", () => {
      const list = LinkedList.fromArray([-3, -1, -2]);
      expect(LinkedList.max(list)).toBe(-1);
    });
    it("should return correct min when duplicate values exist", () => {
      const list = LinkedList.fromArray([2, 2, 2, 2]);
      expect(LinkedList.min(list)).toBe(2);
    });

    it("should return correct max when duplicate values exist", () => {
      const list = LinkedList.fromArray([2, 2, 2, 2]);
      expect(LinkedList.max(list)).toBe(2);
    });
  });
});
