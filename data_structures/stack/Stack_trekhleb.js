import LinkedList from "../linked_list/LinkedList";

export default class Stack {
  constructor() {
    // Implement Stack based on LinkedList since these structures
    // are quite similar. Push/pop operations of the Stack are similar
    // to prepend/deleteHead operations of LinkedList.
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.linkedList.head.value;
  }

  // Add new value to the top of the stack (head of linked list in this implementation)
  push(value) {
    this.linkedList.prepend(value);
  }

  // Delete last node added, which is the first node (the head), from the linked list.
  pop() {
    const removedHead = this.linkedList.deletedHead();
    return removedHead ? removedHead.value : null;
  }

  toArray() {
    return this.linkedList
      .toArray()
      .map((linkedListNode) => linkedListNode.value);
  }

  toString(callback) {
    return this.linkedList.toString(callback);
  }
}
