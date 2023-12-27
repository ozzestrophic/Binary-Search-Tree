class Node {
  constructor(data) {
    this.data = data || null;
    this.right = null;
    this.left = null;
  }
}

function BinaryTree(array, start = 0, end = array.length - 1) {
  // logic
  if (start > end) return null;
}
