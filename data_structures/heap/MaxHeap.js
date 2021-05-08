// heap will be contained in a array
//
// helper methods
//
// Get indexes of nearby elements
//  getLeftChildIndex
//  getRightChildIndex
//  getParentIndex
// Find out if nearby elements exist
//  hasLeftChild
//  hasRightChild
//  hasParent
// Simply get value of nearby elements
//  leftChild
//  rightChild
//  parent
//
// Basic operations
//  Swap method
//  Peek
//  Add
//  Poll (delete)
//  HeapifyDown
//  HeapifyUp

//     0
//   1 | 2
// 3 4 | 5 6

export default class SimpleMaxheap {
  constructor() {
    this.items = [];
    this.size = this.items.length;
  }

  getLeftChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }

  getRightChildIndex(parentIndex) {
    return parentIndex * 2 + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.size;
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.size;
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  leftChild(index) {
    return this.items[this.getLeftChildIndex(index)];
  }

  rightChild(index) {
    return this.items[this.getRightChildIndex(index)];
  }

  parent(index) {
    return this.items[this.getParentIndex(index)];
  }

  swap(indexOne, indexTwo) {
    let temp = this.items[indexOne];
    this.items[indexOne] = this.items[indexTwo];
    this.items[indexTwo] = temp;
  }

  peek() {
    if (size === 0) throw new Error("Unable to peek. Heap is empty.");
    return this.items[0];
  }

  add(item) {
    this.items.push(item);
    heapifyUp();
  }

  poll() {
    if (size === 0) throw new Error("Unable to poll. Heap is empty.");
    if (size === 1) {
      return this.items.pop();
    }

    let item = this.items[0];
    this.items[0] = this.items.pop();
    heapifyDown();
    return item;
  }

  heapifyUp() {
    let index = size - 1; // start at the very last element

    while (hasParent(index) && parent(index) < this.items[index]) {
      let parentIndex = this.getParentIndex(index);
      swap(parentIndex, index);
      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0; // start at root element

    // if there is no left child, there's definitely no right child
    while (this.hasLeftChild(index)) {
      // set larger child index to the left child by default
      let largerChildIndex = this.getLeftChildIndex(index);
      // if right child is larger than left child then set the right child as the largerChildIndex
      if (
        this.hasRightChild(index) &&
        this.leftChild(index) < this.rightChild(index)
      ) {
        largerChildIndex = this.getRightChildIndex(index);
      }

      // break out of loop if the current item is larger than the smallest child, else swap
      if (this.items[index] > this.items[largerChildIndex]) {
        break;
      } else {
        swap(largerChildIndex, index);
      }

      // walk downward through the heap
      index = largerChildIndex;
    }
  }
}
