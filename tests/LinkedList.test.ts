import { LinkedList } from '../src/LinkedList';

describe('LinkedList', () => {
  // Basic creation and properties
  test('should create an empty list', () => {
    const list = new LinkedList();
    expect(list.length).toBe(0);
    expect(list.toArray()).toEqual([]);
  });

  test('should create a list with initial values', () => {
    const list = new LinkedList(1, 2, 3);
    expect(list.length).toBe(3);
    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  // Basic operations
  test('should push elements to the list', () => {
    const list = new LinkedList<number>();
    list.push(1, 2, 3);
    expect(list.length).toBe(3);
    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  test('should pop elements from the list', () => {
    const list = new LinkedList(1, 2, 3);
    const popped = list.pop();
    expect(popped).toBe(3);
    expect(list.length).toBe(2);
    expect(list.toArray()).toEqual([1, 2]);
  });

  test('should unshift elements to the list', () => {
    const list = new LinkedList(2, 3);
    list.unshift(1);
    expect(list.length).toBe(3);
    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  test('should shift elements from the list', () => {
    const list = new LinkedList(1, 2, 3);
    const shifted = list.shift();
    expect(shifted).toBe(1);
    expect(list.length).toBe(2);
    expect(list.toArray()).toEqual([2, 3]);
  });

  // Additional methods
  test('should find elements in the list', () => {
    const list = new LinkedList(1, 2, 3, 4, 5);
    expect(list.find(x => x > 3)).toBe(4);
    expect(list.findIndex(x => x > 3)).toBe(3);
  });

  test('should filter elements in the list', () => {
    const list = new LinkedList(1, 2, 3, 4, 5);
    const filtered = list.filter(x => x % 2 === 0);
    expect(filtered.toArray()).toEqual([2, 4]);
  });

  test('should map elements in the list', () => {
    const list = new LinkedList(1, 2, 3);
    const mapped = list.map(x => x * 2);
    expect(mapped.toArray()).toEqual([2, 4, 6]);
  });

  test('should sort elements in the list', () => {
    const list = new LinkedList(3, 1, 4, 2);
    list.sort();
    expect(list.toArray()).toEqual([1, 2, 3, 4]);
  });

  test('should reverse elements in the list', () => {
    const list = new LinkedList(1, 2, 3);
    list.reverse();
    expect(list.toArray()).toEqual([3, 2, 1]);
  });
});