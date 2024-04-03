class BinaryTreeNode {
  constructor(value, left = null, right = null) {
    this.value = value ?? null;
    this.left = left;
    this.right = right;
  }
}

export default class BinarySearchTree {
  constructor(value = null) {
    this.root = value ? new BinaryTreeNode(value) : null;
  }

  stringifyNode(node) {
    return JSON.stringify(node, null, 2);
  }

  insert(value) {
    const newNode = new BinaryTreeNode(value);

    if (this.root == null) {
      this.root = new BinaryTreeNode(value);
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  // Recursively inserts a new node by finding an open branch and inserting it there
  insertNode(currentNode, newNode) {
    if (newNode.value < currentNode.value) {
      if (currentNode.left == null) {
        currentNode.left = newNode;
      } else {
        // traverse to the left node
        this.insertNode(currentNode.left, newNode);
      }
    } else {
      if (currentNode.right == null) {
        currentNode.right = newNode;
      } else {
        // traverse to the right node
        this.insertNode(currentNode.right, newNode);
      }
    }
  }

  get(value) {
    const notFoundMsg = `No nodes found with value '${value}'`;
    if (this.root == null) {
      return notFoundMsg;
    }

    return this.findNode(value, this.root) ?? notFoundMsg;
  }

  findNode(value, currentNode) {
    if (value === currentNode.value) {
      return this.stringifyNode(currentNode);
    } else if (value < currentNode.value) {
      if (currentNode.left == null) {
        return null;
      } else {
        // traverse to the left node
        return this.findNode(value, currentNode.left);
      }
    } else {
      if (currentNode.right == null) {
        return null;
      } else {
        // traverse to the right node
        return this.findNode(value, currentNode.right);
      }
    }
  }

  traverse(order) {
    if (this.root == null) {
      return null;
    }

    switch (order.toLowerCase()) {
      default:
        return this.traverseAscOrder(this.root);
    }
  }

  traverseAscOrder(currentNode) {
    const queue = [];

    if (currentNode.left != null) {
      queue.push(...this.traverseAscOrder(currentNode.left));
    }

    queue.push(currentNode.value);

    if (currentNode.right != null) {
      queue.push(...this.traverseAscOrder(currentNode.right));
    }

    return queue;
  }
}
