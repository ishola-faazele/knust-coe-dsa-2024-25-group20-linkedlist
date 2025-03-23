"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  LinkedList: () => LinkedList,
  homemadeMax: () => homemadeMax,
  homemadeMin: () => homemadeMin,
  max: () => max,
  min: () => min
});
module.exports = __toCommonJS(index_exports);

// src/LinkedList.ts
var Node = class {
  constructor(value) {
    this.next = null;
    this.value = value;
  }
};
var LinkedList = class _LinkedList {
  constructor(...items) {
    this.head = null;
    this.tail = null;
    this._length = 0;
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
  static fromArray(array) {
    const list = new _LinkedList();
    array.forEach((item) => list.push(item));
    return list;
  }
  /**
   * Creates a new LinkedList from an array-like object
   */
  static from(arrayLike, mapFn, thisArg) {
    const result = new _LinkedList();
    if (typeof arrayLike === "string") {
      const str = arrayLike;
      for (let i = 0; i < str.length; i++) {
        const value = str[i];
        if (mapFn) {
          result.push(mapFn.call(thisArg, value, i));
        } else {
          result.push(value);
        }
      }
    } else if (arrayLike && typeof arrayLike === "object" && "length" in arrayLike) {
      for (let i = 0; i < arrayLike.length; i++) {
        const value = arrayLike[i];
        if (mapFn) {
          result.push(mapFn.call(thisArg, value, i));
        } else {
          result.push(value);
        }
      }
    } else if (arrayLike && typeof arrayLike === "object" && Symbol.iterator in Object(arrayLike)) {
      let index = 0;
      for (const item of arrayLike) {
        if (mapFn) {
          result.push(mapFn.call(thisArg, item, index));
        } else {
          result.push(item);
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
  static min(list) {
    if (!list.length) return void 0;
    const arr = list.toArray();
    if (arr.length === 0) return void 0;
    return arr.reduce((min2, current) => current < min2 ? current : min2);
  }
  /**
   * Returns the maximum value in the list
   * @static
   */
  static max(list) {
    if (!list.length) return void 0;
    const arr = list.toArray();
    if (arr.length === 0) return void 0;
    return arr.reduce((max2, current) => current > max2 ? current : max2);
  }
  //--------------------------------------------------------------------------
  // PROPERTIES & BASIC ACCESS METHODS
  //--------------------------------------------------------------------------
  /**
   * Gets the number of elements in the linked list
   */
  get length() {
    return this._length;
  }
  /**
   * Gets the first node of the list (for internal use)
   */
  getHead() {
    return this.head;
  }
  /**
   * Gets the last node of the list (for internal use)
   */
  getTail() {
    return this.tail;
  }
  /**
   * Returns the element at the specified index
   */
  at(index) {
    if (index < 0) {
      index = this._length + index;
    }
    if (index < 0 || index >= this._length) {
      return void 0;
    }
    let current = this.head;
    let currentIndex = 0;
    while (current && currentIndex < index) {
      current = current.next;
      currentIndex++;
    }
    return current ? current.value : void 0;
  }
  //--------------------------------------------------------------------------
  // ADDING & REMOVING ELEMENTS
  //--------------------------------------------------------------------------
  /**
   * Adds one or more elements to the end and returns the new length
   */
  push(...items) {
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
  pop() {
    if (!this.head) return void 0;
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
    return void 0;
  }
  /**
   * Adds one or more elements to the beginning and returns the new length
   */
  unshift(...items) {
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
  shift() {
    if (!this.head) return void 0;
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
  delete(index) {
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
  splice(start, deleteCount, ...items) {
    if (start < 0) {
      start = this._length + start;
    }
    start = Math.max(0, Math.min(start, this._length));
    if (deleteCount === void 0) {
      deleteCount = this._length - start;
    } else {
      deleteCount = Math.max(0, Math.min(deleteCount, this._length - start));
    }
    const result = new _LinkedList();
    if (deleteCount === 0 && items.length === 0) {
      return result;
    }
    if (start === 0) {
      for (let i = 0; i < deleteCount; i++) {
        if (this.head) {
          result.push(this.head.value);
          this.head = this.head.next;
          this._length--;
        }
      }
      if (!this.head) {
        this.tail = null;
      }
      this.unshift(...items);
      return result;
    }
    let current = this.head;
    let currentIndex = 0;
    while (current && currentIndex < start - 1) {
      current = current.next;
      currentIndex++;
    }
    if (!current) {
      return result;
    }
    let nodeToDelete = current.next;
    for (let i = 0; i < deleteCount; i++) {
      if (nodeToDelete) {
        result.push(nodeToDelete.value);
        nodeToDelete = nodeToDelete.next;
        this._length--;
      }
    }
    if (current.next && !nodeToDelete) {
      this.tail = current;
    }
    for (let i = 0; i < items.length; i++) {
      const newNode = new Node(items[i]);
      newNode.next = nodeToDelete;
      current.next = newNode;
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
  includes(searchElement, fromIndex = 0) {
    if (fromIndex < 0) {
      fromIndex = this._length + fromIndex;
    }
    fromIndex = Math.max(0, fromIndex);
    if (fromIndex >= this._length) return false;
    let current = this.head;
    let index = 0;
    while (current && index < fromIndex) {
      current = current.next;
      index++;
    }
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
  indexOf(searchElement, fromIndex = 0) {
    if (fromIndex < 0) {
      fromIndex = this._length + fromIndex;
    }
    fromIndex = Math.max(0, fromIndex);
    if (fromIndex >= this._length) return -1;
    let current = this.head;
    let index = 0;
    while (current && index < fromIndex) {
      current = current.next;
      index++;
    }
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
  lastIndexOf(searchElement, fromIndex) {
    if (fromIndex === void 0 || fromIndex >= this._length) {
      fromIndex = this._length - 1;
    }
    if (fromIndex < 0) {
      fromIndex = this._length + fromIndex;
    }
    fromIndex = Math.max(0, fromIndex);
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
  find(predicate) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (predicate(current.value, index, this)) {
        return current.value;
      }
      current = current.next;
      index++;
    }
    return void 0;
  }
  /**
   * Returns the index of the first element that satisfies the provided testing function
   */
  findIndex(predicate) {
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
  findLast(predicate) {
    let lastMatchingValue = void 0;
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
  findLastIndex(predicate) {
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
  forEach(callbackFn) {
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
  map(callbackFn) {
    const result = new _LinkedList();
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
  filter(predicate) {
    const result = new _LinkedList();
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
  reduce(callbackFn, initialValue) {
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
  reduceRight(callbackFn, initialValue) {
    const arr = this.toArray();
    return arr.reduceRight((acc, value, index) => {
      return callbackFn(acc, value, index, this);
    }, initialValue);
  }
  /**
   * Tests whether all elements pass the test
   */
  every(predicate) {
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
  some(predicate) {
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
  flatMap(callbackFn) {
    const result = new _LinkedList();
    let current = this.head;
    let index = 0;
    while (current) {
      const mappedValue = callbackFn(current.value, index, this);
      if (Array.isArray(mappedValue)) {
        mappedValue.forEach((item) => result.push(item));
      } else if (mappedValue instanceof _LinkedList) {
        let node = mappedValue.getHead();
        while (node) {
          result.push(node.value);
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
  slice(start = 0, end) {
    const result = new _LinkedList();
    if (start < 0) {
      start = this._length + start;
    }
    if (end === void 0) {
      end = this._length;
    } else if (end < 0) {
      end = this._length + end;
    }
    start = Math.max(0, start);
    end = Math.min(this._length, end);
    if (start >= end) return result;
    let current = this.head;
    let index = 0;
    while (current && index < start) {
      current = current.next;
      index++;
    }
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
  concat(...lists) {
    const result = new _LinkedList();
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    lists.forEach((list) => {
      if (list instanceof _LinkedList) {
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
  toSpliced(start, deleteCount, ...items) {
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
  sort(compareFn) {
    if (this._length <= 1) return this;
    const arr = this.toArray();
    arr.sort(compareFn);
    this.head = null;
    this.tail = null;
    this._length = 0;
    arr.forEach((item) => this.push(item));
    return this;
  }
  /**
   * Reverses the elements of the list in place
   */
  reverse() {
    if (this._length <= 1) return this;
    let prev = null;
    let current = this.head;
    let next = null;
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
  toSorted(compareFn) {
    return this.clone().sort(compareFn);
  }
  /**
   * Returns a new reversed linked list
   */
  toReversed() {
    return this.clone().reverse();
  }
  /**
   * Sorts the elements of the list numerically
   */
  numericSort() {
    if (this._length <= 1) return this;
    const arr = this.toArray();
    arr.sort((a, b) => {
      return Number(a) - Number(b);
    });
    this.head = null;
    this.tail = null;
    this._length = 0;
    arr.forEach((item) => this.push(item));
    return this;
  }
  /**
   * Sorts the elements of the list randomly
   */
  randomSort() {
    if (this._length <= 1) return this;
    const arr = this.toArray();
    arr.sort(() => Math.random() - 0.5);
    this.head = null;
    this.tail = null;
    this._length = 0;
    arr.forEach((item) => this.push(item));
    return this;
  }
  //--------------------------------------------------------------------------
  // ADVANCED OPERATIONS
  //--------------------------------------------------------------------------
  /**
   * Copies part of the list to another location in the same list
   */
  copyWithin(target, start, end) {
    if (this._length <= 1) return this;
    const arr = this.toArray();
    arr.copyWithin(target, start, end);
    return _LinkedList.from(arr);
  }
  /**
   * Creates a new linked list with all sub-array elements concatenated
   */
  flat(depth = 1) {
    const result = new _LinkedList();
    const flatten = (item, currentDepth) => {
      if (Array.isArray(item) && currentDepth < depth) {
        item.forEach((subItem) => flatten(subItem, currentDepth + 1));
      } else if (item instanceof _LinkedList && currentDepth < depth) {
        let current2 = item.getHead();
        while (current2) {
          flatten(current2.value, currentDepth + 1);
          current2 = current2.next;
        }
      } else {
        result.push(item);
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
  with(index, value) {
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
  toString() {
    if (!this.head) return "";
    const values = [];
    let current = this.head;
    while (current) {
      values.push(String(current.value));
      current = current.next;
    }
    return values.join(",");
  }
  /**
   * Joins all elements of the linked list into a string
   */
  join(separator = ",") {
    if (!this.head) return "";
    const values = [];
    let current = this.head;
    while (current) {
      values.push(String(current.value));
      current = current.next;
    }
    return values.join(separator);
  }
  /**
   * Spreads the linked list into an array
   */
  toArray() {
    const result = [];
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
  clone() {
    return _LinkedList.from(this.toArray());
  }
  /**
   * Returns a LinkedList Iterator object that contains the keys
   */
  keys() {
    const indexes = [];
    for (let i = 0; i < this._length; i++) {
      indexes.push(i);
    }
    return indexes[Symbol.iterator]();
  }
  /**
   * Returns a LinkedList Iterator object that contains [key, value] pairs
   */
  entries() {
    const entries = [];
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
  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
};
var min = (list) => {
  if (!list.length) return void 0;
  const arr = list.toArray();
  if (arr.length === 0) return void 0;
  return arr.reduce((min2, current) => current < min2 ? current : min2, arr[0]);
};
var max = (list) => {
  if (!list.length) return void 0;
  const arr = list.toArray();
  if (arr.length === 0) return void 0;
  return arr.reduce((max2, current) => current > max2 ? current : max2, arr[0]);
};
function homemadeMin(list, compareFn) {
  if (!list.length) return void 0;
  if (!(list instanceof LinkedList)) return void 0;
  const arr = list.toArray();
  if (arr.length === 0) return void 0;
  let minValue = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (compareFn) {
      if (compareFn(arr[i], minValue) < 0) {
        minValue = arr[i];
      }
    } else if (arr[i] < minValue) {
      minValue = arr[i];
    }
  }
  return minValue;
}
function homemadeMax(list, compareFn) {
  if (!list.length) return void 0;
  if (!(list instanceof LinkedList)) return void 0;
  const arr = list.toArray();
  if (arr.length === 0) return void 0;
  let maxValue = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (compareFn) {
      if (compareFn(arr[i], maxValue) > 0) {
        maxValue = arr[i];
      }
    } else if (arr[i] > maxValue) {
      maxValue = arr[i];
    }
  }
  return maxValue;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LinkedList,
  homemadeMax,
  homemadeMin,
  max,
  min
});
