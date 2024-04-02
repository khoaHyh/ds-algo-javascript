import BinaryTreeNode from "./BinaryTreeNode.js";

export default class BinarySearchTree extends BinaryTreeNode {
  constructor(value) {
    super(value);
  }

  insert(value) {
    if (value < this.value) {
      if (this.left == null) {
        this.left = new BinarySearchTree(value);
        console.log("this.left:", this.left);
        return this.left;
      } else {
        const leftChild = this.getLeftChild();
        return leftChild.insert(value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(value);
        console.log("this.right:", this.right);
        return this.right;
      } else {
        const rightChild = this.getRightChild();
        return rightChild.insert(value);
      }
    }
  }

  get(value) {
    if (value < this.value) {
      if (this.left == null) {
        return null;
      } else {
        const leftChild = this.getLeftChild();
        return leftChild.get(value);
      }
    } else if (value === this.value) {
      return this.value;
    } else {
      if (this.right == null) {
        return null;
      } else {
        const rightChild = this.getRightChild();
        return rightChild.get(value);
      }
    }
  }

  getLeftChild() {
    return this.left;
  }

  getRightChild() {
    return this.right;
  }
}
