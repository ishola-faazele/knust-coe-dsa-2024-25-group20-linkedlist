import { LinkedList } from "../src/LinkedList";
describe("Adding and Removing Elements", () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });
  describe("push", () => {
    it("should add elements to the end", () => {
      list.push(1, 2, 3);
      expect(list.length).toBe(3);
      expect(list.at(2)).toBe(3);
    });

    it("should handle pushing into an empty list", () => {
      list.push(5);
      expect(list.length).toBe(1);
      expect(list.at(0)).toBe(5);
    });
  });

  describe("pop", () => {
    it("should remove and return the last element", () => {
      list.push(1, 2, 3);
      expect(list.pop()).toBe(3);
      expect(list.length).toBe(2);
    });

    it("should return undefined for empty list", () => {
      expect(list.pop()).toBeUndefined();
    });

    it("should set head and tail to null when popping last item", () => {
      list.push(1);
      list.pop();
      expect(list.at(0)).toBeUndefined();
      expect(list.at(0)).toBeUndefined();
    });
  });

  describe("unshift", () => {
    it("should add elements to the beginning", () => {
      list.unshift(1, 2, 3);
      expect(list.length).toBe(3);
      expect(list.at(0)).toBe(1);
    });

    it("should handle unshifting into an empty list", () => {
      list.unshift(5);
      expect(list.length).toBe(1);
      expect(list.at(0)).toBe(5);
    });
  });

  describe("shift", () => {
    it("should remove and return the first element", () => {
      list.push(1, 2, 3);
      expect(list.shift()).toBe(1);
      expect(list.length).toBe(2);
    });

    it("should return undefined for empty list", () => {
      expect(list.shift()).toBeUndefined();
    });

    it("should set head and tail to null when shifting last item", () => {
      list.push(1);
      list.shift();
      expect(list.at(0)).toBeUndefined();
      expect(list.at(0)).toBeUndefined();
    });
  });

  describe("delete", () => {
    it("should remove element at a given index", () => {
      list.push(1, 2, 3, 4);
      expect(list.delete(1)).toBe(true);
      expect(list.length).toBe(3);
      expect(list.at(1)).toBe(3);
    });

    it("should return false for out-of-bounds index", () => {
      expect(list.delete(0)).toBe(false);
    });

    it("should handle negative index", () => {
      list.push(10, 20, 30);
      expect(list.delete(-1)).toBe(true);
      expect(list.length).toBe(2);
    });

    it("should update tail when deleting last element", () => {
      list.push(1, 2, 3);
      list.delete(2);
      expect(list.at(1)).toBe(2);
    });
  });

  describe("splice", () => {
    it("should remove elements from a given index", () => {
      list.push(1, 2, 3, 4, 5);
      const removed = list.splice(1, 2);
      expect(removed.length).toBe(2);
      expect(removed.at(0)).toBe(2);
      expect(list.length).toBe(3);
    });

    it("should add new elements in place", () => {
      list.push(1, 2, 3);
      list.splice(1, 1, 8, 9);
      expect(list.at(1)).toBe(8);
      expect(list.at(2)).toBe(9);
      expect(list.at(3)).toBe(3);
    });

    it("should handle negative start index", () => {
      list.push(10, 20, 30, 40);
      list.splice(-2, 1, 25);
      expect(list.at(2)).toBe(25);
    });

    it("should return an empty list if deleteCount is zero and no items added", () => {
      list.push(10, 20, 30);
      const removed = list.splice(1, 0);
      expect(removed.length).toBe(0);
      expect(list.length).toBe(3);
    });
  });
});
