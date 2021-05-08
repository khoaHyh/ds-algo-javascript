// create Node class for Linked List
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

// Create Linked List class for Hash Table
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value) {
    // make new node point to old head then make new node the head
    const newNode = new Node(value, this.head);
    this.head = newNode;

    // if there is no existing tail, make new node the tail
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value) {
    const newNode = new Node(value);

    // if there is no head, which means, the LL is empty, make new node the head and tail
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  find(key) {
    if (!this.head) return null;

    let currNode = this.head;

    while (currNode) {
      // access value property of linked list node with .value then
      // access key property of node.value with .key
      // compare to key in parameter
      if (currNode.value.key === key) return currNode;

      currNode = currNode.next;
    }

    return null;
  }

  delete(value) {
    if (!this.head) throw new Error("Linked List is empty.");

    let deletedNode = null;

    if (this.head.value === value) {
      deletedNode = this.head;
      this.head = this.head.next;
      return deletedNode;
    }

    let currNode = this.head;

    while (currNode.next) {
      if (currNode.next.value === value) {
        deleteNode = curr.next;
        currNode.next = currNode.next.next;
        return deletedNode;
      }

      // traverse to the next node
      currNode = currNode.next;
    }

    if (this.tail.value === value && !currNode.next) {
      this.tail = currNode;
    }

    return deletedNode;
  }

  /** DEBUG **/

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
}

class HashTable {
  constructor(size = 4) {
    this.size = size;
    this.numItems = 0;
    // Initiate hash table as an array with empty linked lists at each index
    this.buckets = Array(size)
      .fill(null)
      .map(() => new LinkedList());
    this.keys = {};
  }

  hash(key) {
    if (!key) return null;
    let hash = 0;
    // perform modular hashing
    for (let i = 0; i < key.length; i++) {
      hash = (31 * hash + key.charCodeAt(i)) % this.size;
    }

    return hash;
  }

  set(key, value) {
    const loadFactor = this.numItems / this.size;
    if (loadFactor === 1) {
      this.resize();
    }

    const hashedKey = this.hash(key);
    this.keys[key] = hashedKey;
    // find the linked list at the specificed hashed index
    const bucketLinkedList = this.buckets[hashedKey];
    // search through the linked list for the node with matching key
    const nodeExists = bucketLinkedList.find(key);

    if (nodeExists) {
      nodeExists.value.value = value;
    } else {
      bucketLinkedList.append({ key, value });
    }

    this.numItems++;
  }

  getNode(key) {
    // find the linked list at the specificed hashed index
    const bucketLinkedList = this.buckets[this.hash(key)];
    // search through the linked list for the node with matching key
    //const node = bucketLinkedList.find({
    //  callback: (nodeValue) => nodeValue.key === key,
    //});
    const node = bucketLinkedList.find(key);

    return node ? node.value : undefined;
  }

  get(key) {
    // find the linked list at the specificed hashed index
    const bucketLinkedList = this.buckets[this.hash(key)];
    // search through the linked list for the node with matching key
    const node = bucketLinkedList.find(key);

    return node ? node.value.value : undefined;
  }

  delete(key) {
    const hashedKey = this.hash(key);
    delete this.keys[key];
    // find the linked list at the specificed hashed index
    const bucketLinkedList = this.buckets[hashedKey];
    // search through the linked list for the node with matching key
    const nodeExists = bucketLinkedList.find(key);

    if (nodeExists) {
      return bucketLinkedList.delete(nodeExists.value);
    }

    return null;
  }

  getKeys() {
    return Object.keys(this.keys);
  }

  resize() {
    const size = this.size * 2;
    const tempTable = new HashTable(size);

    const listOfKeys = this.getKeys();
    // rehash all key-value pairs and set them in the temporary hash table
    for (let i = 0; i < listOfKeys.length; i++) {
      const node = this.getNode(listOfKeys[i]);
      // only set the key-value pair if the node exists
      if (node) {
        tempTable.set(node.key, node.value);
      }
    }

    this.buckets = tempTable.buckets;
    this.size = size;

    return this;
  }

  /** DEBUG **/
  viewNodes() {
    //const array = [];
    //const listOfKeys = this.getKeys();
    //for (let i = 0; i < listOfKeys.length; i++) {
    //  const node = this.get(listOfKeys[i]);
    //  if (node) {
    //    array.push([node.key, node.value]);
    //  }
    //}
    //return array;

    return this.buckets.reduce((values, bucket) => {
      const bucketValues = bucket.toArray();
      return values.concat(bucketValues);
    }, []);
  }
}

const MyHashTable = new HashTable();
MyHashTable.set("Jim", "1234");
MyHashTable.set("Tim", "4321");
MyHashTable.set("Slim", "9876");
console.log(MyHashTable.size);
MyHashTable.delete("Slim");
console.log("get jim", MyHashTable.get("Jim"));
MyHashTable.set("Bob", "32432");
MyHashTable.set("Tom", "3858");
MyHashTable.set("Sally", "1939");
MyHashTable.set("Jill", "9832");
MyHashTable.set("Jackie", "7323");
MyHashTable.set("Lin", "23");
console.log(MyHashTable.size);
console.log(MyHashTable.viewNodes());
console.log(MyHashTable.getNode("Sally"));
