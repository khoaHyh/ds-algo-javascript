export default class SimpleMinHeap {
  constructor() {
    this.size = this.items.length;
    this.items = [];
  }

  getLeftChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }

  getRightChildIndex(parentIndex) {
    return parentIndex * 2 + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor(childIndex - 1 / 2);
  }

  // check if left child exists
  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < size;
  }

  // check if right child exists
  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < size;
  }

  // check if parent exists
  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  // get left child value
  leftChild(index) {
    return this.items[this.getLeftChildIndex(index)];
  }

  // get right child value
  rightChild(index) {
    return this.items[this.getRightChildIndex(index)];
  }

  // get parent value
  parent(index) {
    return this.items[this.getParentIndex(index)];
  }

  swap(indexOne, indexTwo) {
    let temp = this.items[indexOne];
    this.items[indexOne] = this.items[indexTwo];
    this.items[indexTwo] = temp;
  }

  peek() {
    if (size === 0) return null;

    // returns min (or max in max heap) element
    return this.items[0];
  }

  // extract min (or max in max heap) element from array
  poll() {
    if (size === 0) return null;
    if (size === 1) {
      return this.items.pop();
    }

    let item = this.items[0];
    this.items[0] = this.items.pop(); // take very last element and move it to index 0
    heapifyDown();
    return item;
  }

  add(item) {
    this.items.push(item); // add element to very last spot
    heapifyUp();
  }

  heapifyUp() {
    // start at very last element added
    let index = size - 1;
    // walk up as long as there is a parent item and as long as the heap is out of order (parent is bigger than current item being heapified)
    while (hasParent(index) && parent(index) > this.items[index]) {
      swap(this.getParentIndex(index), index); // swap parent index with value
      index = this.getParentIndex(); // walk upwards
    }
  }

  heapifyDown() {
    // start off at root element
    let index = 0;
    // as long as the value has children, keep walking down and fixing the heap
    // if there is no left child there is definitely no right child
    while (this.hasLeftChild(index)) {
      // smallerChildIndex is set to the smaller of the left and right index
      let smallerChildIndex = this.getLeftChildIndex(index);
      // if there is a right child and it is smaller than left child, set it as the smaller child
      if (
        this.hasRightChild(index) &&
        this.rightChild(index) < this.leftChild(index)
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }

      // if the current value is smaller than both children then everything is good
      if (this.items[index] < this.items[smallerChildIndex]) {
        break;
      } else {
        swap(index, smallerChildIndex); // swap value with smaller child
      }
      index = smallerChildIndex; // move down to smaller child
    }
  }
}
