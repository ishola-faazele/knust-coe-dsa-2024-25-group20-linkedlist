import { LinkedList } from "../src/LinkedList";
// Basic creation and properties
describe("Basic Operations", () => {
  describe("LinkedList - length", () => {
    it("should return 0 for an empty list", () => {
      const list = new LinkedList();
      expect(list.length).toBe(0);
    });

    it("should return the correct length after initialization", () => {
      const list = new LinkedList(1, 2, 3);
      expect(list.length).toBe(3);
    });

    it("should reflect changes when elements are added", () => {
      const list = new LinkedList();
      list.push(10);
      list.push(20);
      expect(list.length).toBe(2);
    });

    it("should reflect changes when elements are removed", () => {
      const list = new LinkedList(1, 2, 3);
      list.pop();
      expect(list.length).toBe(2);
    });
  });
  describe("LinkedList - at", () => {
    it("should return undefined for an empty list", () => {
      const list = new LinkedList();
      expect(list.at(0)).toBeUndefined();
    });

    it("should retrieve elements at valid indices", () => {
      const list = new LinkedList("a", "b", "c");
      expect(list.at(0)).toBe("a"); // First element
      expect(list.at(1)).toBe("b"); // Middle element
      expect(list.at(2)).toBe("c"); // Last element
    });

    it("should return undefined for out-of-bounds indices", () => {
      const list = new LinkedList(10, 20, 30);
      expect(list.at(3)).toBeUndefined(); // Beyond length
      expect(list.at(-4)).toBeUndefined(); // Negative out-of-bounds
    });

    it("should support negative indices (from the end)", () => {
      const list = new LinkedList(10, 20, 30);
      expect(list.at(-1)).toBe(30); // Last element
      expect(list.at(-2)).toBe(20); // Second-to-last
      expect(list.at(-3)).toBe(10); // First element
    });

    it("should return undefined for invalid negative indices", () => {
      const list = new LinkedList(5, 10, 15);
      expect(list.at(-4)).toBeUndefined(); // Beyond negative range
    });
  });
});
