class Node {
  constructor(data) {
    this.data = data || null;
    this.right = null;
    this.left = null;
  }
}

class BinaryTree {
  constructor(array) {
    this.root = this.buildTree(array);
  }
  buildTree(array) {
    // sort array first

    function buildTreeInside(array, start = 0, end = array.length - 1) {
      if (start > end) return null;

      const mid = Math.floor((end + start) / 2);

      const newNode = new Node(array[mid]);
      newNode.left = buildTreeInside(array, start, mid - 1);
      newNode.right = buildTreeInside(array, mid + 1, end);

      return newNode;
    }
    return buildTreeInside(array);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

array1 = [1, 2, 3, 4, 5, 6, 7, 8];

const myBinary = new BinaryTree(array1);

prettyPrint(myBinary.root);
