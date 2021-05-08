import LinkedListNode from "./LinkedListNode";
import Comparator from "../../comparator/Comparator";

export default class LinkedList {
  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;

    this.compare = new Comparator(comparatorFunction);
  }

  prepend(value) {
    // make new node the head, and point to the previous head
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    // if there is no tail yet, make new node the tail
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value) {
    const newNode = new LinkedListNode(value);

    // if there is no head yet, make new node a head
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // attach new node to the end of linked list
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // if the head must be deleted then make next node that is different
    // from the head to be a new head
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // if next node must be deleted then make next node to be a next next one
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  find({ value = undefined, callback = undefined }) {
    if (!this.head) {
      return null;
    }

    // tracer (used to traverse linked list)
    let currentNode = this.head;

    while (currentNode) {
      // if callback is specified then try to find node by callback
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // if value is specified then try to compare by value
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      // move tracer to next node
      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail() {
    const deletedTail = this.tail;

    // if there is only one node in the LL
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currentNode = this.head;

    // traverse linked list and delete 'next' link for the node before the last one
    while (currentNode.next) {
      if (!current.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  deletedHead() {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    // if there is a next pointer, make it the new head
    // else make both the current head and tail null
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  // convert array of values to linked list
  fromArray(values) {
    values.forEach((value) => this.append(value));

    return this;
  }

  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  // convert linked list to a string by converting to array and converting each node to a string
  toString(callback) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }

  // reverse linked list
  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      // store next node
      nextNode = currNode.next;

      // change next node of the current node so it would link to the previous one
      currNode.next = prevNode;

      // move prevNode and currNode nodes one step forward
      prevNode = currNode;
      currNode = nextNode;
    }

    // reset head and tail
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
