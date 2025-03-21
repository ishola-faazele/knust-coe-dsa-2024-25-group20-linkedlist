/**
 * A TypeScript implementation of a linked list with Array-like methods
 */
/**
 * Node class for the LinkedList
 */
declare class Node<T> {
    value: T;
    next: Node<T> | null;
    constructor(value: T);
}
/**
 * LinkedList class with Array-like methods
 */
declare class LinkedList<T> {
    private head;
    private tail;
    private _length;
    constructor(...items: T[]);
    /**
     * Creates a new LinkedList from an array
     */
    static fromArray<T>(array: T[]): LinkedList<T>;
    /**
     * Creates a new LinkedList from an array-like object
     */
    static from<T, U = T>(arrayLike: ArrayLike<T> | Iterable<T>, mapFn?: (v: T, k: number) => U, thisArg?: unknown): LinkedList<U>;
    /**
     * Returns the minimum value in the list
     * @static
     */
    static min<T extends number>(list: LinkedList<T>): T | undefined;
    /**
     * Returns the maximum value in the list
     * @static
     */
    static max<T extends number>(list: LinkedList<T>): T | undefined;
    /**
     * Gets the number of elements in the linked list
     */
    get length(): number;
    /**
     * Gets the first node of the list (for internal use)
     */
    protected getHead(): Node<T> | null;
    /**
     * Gets the last node of the list (for internal use)
     */
    protected getTail(): Node<T> | null;
    /**
     * Returns the element at the specified index
     */
    at(index: number): T | undefined;
    /**
     * Adds one or more elements to the end and returns the new length
     */
    push(...items: T[]): number;
    /**
     * Removes the last element and returns it
     */
    pop(): T | undefined;
    /**
     * Adds one or more elements to the beginning and returns the new length
     */
    unshift(...items: T[]): number;
    /**
     * Removes the first element and returns it
     */
    shift(): T | undefined;
    /**
     * Removes an element at the specified index
     */
    delete(index: number): boolean;
    /**
     * Changes the contents of the list by removing or replacing existing elements
     * and/or adding new elements in place
     */
    splice(start: number, deleteCount?: number, ...items: T[]): LinkedList<T>;
    /**
     * Checks if the list includes a certain element
     */
    includes(searchElement: T, fromIndex?: number): boolean;
    /**
     * Returns the first index at which a given element can be found
     */
    indexOf(searchElement: T, fromIndex?: number): number;
    /**
     * Returns the last index at which a given element can be found
     */
    lastIndexOf(searchElement: T, fromIndex?: number): number;
    /**
     * Returns the first element that satisfies the provided testing function
     */
    find(predicate: (value: T, index: number, list: LinkedList<T>) => unknown): T | undefined;
    /**
     * Returns the index of the first element that satisfies the provided testing function
     */
    findIndex(predicate: (value: T, index: number, list: LinkedList<T>) => unknown): number;
    /**
     * Returns the last element that satisfies the provided testing function
     */
    findLast(predicate: (value: T, index: number, list: LinkedList<T>) => unknown): T | undefined;
    /**
     * Returns the index of the last element that satisfies the provided testing function
     */
    findLastIndex(predicate: (value: T, index: number, list: LinkedList<T>) => unknown): number;
    /**
     * Executes a function for each element in the list
     */
    forEach(callbackFn: (value: T, index: number, list: LinkedList<T>) => void): void;
    /**
     * Creates a new linked list with the results of calling a function
     */
    map<U>(callbackFn: (value: T, index: number, list: LinkedList<T>) => U): LinkedList<U>;
    /**
     * Creates a new linked list with elements that pass the test
     */
    filter(predicate: (value: T, index: number, list: LinkedList<T>) => unknown): LinkedList<T>;
    /**
     * Applies a function against an accumulator and each element
     */
    reduce<U>(callbackFn: (previousValue: U, currentValue: T, currentIndex: number, list: LinkedList<T>) => U, initialValue: U): U;
    /**
     * Applies a function against an accumulator and each element (right to left)
     */
    reduceRight<U>(callbackFn: (previousValue: U, currentValue: T, currentIndex: number, list: LinkedList<T>) => U, initialValue: U): U;
    /**
     * Tests whether all elements pass the test
     */
    every(predicate: (value: T, index: number, list: LinkedList<T>) => unknown): boolean;
    /**
     * Tests whether at least one element passes the test
     */
    some(predicate: (value: T, index: number, list: LinkedList<T>) => unknown): boolean;
    /**
     * Creates a new linked list by applying a function and flattening
     */
    flatMap<U>(callbackFn: (value: T, index: number, list: LinkedList<T>) => U | U[]): LinkedList<U>;
    /**
     * Returns a shallow copy of a portion of the list
     */
    slice(start?: number, end?: number): LinkedList<T>;
    /**
     * Concatenates multiple linked lists or arrays
     */
    concat(...lists: (LinkedList<T> | T[])[]): LinkedList<T>;
    /**
     * Returns a new list with the elements added or removed at the specified index
     */
    toSpliced(start: number, deleteCount?: number, ...items: T[]): LinkedList<T>;
    /**
     * Sorts the elements of the list in place
     */
    sort(compareFn?: (a: T, b: T) => number): LinkedList<T>;
    /**
     * Reverses the elements of the list in place
     */
    reverse(): LinkedList<T>;
    /**
     * Returns a new sorted linked list
     */
    toSorted(compareFn?: (a: T, b: T) => number): LinkedList<T>;
    /**
     * Returns a new reversed linked list
     */
    toReversed(): LinkedList<T>;
    /**
     * Sorts the elements of the list numerically
     */
    numericSort(): LinkedList<T>;
    /**
     * Sorts the elements of the list randomly
     */
    randomSort(): LinkedList<T>;
    /**
     * Copies part of the list to another location in the same list
     */
    copyWithin(target: number, start: number, end?: number): LinkedList<T>;
    /**
     * Creates a new linked list with all sub-array elements concatenated
     */
    flat<U>(depth?: number): LinkedList<U>;
    /**
     * Returns a new LinkedList with a value changed at a specific index
     */
    with(index: number, value: T): LinkedList<T>;
    /**
     * Converts the linked list to a string
     */
    toString(): string;
    /**
     * Joins all elements of the linked list into a string
     */
    join(separator?: string): string;
    /**
     * Spreads the linked list into an array
     */
    toArray(): T[];
    /**
     * Creates a deep copy of the linked list
     */
    clone(): LinkedList<T>;
    /**
     * Returns a LinkedList Iterator object that contains the keys
     */
    keys(): IterableIterator<number>;
    /**
     * Returns a LinkedList Iterator object that contains [key, value] pairs
     */
    entries(): IterableIterator<[number, T]>;
    /**
     * Makes the linked list iterable
     */
    [Symbol.iterator](): Iterator<T>;
}
/**
 * Min/Max utility functions for numeric types
 */
declare const min: <T extends number | bigint | string | Date>(list: LinkedList<T>) => T | undefined;
declare const max: <T extends number | bigint | string | Date>(list: LinkedList<T>) => T | undefined;
/**
 * Home-made min implementation
 */
declare function homemadeMin<T>(list: LinkedList<T>, compareFn?: (a: T, b: T) => number): T | undefined;
/**
 * Home-made max implementation
 */
declare function homemadeMax<T>(list: LinkedList<T>, compareFn?: (a: T, b: T) => number): T | undefined;

export { LinkedList, homemadeMax, homemadeMin, max, min };
