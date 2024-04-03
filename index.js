import isEqual from "lodash/isEqual.js";
import BinarySearchTree from "./data_structures/tree/BinarySearchTree.js";

function customSort(array) {
  return array.sort((a, b) => a - b);
}

function run() {
  const bst = new BinarySearchTree();

  const valuesToInsert = [5, 5, 2, 4, 7, 5, 6, 20, 2, 17];

  valuesToInsert.forEach((value) => {
    bst.insert(value);
  });

  const ascTraversalResult = bst.traverse("asc");
  console.log("traversal result:", ascTraversalResult);

  const sortedValuesToInsert = customSort(valuesToInsert);
  console.log("valuesToInsert:", sortedValuesToInsert);
  console.log(
    "values === result?",
    isEqual(valuesToInsert, ascTraversalResult),
  );
}

run();
