import LinkedList from "../linked_list/LinkedList";

export default class Queue {
  constructor() {
    // Implement Queue based on LinkedList since the two
    // structures are quite similar. Enqueue/dequeue operations
    // of Queue are similar to append/deleteHead operations of
    // LinkedList
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    if (!this.linkedList.head) {
      return null;
    }

    return this.linkedList.head.value;
  }

  // Add new element to the end of the queue
  enqueue(value) {
    this.linkedList.append(value);
  }

  // Remove at the front of the queue
  dequeue() {
    const removedHead = this.linkedList.deletedHead();
    return removeHead ? removedHead.value : null;
  }

  toString(callback) {
    return this.linkedList.toString(callback);
  }
}
