# LinkedList

A TypeScript implementation of a linked list with Array-like methods.

## Overview

This LinkedList class provides a versatile, generic implementation of a singly linked list with an API that closely mirrors JavaScript's native Array. It combines the performance benefits of linked lists with the familiar interface of JavaScript arrays.

## Installation

```bash
npm install knust-compeng-dsa-linkedlist
```

## Import

```typescript
import { LinkedList } from "knust-compeng-dsa-linkedlist";
```

## Key Features

- **Array-like API**: Familiar methods from JavaScript Arrays (push, pop, map, filter, etc.)
- **TypeScript Support**: Full generic type support for type safety
- **Performance**: Efficient insertions and deletions, especially at the beginning and end of the list
- **Functional Methods**: Support for map, filter, reduce, and other functional programming methods
- **Utility Functions**: Additional helpers for common operations

## Basic Usage

```typescript
// Create a new LinkedList
const list = new LinkedList<number>(1, 2, 3);

// Add elements
list.push(4, 5); // [1, 2, 3, 4, 5]
list.unshift(0); // [0, 1, 2, 3, 4, 5]

// Remove elements
const last = list.pop(); // [0, 1, 2, 3, 4], last = 5
const first = list.shift(); // [1, 2, 3, 4], first = 0

// Access elements
const middle = list.at(2); // 3

// Transform the list
const doubled = list.map((x) => x * 2); // [2, 4, 6, 8]
const evens = list.filter((x) => x % 2 === 0); // [2, 4]

// Chain operations
const result = list
  .filter((x) => x > 1)
  .map((x) => x * 10)
  .sort((a, b) => b - a);
```

## Creation Methods

```typescript
// Create empty list
const empty = new LinkedList<string>();

// Create with initial values
const withValues = new LinkedList<number>(1, 2, 3);

// Create from array
const fromArray = LinkedList.fromArray([1, 2, 3]);

// Create from array-like or iterable
const fromString = LinkedList.from("hello"); // Characters as list items
```

## Modification Methods

### Adding and Removing Elements

```typescript
// Add elements
list.push(4, 5); // Adds to end
list.unshift(0); // Adds to beginning

// Remove elements
list.pop(); // Removes from end
list.shift(); // Removes from beginning
list.delete(2); // Removes at index 2

// Complex operations
list.splice(1, 2, 5, 6); // Removes 2 items at index 1, inserts 5 and 6
```

### Transforming Lists

```typescript
// Create modified lists
const sliced = list.slice(1, 3); // Extract section (non-mutating)
const spliced = list.toSpliced(1, 2, 5, 6); // Splice operation (non-mutating)
const sorted = list.toSorted((a, b) => a - b); // Sort (non-mutating)
const reversed = list.toReversed(); // Reverse (non-mutating)

// Modify current list (mutating)
list.sort((a, b) => a - b);
list.reverse();

// Specialized sorting
list.numericSort(); // Sort as numbers
list.randomSort(); // Shuffle elements
```

## Iteration and Higher-Order Functions

```typescript
// Iteration
list.forEach((value, index) => {
  console.log(`Element ${index}: ${value}`);
});

// Transformation
const doubled = list.map((x) => x * 2);
const filtered = list.filter((x) => x > 5);

// Reduction
const sum = list.reduce((total, current) => total + current, 0);

// Testing
const allEven = list.every((x) => x % 2 === 0);
const hasBigNumbers = list.some((x) => x > 100);

// Advanced operations
const flatMapped = list.flatMap((x) => [x, x * 2]);
```

## Searching

```typescript
// Basic search
const hasThree = list.includes(3);
const indexOfThree = list.indexOf(3);
const lastIndexOfThree = list.lastIndexOf(3);

// Advanced search
const firstEven = list.find((x) => x % 2 === 0);
const indexOfFirstEven = list.findIndex((x) => x % 2 === 0);
const lastEven = list.findLast((x) => x % 2 === 0);
const indexOfLastEven = list.findLastIndex((x) => x % 2 === 0);
```

## Advanced Operations

```typescript
// Create list with modified value at index
const modified = list.with(2, 100); // Replace value at index 2 with 100

// Copy part of the list to another position
list.copyWithin(0, 2, 4); // Copy items at index 2-3 to position 0

// Flatten nested structures
const nested = new LinkedList(1, [2, 3], new LinkedList(4, 5));
const flattened = nested.flat();
```

## Utility Methods

```typescript
// Conversion
const array = list.toArray();
const string = list.toString();
const joined = list.join(", ");

// Clone
const copy = list.clone();

// Static min/max helpers
const minimum = LinkedList.min(numericList);
const maximum = LinkedList.max(numericList);
```

## Performance Considerations

- **Efficient Operations**: `push()`, `pop()`, `shift()`, `unshift()` are O(1) operations
- **Linear-time Operations**: Operations like `at(index)` and `delete(index)` require traversal (O(n))
- **Conversion Cost**: Some methods temporarily convert to arrays

## When to Use LinkedList vs Array

- **Use LinkedList when**:

  - You frequently add/remove items from the beginning
  - You need to insert elements into the middle often
  - You want efficient push/pop operations at both ends

- **Use Array when**:
  - You need frequent random access by index
  - Memory efficiency is critical
  - You perform many in-place operations

## License

MIT
