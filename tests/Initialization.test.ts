import { LinkedList } from "../src/LinkedList";
// Initialization

describe("Constructor Initialization", () => {
  it("should create an empty LinkedList", () => {
    const list = new LinkedList();
    expect(list.length).toBe(0);
    expect(list.toArray()).toEqual([]);
  });

  it("should create a LinkedList with initial values", () => {
    const list = new LinkedList(1, 2, 3);
    expect(list.length).toBe(3);
    expect(list.toArray()).toEqual([1, 2, 3]);
  });
});
