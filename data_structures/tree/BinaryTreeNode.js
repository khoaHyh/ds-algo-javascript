export default class BinaryTreeNode {
  constructor(value) {
    this.value = value ?? null;
    this.left = null;
    this.right = null;
  }

  isLeaf() {
    if (this.left == null && this.right == null) {
      return true;
    }
    return false;
  }
}
