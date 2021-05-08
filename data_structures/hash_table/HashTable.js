import LinkedList from "../linked_list/LinkedList";

// Hash table (or Hash Map) size directly affects on the number of collisions
// The bigger the hash table size  the less collisions you'll get
// For demonstration purposes the hash table size is small to show how collisions
// are being handle.
const defaultHashTableSize = 32;

export default class HashTable {
  constructor(hashTableSize = defaultHashTableSize) {
    // Create hash table of certain size and fill each buket with empty linked list
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList());

    // Just to keep track of all actual keys in a fast way
    this.keys = {};
  }

  // For simplicity reasons we will just use character codes sum of all characters of
  // the key to calculate the hash.
  // But you may also use more sophisticated approaches like polynomial string hash to reduce the number of collisions:
  // hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
  // where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
  // PRIME is just any prime number like 31
  hash(key) {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    );

    // Reduce hash number so it would fit hash table size
    return hash % this.buckets.length;
  }

  set(key, value) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key,
    });

    if (!node) {
      // insert new node
      bucketLinkedList.append({ key, value });
    } else {
      // update value of existing node
      node.value.value = value;
    }
  }

  delete(key) {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key,
    });

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  get(key) {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key,
    });

    return node ? node.value.value : undefined;
  }

  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getKeys() {
    return Object.keys(this.keys);
  }

  // Get list of all the stored values in the hash table
  getValues() {
    return this.buckets.reduce((values, bucket) => {
      const bucketValues = bucket
        .toArray()
        .map((linkedListNode) => linkedListNode.value.value);
      return values.concat(bucketValues);
    }, []);
  }
}
