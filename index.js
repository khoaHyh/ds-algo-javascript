import BinarySearchTree from "./data_structures/tree/BinarySearchTree.js";

function run() {
  const bst = new BinarySearchTree(5);
  bst.insert(5);
  bst.insert(2);
  bst.insert(4);
  bst.insert(7);
  bst.insert(5);
  bst.insert(6);
  bst.insert(20);
  bst.insert(2);
  bst.insert(17);
  console.log(bst.get(20));

  // console.log("starting traversal");
  // bst.traverseAscOrder();
  // console.log("end traversal");
}

run();
