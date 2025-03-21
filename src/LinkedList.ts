/**
 * A TypeScript implementation of a linked list with Array-like methods
 */

/**
 * Node class for the LinkedList
 */
class Node<T> {
    value: T;
    next: Node<T> | null = null;
  
    constructor(value: T) {
      this.value = value;
    }
  }
  
  /**
   * LinkedList class with Array-like methods
   */
  export class LinkedList<T> {
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;
    private _length: number = 0;
  
    constructor(...items: T[]) {
      if (items.length > 0) {
        items.forEach((item) => this.push(item));
      }
    }
  
    //--------------------------------------------------------------------------
    // STATIC METHODS
    //--------------------------------------------------------------------------
  
    /**
     * Creates a new LinkedList from an array
     */
    static fromArray<T>(array: T[]): LinkedList<T> {
      const list = new LinkedList<T>();
      array.forEach((item) => list.push(item));
      return list;
    }
  
    /**
     * Creates a new LinkedList from an array-like object
     */
    static from<T, U = T>(
      arrayLike: ArrayLike<T> | Iterable<T>,
      mapFn?: (v: T, k: number) => U,
      thisArg?: unknown
    ): LinkedList<U> {
      const result = new LinkedList<U>();
  
      // Handle array-like objects
      if ("length" in arrayLike) {
        for (let i = 0; i < arrayLike.length; i++) {
          const value = arrayLike[i];
          if (mapFn) {
            result.push(mapFn.call(thisArg, value, i));
          } else {
            result.push(value as unknown as U);
          }
        }
      }
      // Handle iterables
      else if (Symbol.iterator in Object(arrayLike)) {
        let index = 0;
        for (const item of arrayLike as Iterable<T>) {
          if (mapFn) {
            result.push(mapFn.call(thisArg, item, index));
          } else {
            result.push(item as unknown as U);
          }
          index++;
        }
      }
  
      return result;
    }
  
    /**
     * Returns the minimum value in the list
     * @static
     */
    static min<T extends number>(list: LinkedList<T>): T | undefined {
      if (!list.length) return undefined;
  
      const arr = list.toArray();
      if (arr.length === 0) return undefined;
  
      // Use reduce to ensure we return a value of type T
      return arr.reduce((min, current) => (current < min ? current : min));
    }
  
    /**
     * Returns the maximum value in the list
     * @static
     */
    static max<T extends number>(list: LinkedList<T>): T | undefined {
      if (!list.length) return undefined;
  
      const arr = list.toArray();
      if (arr.length === 0) return undefined;
  
      // Use reduce to ensure we return a value of type T
      return arr.reduce((max, current) => (current > max ? current : max));
    }
  
    //--------------------------------------------------------------------------
    // PROPERTIES & BASIC ACCESS METHODS
    //--------------------------------------------------------------------------
  
    /**
     * Gets the number of elements in the linked list
     */
    get length(): number {
      return this._length;
    }
  
    /**
     * Gets the first node of the list (for internal use)
     */
    protected getHead(): Node<T> | null {
      return this.head;
    }
  
    /**
     * Gets the last node of the list (for internal use)
     */
    protected getTail(): Node<T> | null {
      return this.tail;
    }
  
    /**
     * Returns the element at the specified index
     */
    at(index: number): T | undefined {
      if (index < 0) {
        index = this._length + index;
      }
  
      if (index < 0 || index >= this._length) {
        return undefined;
      }
  
      let current = this.head;
      let currentIndex = 0;
  
      while (current && currentIndex < index) {
        current = current.next;
        currentIndex++;
      }
  
      return current ? current.value : undefined;
    }
  
    //--------------------------------------------------------------------------
    // ADDING & REMOVING ELEMENTS
    //--------------------------------------------------------------------------
  
    /**
     * Adds one or more elements to the end and returns the new length
     */
    push(...items: T[]): number {
      items.forEach((item) => {
        const newNode = new Node(item);
  
        if (!this.head) {
          this.head = newNode;
          this.tail = newNode;
        } else if (this.tail) {
          this.tail.next = newNode;
          this.tail = newNode;
        }
  
        this._length++;
      });
  
      return this._length;
    }
  
    /**
     * Removes the last element and returns it
     */
    pop(): T | undefined {
      if (!this.head) return undefined;
  
      if (this.head === this.tail) {
        const value = this.head.value;
        this.head = null;
        this.tail = null;
        this._length = 0;
        return value;
      }
  
      let current = this.head;
  
      while (current.next !== this.tail && current.next !== null) {
        current = current.next;
      }
  
      if (this.tail) {
        const value = this.tail.value;
        current.next = null;
        this.tail = current;
        this._length--;
        return value;
      }
  
      return undefined;
    }
  
    /**
     * Adds one or more elements to the beginning and returns the new length
     */
    unshift(...items: T[]): number {
      for (let i = items.length - 1; i >= 0; i--) {
        const newNode = new Node(items[i]);
  
        if (!this.head) {
          this.head = newNode;
          this.tail = newNode;
        } else {
          newNode.next = this.head;
          this.head = newNode;
        }
  
        this._length++;
      }
  
      return this._length;
    }
  
    /**
     * Removes the first element and returns it
     */
    shift(): T | undefined {
      if (!this.head) return undefined;
  
      const value = this.head.value;
      this.head = this.head.next;
  
      if (!this.head) {
        this.tail = null;
      }
  
      this._length--;
      return value;
    }
  
    /**
     * Removes an element at the specified index
     */
    delete(index: number): boolean {
      if (index < 0) {
        index = this._length + index;
      }
  
      if (index < 0 || index >= this._length) {
        return false;
      }
  
      if (index === 0) {
        this.shift();
        return true;
      }
  
      let current = this.head;
      let previousIndex = 0;
  
      while (current && previousIndex < index - 1) {
        current = current.next;
        previousIndex++;
      }
  
      if (!current || !current.next) return false;
  
      if (current.next === this.tail) {
        this.tail = current;
      }
  
      current.next = current.next.next;
      this._length--;
  
      return true;
    }
  
    /**
     * Changes the contents of the list by removing or replacing existing elements
     * and/or adding new elements in place
     */
    splice(start: number, deleteCount?: number, ...items: T[]): LinkedList<T> {
      // Handle negative start index
      if (start < 0) {
        start = this._length + start;
      }
  
      // Ensure start is within bounds
      start = Math.max(0, Math.min(start, this._length));
  
      // Default deleteCount to remove all elements from start
      if (deleteCount === undefined) {
        deleteCount = this._length - start;
      } else {
        // Ensure deleteCount is non-negative and doesn't exceed list length
        deleteCount = Math.max(0, Math.min(deleteCount, this._length - start));
      }
  
      // Create a result list for the deleted items
      const result = new LinkedList<T>();
  
      // If nothing to delete and nothing to add, return empty list
      if (deleteCount === 0 && items.length === 0) {
        return result;
      }
  
      // If start is 0 and we're deleting elements from the beginning
      if (start === 0) {
        // Add items to be deleted to the result
        for (let i = 0; i < deleteCount; i++) {
          if (this.head) {
            result.push(this.head.value);
            this.head = this.head.next;
            this._length--;
          }
        }
  
        // If the list is now empty
        if (!this.head) {
          this.tail = null;
        }
  
        // Add new items to the beginning
        this.unshift(...items);
        return result;
      }
  
      // Navigate to the node before the start position
      let current = this.head;
      let currentIndex = 0;
  
      while (current && currentIndex < start - 1) {
        current = current.next;
        currentIndex++;
      }
  
      // If we couldn't navigate to the position
      if (!current) {
        return result;
      }
  
      // Delete nodes after current
      let nodeToDelete = current.next;
      for (let i = 0; i < deleteCount; i++) {
        if (nodeToDelete) {
          result.push(nodeToDelete.value);
          nodeToDelete = nodeToDelete.next;
          this._length--;
        }
      }
  
      // Update tail if we deleted up to the end
      if (current.next && !nodeToDelete) {
        this.tail = current;
      }
  
      // Insert new items
      for (let i = 0; i < items.length; i++) {
        const newNode = new Node(items[i]);
  
        newNode.next = nodeToDelete;
        current.next = newNode;
  
        // If this is the last item and there are no more nodes
        if (i === items.length - 1 && !nodeToDelete) {
          this.tail = newNode;
        }
  
        current = newNode;
        this._length++;
      }
  
      return result;
    }
  
    //--------------------------------------------------------------------------
    // SEARCHING & FINDING
    //--------------------------------------------------------------------------
  
    /**
     * Checks if the list includes a certain element
     */
    includes(searchElement: T, fromIndex: number = 0): boolean {
      if (fromIndex < 0) {
        fromIndex = this._length + fromIndex;
      }
  
      fromIndex = Math.max(0, fromIndex);
  
      if (fromIndex >= this._length) return false;
  
      let current = this.head;
      let index = 0;
  
      // Skip to fromIndex
      while (current && index < fromIndex) {
        current = current.next;
        index++;
      }
  
      // Check for element
      while (current) {
        if (Object.is(current.value, searchElement)) {
          return true;
        }
        current = current.next;
      }
  
      return false;
    }
  
    /**
     * Returns the first index at which a given element can be found
     */
    indexOf(searchElement: T, fromIndex: number = 0): number {
      if (fromIndex < 0) {
        fromIndex = this._length + fromIndex;
      }
  
      fromIndex = Math.max(0, fromIndex);
  
      if (fromIndex >= this._length) return -1;
  
      let current = this.head;
      let index = 0;
  
      // Skip to fromIndex
      while (current && index < fromIndex) {
        current = current.next;
        index++;
      }
  
      // Find the element
      while (current) {
        if (Object.is(current.value, searchElement)) {
          return index;
        }
        current = current.next;
        index++;
      }
  
      return -1;
    }
  
    /**
     * Returns the last index at which a given element can be found
     */
    lastIndexOf(searchElement: T, fromIndex?: number): number {
      if (fromIndex === undefined || fromIndex >= this._length) {
        fromIndex = this._length - 1;
      }
  
      if (fromIndex < 0) {
        fromIndex = this._length + fromIndex;
      }
  
      fromIndex = Math.max(0, fromIndex);
  
      // Convert to array for easier backward search
      const arr = this.toArray();
  
      for (let i = Math.min(fromIndex, arr.length - 1); i >= 0; i--) {
        if (Object.is(arr[i], searchElement)) {
          return i;
        }
      }
  
      return -1;
    }
  
    /**
     * Returns the first element that satisfies the provided testing function
     */
    find(
      predicate: (value: T, index: number, list: LinkedList<T>) => unknown
    ): T | undefined {
      let current = this.head;
      let index = 0;
  
      while (current) {
        if (predicate(current.value, index, this)) {
          return current.value;
        }
        current = current.next;
        index++;
      }
  
      return undefined;
    }
  
    /**
     * Returns the index of the first element that satisfies the provided testing function
     */
    findIndex(
      predicate: (value: T, index: number, list: LinkedList<T>) => unknown
    ): number {
      let current = this.head;
      let index = 0;
  
      while (current) {
        if (predicate(current.value, index, this)) {
          return index;
        }
        current = current.next;
        index++;
      }
  
      return -1;
    }
  
    /**
     * Returns the last element that satisfies the provided testing function
     */
    findLast(
      predicate: (value: T, index: number, list: LinkedList<T>) => unknown
    ): T | undefined {
      let lastMatchingValue: T | undefined = undefined;
      let current = this.head;
      let index = 0;
  
      while (current) {
        if (predicate(current.value, index, this)) {
          lastMatchingValue = current.value;
        }
        current = current.next;
        index++;
      }
  
      return lastMatchingValue;
    }
  
    /**
     * Returns the index of the last element that satisfies the provided testing function
     */
    findLastIndex(
      predicate: (value: T, index: number, list: LinkedList<T>) => unknown
    ): number {
      let lastMatchingIndex = -1;
      let current = this.head;
      let index = 0;
  
      while (current) {
        if (predicate(current.value, index, this)) {
          lastMatchingIndex = index;
        }
        current = current.next;
        index++;
      }
  
      return lastMatchingIndex;
    }
  
    //--------------------------------------------------------------------------
    // TRANSFORMATION & ITERATION
    //--------------------------------------------------------------------------
  
    /**
     * Executes a function for each element in the list
     */
    forEach(
      callbackFn: (value: T, index: number, list: LinkedList<T>) => void
    ): void {
      let current = this.head;
      let index = 0;
  
      while (current) {
        callbackFn(current.value, index, this);
        current = current.next;
        index++;
      }
    }
  
    /**
     * Creates a new linked list with the results of calling a function
     */
    map<U>(
      callbackFn: (value: T, index: number, list: LinkedList<T>) => U
    ): LinkedList<U> {
      const result = new LinkedList<U>();
  
      let current = this.head;
      let index = 0;
  
      while (current) {
        result.push(callbackFn(current.value, index, this));
        current = current.next;
        index++;
      }
  
      return result;
    }
  
    /**
     * Creates a new linked list with elements that pass the test
     */
    filter(
      predicate: (value: T, index: number, list: LinkedList<T>) => unknown
    ): LinkedList<T> {
      const result = new LinkedList<T>();
  
      let current = this.head;
      let index = 0;
  
      while (current) {
        if (predicate(current.value, index, this)) {
          result.push(current.value);
        }
        current = current.next;
        index++;
      }
  
      return result;
    }
  
    /**
     * Applies a function against an accumulator and each element
     */
    reduce<U>(
      callbackFn: (
        previousValue: U,
        currentValue: T,
        currentIndex: number,
        list: LinkedList<T>
      ) => U,
      initialValue: U
    ): U {
      let accumulator = initialValue;
  
      let current = this.head;
      let index = 0;
  
      while (current) {
        accumulator = callbackFn(accumulator, current.value, index, this);
        current = current.next;
        index++;
      }
  
      return accumulator;
    }
  
    /**
     * Applies a function against an accumulator and each element (right to left)
     */
    reduceRight<U>(
      callbackFn: (
        previousValue: U,
        currentValue: T,
        currentIndex: number,
        list: LinkedList<T>
      ) => U,
      initialValue: U
    ): U {
      // Convert to array for right-to-left traversal
      const arr = this.toArray();
  
      return arr.reduceRight((acc, value, index) => {
        return callbackFn(acc, value, index, this);
      }, initialValue);
    }
  
    /**
     * Tests whether all elements pass the test
     */
    every(
      predicate: (value: T, index: number, list: LinkedList<T>) => unknown
    ): boolean {
      let current = this.head;
      let index = 0;
  
      while (current) {
        if (!predicate(current.value, index, this)) {
          return false;
        }
        current = current.next;
        index++;
      }
  
      return true;
    }
  
    /**
     * Tests whether at least one element passes the test
     */
    some(
      predicate: (value: T, index: number, list: LinkedList<T>) => unknown
    ): boolean {
      let current = this.head;
      let index = 0;
  
      while (current) {
        if (predicate(current.value, index, this)) {
          return true;
        }
        current = current.next;
        index++;
      }
  
      return false;
    }
  
    /**
     * Creates a new linked list by applying a function and flattening
     */
    flatMap<U>(
      callbackFn: (value: T, index: number, list: LinkedList<T>) => U | U[]
    ): LinkedList<U> {
      const result = new LinkedList<U>();
  
      let current = this.head;
      let index = 0;
  
      while (current) {
        const mappedValue = callbackFn(current.value, index, this);
  
        if (Array.isArray(mappedValue)) {
          mappedValue.forEach((item) => result.push(item));
        } else if (mappedValue instanceof LinkedList) {
          let node = mappedValue.getHead();
          while (node) {
            result.push(node.value as U);
            node = node.next;
          }
        } else {
          result.push(mappedValue);
        }
  
        current = current.next;
        index++;
      }
  
      return result;
    }
  
    //--------------------------------------------------------------------------
    // SLICING & CONCATENATION
    //--------------------------------------------------------------------------
  
    /**
     * Returns a shallow copy of a portion of the list
     */
    slice(start: number = 0, end?: number): LinkedList<T> {
      const result = new LinkedList<T>();
  
      if (start < 0) {
        start = this._length + start;
      }
  
      if (end === undefined) {
        end = this._length;
      } else if (end < 0) {
        end = this._length + end;
      }
  
      // Ensure bounds
      start = Math.max(0, start);
      end = Math.min(this._length, end);
  
      if (start >= end) return result;
  
      let current = this.head;
      let index = 0;
  
      // Skip to start
      while (current && index < start) {
        current = current.next;
        index++;
      }
  
      // Add elements until end
      while (current && index < end) {
        result.push(current.value);
        current = current.next;
        index++;
      }
  
      return result;
    }
  
    /**
     * Concatenates multiple linked lists or arrays
     */
    concat(...lists: (LinkedList<T> | T[])[]): LinkedList<T> {
      const result = new LinkedList<T>();
  
      // Add current list items
      let current = this.head;
      while (current) {
        result.push(current.value);
        current = current.next;
      }
  
      // Add items from other lists
      lists.forEach((list) => {
        if (list instanceof LinkedList) {
          let node = list.getHead();
          while (node) {
            result.push(node.value);
            node = node.next;
          }
        } else if (Array.isArray(list)) {
          list.forEach((item) => result.push(item));
        }
      });
  
      return result;
    }
  
    /**
     * Returns a new list with the elements added or removed at the specified index
     */
    toSpliced(start: number, deleteCount?: number, ...items: T[]): LinkedList<T> {
      const newList = this.clone();
      newList.splice(start, deleteCount, ...items);
      return newList;
    }
  
    //--------------------------------------------------------------------------
    // SORTING & REORDERING
    //--------------------------------------------------------------------------
  
    /**
     * Sorts the elements of the list in place
     */
    sort(compareFn?: (a: T, b: T) => number): LinkedList<T> {
      if (this._length <= 1) return this;
  
      // Convert to array, sort, and rebuild list
      const arr = this.toArray();
      arr.sort(compareFn);
  
      // Clear current list
      this.head = null;
      this.tail = null;
      this._length = 0;
  
      // Rebuild list
      arr.forEach((item) => this.push(item));
  
      return this;
    }
  
    /**
     * Reverses the elements of the list in place
     */
    reverse(): LinkedList<T> {
      if (this._length <= 1) return this;
  
      let prev = null;
      let current = this.head;
      let next = null;
  
      // Swap head and tail
      this.tail = this.head;
  
      while (current) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
      }
  
      this.head = prev;
  
      return this;
    }
  
    /**
     * Returns a new sorted linked list
     */
    toSorted(compareFn?: (a: T, b: T) => number): LinkedList<T> {
      return this.clone().sort(compareFn);
    }
  
    /**
     * Returns a new reversed linked list
     */
    toReversed(): LinkedList<T> {
      return this.clone().reverse();
    }
  
    /**
     * Sorts the elements of the list numerically
     */
    numericSort(): LinkedList<T> {
      if (this._length <= 1) return this;
  
      // Convert to array, sort, and rebuild list
      const arr = this.toArray();
      arr.sort((a, b) => {
        // Type assertion for numeric comparison
        return Number(a) - Number(b);
      });
  
      // Clear current list
      this.head = null;
      this.tail = null;
      this._length = 0;
  
      // Rebuild list
      arr.forEach((item) => this.push(item));
  
      return this;
    }
  
    /**
     * Sorts the elements of the list randomly
     */
    randomSort(): LinkedList<T> {
      if (this._length <= 1) return this;
  
      // Convert to array, sort randomly, and rebuild list
      const arr = this.toArray();
      arr.sort(() => Math.random() - 0.5);
  
      // Clear current list
      this.head = null;
      this.tail = null;
      this._length = 0;
  
      // Rebuild list
      arr.forEach((item) => this.push(item));
  
      return this;
    }
  
    //--------------------------------------------------------------------------
    // ADVANCED OPERATIONS
    //--------------------------------------------------------------------------
  
    /**
     * Copies part of the list to another location in the same list
     */
    copyWithin(target: number, start: number, end?: number): LinkedList<T> {
      if (this._length <= 1) return this;
  
      // Convert to array, perform operation, and rebuild list
      const arr = this.toArray();
      arr.copyWithin(target, start, end);
  
      return LinkedList.from(arr);
    }
  
    /**
     * Creates a new linked list with all sub-array elements concatenated
     */
    flat<U>(depth: number = 1): LinkedList<U> {
      const result = new LinkedList<U>();
  
      const flatten = (item: unknown, currentDepth: number) => {
        if (Array.isArray(item) && currentDepth < depth) {
          item.forEach((subItem) => flatten(subItem, currentDepth + 1));
        } else if (item instanceof LinkedList && currentDepth < depth) {
          let current = item.getHead();
          while (current) {
            flatten(current.value, currentDepth + 1);
            current = current.next;
          }
        } else {
          result.push(item as U);
        }
      };
  
      let current = this.head;
      while (current) {
        flatten(current.value, 0);
        current = current.next;
      }
  
      return result;
    }
  
    /**
     * Returns a new LinkedList with a value changed at a specific index
     */
    with(index: number, value: T): LinkedList<T> {
      if (index < 0) {
        index = this._length + index;
      }
  
      if (index < 0 || index >= this._length) {
        throw new RangeError("Invalid index");
      }
  
      const result = this.clone();
  
      let current = result.getHead();
      let currentIndex = 0;
  
      while (current && currentIndex < index) {
        current = current.next;
        currentIndex++;
      }
  
      if (current) {
        current.value = value;
      }
  
      return result;
    }
  
    //--------------------------------------------------------------------------
    // CONVERSION & UTILITY
    //--------------------------------------------------------------------------
  
    /**
     * Converts the linked list to a string
     */
    toString(): string {
      if (!this.head) return "";
  
      const values: string[] = [];
      let current = this.head;
  
      while (current) {
        values.push(String(current.value));
        current = current.next as Node<T>; // Type assertion here, i should be sure first
      }
  
      return values.join(",");
    }
  
    /**
     * Joins all elements of the linked list into a string
     */
    join(separator: string = ","): string {
      if (!this.head) return "";
  
      const values: string[] = [];
      let current = this.head;
  
      while (current) {
        values.push(String(current.value));
        current = current.next as Node<T>; // again, type assertion here that may cause problems. i should be sure
      }
  
      return values.join(separator);
    }
  
    /**
     * Spreads the linked list into an array
     */
    toArray(): T[] {
      const result: T[] = [];
      let current = this.head;
  
      while (current) {
        result.push(current.value);
        current = current.next;
      }
  
      return result;
    }
  
    /**
     * Creates a deep copy of the linked list
     */
    clone(): LinkedList<T> {
      return LinkedList.from(this.toArray());
    }
  
    /**
     * Returns a LinkedList Iterator object that contains the keys
     */
    keys(): IterableIterator<number> {
      const indexes: number[] = [];
      for (let i = 0; i < this._length; i++) {
        indexes.push(i);
      }
      return indexes[Symbol.iterator]();
    }
  
    /**
     * Returns a LinkedList Iterator object that contains [key, value] pairs
     */
    entries(): IterableIterator<[number, T]> {
      const entries: [number, T][] = [];
      let current = this.head;
      let index = 0;
  
      while (current) {
        entries.push([index, current.value]);
        current = current.next;
        index++;
      }
  
      return entries[Symbol.iterator]();
    }
  
    /**
     * Makes the linked list iterable
     */
    *[Symbol.iterator](): Iterator<T> {
      let current = this.head;
  
      while (current) {
        yield current.value;
        current = current.next;
      }
    }
  }
  
  /**
   * Min/Max utility functions for numeric types
   */
  export const min = <T extends number | bigint | string | Date>(
    list: LinkedList<T>
  ): T | undefined => {
    if (!list.length) return undefined;
  
    const arr = list.toArray();
    if (arr.length === 0) return undefined;
  
    return arr.reduce((min, current) => (current < min ? current : min), arr[0]);
  };
  
  export const max = <T extends number | bigint | string | Date>(
    list: LinkedList<T>
  ): T | undefined => {
    if (!list.length) return undefined;
  
    const arr = list.toArray();
    if (arr.length === 0) return undefined;
  
    return arr.reduce((max, current) => (current > max ? current : max), arr[0]);
  };
  
  /**
   * Home-made min implementation
   */
  export function homemadeMin<T>(
    list: LinkedList<T>,
    compareFn?: (a: T, b: T) => number
  ): T | undefined {
    if (!list.length) return undefined;
  
    // Fix Error 3: Property 'getHead' is protected
    if (!(list instanceof LinkedList)) return undefined;
  
    // Create a proper accessor method or work with array
    const arr = list.toArray();
    if (arr.length === 0) return undefined;
  
    let minValue = arr[0];
  
    for (let i = 1; i < arr.length; i++) {
      if (compareFn) {
        if (compareFn(arr[i], minValue) < 0) {
          minValue = arr[i];
        }
      } else if (arr[i] < minValue) {
        // Fix Errors 4 & 5: Object is of type 'unknown'
        minValue = arr[i];
      }
    }
  
    return minValue;
  }
  
  /**
   * Home-made max implementation
   */
  export function homemadeMax<T>(
    list: LinkedList<T>,
    compareFn?: (a: T, b: T) => number
  ): T | undefined {
    if (!list.length) return undefined;
  
    if (!(list instanceof LinkedList)) return undefined;
  
    // Create a proper accessor method or work with array
    const arr = list.toArray();
    if (arr.length === 0) return undefined;
  
    let maxValue = arr[0];
  
    for (let i = 1; i < arr.length; i++) {
      if (compareFn) {
        if (compareFn(arr[i], maxValue) > 0) {
          maxValue = arr[i];
        }
      } else if (arr[i] > maxValue) {
        // Fix Errors 7 & 8: Object is of type 'unknown'
        maxValue = arr[i];
      }
    }
  
    return maxValue;
  }
  