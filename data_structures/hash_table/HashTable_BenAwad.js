// hash function for our hash table
// spreads out keys evenly in table
const hashStringToInt = (s, tableSize) => {
  let hash = 17;

  for (let i = 0; i < s.length; i++) {
    hash = (13 * hash * s.charCodeAt(i)) % tableSize;
  }

  return hash;
};

class HashTable {
  table = new Array(3);
  numItems = 0;

  resize = () => {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach((item) => {
      if (item) {
        item.forEach(([key, value]) => {
          const idx = hashStringToInt(key, newTable.length);

          if (newTable[idx]) {
            newTable[idx].push([key, value]);
          } else {
            newTable[idx] = [[key, value]];
          }
        });
      }
    });

    this.table = newTable;
  };

  // set key value pair in table
  setItem = (key, value) => {
    this.numItems++; // increment number of items in hash table
    const loadFactor = this.numItems / this.table.length; // to measure how full hash table is
    if (loadFactor > 0.8) {
      // resize
      this.resize();
    }

    const idx = hashStringToInt(key, this.table.length);

    // if a value at this index exists, push the key-value pair as an array
    // else this index now holds a 2D array with the first element being the new key-value pair array
    if (this.table[idx]) {
      this.table[idx].push([key, value]);
    } else {
      this.table[idx] = [[key, value]];
    }
  };

  // take key and return value
  getItem = (key) => {
    const idx = hashStringToInt(key, this.table.length);

    if (!this.table[idx]) {
      console.log("No key-value pair exists");
      return null;
    }

    return this.table[idx].find((x) => x[0] === key)[1];
  };

  // delete method added by myself (@khoaHyh)
  deleteItem = (key) => {
    const idx = hashStringToInt(key, this.table.length);

    if (!this.table[idx]) {
      console.log("No key-value pair exists");
      return null;
    }

    // find index of the node in at the hashed index
    const nodeIdx = this.table[idx].findIndex((x) => x[0] === key);
    const deletedNode = this.table[idx][nodeIdx];

    // remove node from hash table
    this.table[idx].splice(nodeIdx, 1);

    // return deleted node
    if (deletedNode) {
      return deletedNode;
    }

    return undefined;
  };
}

const myTable = new HashTable();
myTable.setItem("firstName", "bob");
console.log("Hash table length:", myTable.table.length);
myTable.setItem("lastName", "tim");
console.log("Hash table length:", myTable.table.length);
myTable.setItem("age", 5);
console.log("Hash table length:", myTable.table.length);
myTable.setItem("dob", "1/2/3");
myTable.setItem("algae", "blue");
myTable.setItem("attack", "fire");
myTable.setItem("ace", "in the hole");
myTable.setItem("are", "you");

console.log(myTable.table.length);
console.log(myTable.getItem("firstName"));
console.log(myTable.getItem("lastName"));
console.log(myTable.getItem("age"));
console.log(myTable.table);
console.log(myTable.deleteItem("dob"));
console.log(myTable.table);
