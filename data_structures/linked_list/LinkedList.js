class Node {
  constructor(value, next = null) {}
}

class SimpleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(data) {
    let newNode = new Node(data);

    // if there is no head, make the new node the head and tail
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    // make previous tail point to new appended node and make the new tail the appended node
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  prepend(data) {
    // make new node point to the previous head then make it the new head
    let newNode = new Node(data, this.head);
    this.head = newNode;

    // if there is no existing tail, make the new node the tail
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  find({ value = undefined, callback = undefined }) {
    if (!this.head) return null;

    let currNode = this.head;

    while (currNode) {
      // if callback is specified then try to find node by callback
      if (callback && callback(currNode.value)) return currNode;

      // if value is specified then try to compare by value
      if (value && currNode.value === value) return currNode;

      currNode = currNode.next;
    }

    return null;
  }

  delete(data) {
    if (!this.head) return null;

    let deletedNode = null;

    // if the head is to be deleted, set the next pointer of the current head to be the new head
    if (this.head.value === data) {
      deletedNode = this.head;
      this.head = this.head.next;
      return deletedNode;
    }

    let currNode = this.head;

    // traverse down the linked list to find the element to be deleted
    while (currNode.next) {
      if (currNode.next.value === data) {
        deletedNode = currentNode.next;
        currNode.next = currNode.next.next; // set the next pointer to point the node one over the node to be deleted
        return deletedNode;
      }

      // traverse one node over
      currNode = currNode.next;
    }

    // By the end of the while loop above, if currNode.next points to null AND
    // the desired value to delete is the tail, make the currNode the new tail
    if (this.tail.value === data && !currNode.next) {
      this.tail = currNode;
    }

    return deletedNode;
  }

  reverse() {
    if (!this.head) {
      throw new Error("Unable to reverse Linked List because it is empty.");
    }

    let currNode = this.head;
    let nextNode = null;
    let prevNode = null;

    while (currNode) {
      // save reference to next node and reverse the current "next" reference to the previous node
      nextNode = currNode.next;
      currNode.next = prevNode;

      // move saved nodes forward
      prevNode = currNode;
      currNode = nextNode;
    }

    // reset head and tail
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
