import BinarySearchTree from "./data_structures/tree/BinarySearchTree.js";

function run() {
  const bst = new BinarySearchTree(5);
  bst.insert(5);
  bst.insert(4);
  bst.insert(7);
  console.log("GET 5", bst.get(5));
}

run();
