class Node {
  constructor(data) {
    this.data = data;
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

    if (!array) {
      return null;
    }
    let sortedArray = sortArray(array);
    function buildTreeInside(array, start = 0, end = array.length - 1) {
      if (start > end) return null;

      const mid = Math.floor((end + start) / 2);

      const newNode = new Node(array[mid]);
      newNode.left = buildTreeInside(array, start, mid - 1);
      newNode.right = buildTreeInside(array, mid + 1, end);

      return newNode;
    }
    return buildTreeInside(sortedArray);
  }

  insert(key, node = this.root) {
    if (this.root === null) {
      this.root = new Node(key);
      return;
    }

    if (node === null) {
      node = new Node(key);
      return node;
    }

    if (key > node.data) {
      node.right = this.insert(key, node.right);
    } else if (key < node.data) {
      node.left = this.insert(key, node.left);
    }
    return node;
  }

  delete(key, node = this.root) {
    if (node === null) return null;

    if (key > node.data) {
      node.right = this.delete(key, node.right);
      console.log("right");
      return node;
    } else if (key < node.data) {
      node.left = this.delete(key, node.left);
      console.log("left");
      return node;
    }
    function lookForLeaf(succ, parent) {
      if (succ.left === null) {
        let key = succ.data;
        parent.left = succ.right;
        return key;
      }

      let newKey = lookForLeaf(succ.left, succ);
      return newKey;
    }

    if (node.left === null) {
      return node.right;
    } else if (node.right === null) {
      return node.left;
    }
    if (node.right.left === null) {
      let temp = node.left;
      node = node.right;
      node.left = temp;
      return node;
    }

    node.data = lookForLeaf(node.right.left, node.right);
    return node;
  }

  find(key, node = this.root) {
    if (!node) return null;
    if (key === node.data) return node;

    if (key > node.data) {
      return this.find(key, node.right);
    } else if (key < node.data) {
      return this.find(key, node.left);
    }
  }

  levelOrder(func) {
    if (this.root === null) return;

    const array = [];

    const q = [];
    q.push(this.root);

    while (q.length !== 0) {
      const currentNode = q.shift();

      if (func) {
        func(currentNode);
      } else {
        array.push(currentNode.data);
      }
      if (currentNode.left) q.push(currentNode.left);
      if (currentNode.right) q.push(currentNode.right);
    }
    if (array.length !== 0) return array;
  }

  levelOrderRecursive(func, q = [this.root], array = []) {
    const currentNode = q.shift();
    if (!currentNode) return;
    if (func) {
      func(currentNode);
    } else {
      array.push(currentNode.data);
    }
    if (currentNode.left) q.push(currentNode.left);
    if (currentNode.right) q.push(currentNode.right);

    if (q.length !== 0) {
      this.levelOrderRecursive(func, q, array);
    }
    if (array.length !== 0) return array;
  }

  // inOrder preOrder postOrder
  inOrder(func, node = this.root, array = []) {
    if (!node) return;
    this.inOrder(func, node.left, array);
    if (func) {
      func(node);
    } else {
      array.push(node.data);
    }
    this.inOrder(func, node.right, array);
    return array;
  }
  preOrder(func, node = this.root, array = []) {
    if (!node) return;
    if (func) {
      func(node);
    } else {
      array.push(node.data);
    }
    this.preOrder(func, node.left, array);
    this.preOrder(func, node.right, array);
    return array;
  }
  postOrder(func, node = this.root, array = []) {
    if (!node) return;
    this.postOrder(func, node.left, array);
    this.postOrder(func, node.right, array);
    if (func) {
      func(node);
    } else {
      array.push(node.data);
    }
    return array;
  }

  height(node = this.root, h = 0) {
    if (!node) return h;
    if (!node.right && !node.left) {
      return h;
    }

    const hLeft = this.height(node.left);
    const hRight = this.height(node.right);
    if (hLeft >= hRight) {
      h = hLeft;
    } else {
      h = hRight;
    }
    h++;
    return h;
  }

  depth(node, currentNode = this.root, h = 0) {
    if (!node) return 0;

    if (node.data === currentNode.data) return h;

    h++;
    if (node.data > currentNode.data) {
      return this.depth(node, currentNode.right, h);
    } else if (node.data < currentNode.data) {
      return this.depth(node, currentNode.left, h);
    }
  }

  isBalanced(node = this.root, balanced = true) {
    if (!node || !balanced) return balanced;

    const leftHeight = this.height(node.left, balanced);
    const rightHeight = this.height(node.right, balanced);

    if ([0, 1, -1].includes(leftHeight - rightHeight)) {
      balanced = this.isBalanced(node.left);
      balanced = this.isBalanced(node.right);
    } else {
      balanced = false;
    }
    return balanced;
  }

  rebalance() {
    if (this.isBalanced === true) {
      return;
    }
    const array = this.inOrder();

    const newRoot = this.buildTree(array);

    this.root = newRoot;
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

function sortArray(myArray) {
  if (myArray.length == 1) return myArray;

  let arr1 = sortArray(myArray.splice(0, Math.floor(myArray.length / 2)));
  let arr2 = sortArray(myArray);

  let sortedArray = [];

  for (let i = 0, j = 0; i < arr1.length || j < arr2.length; ) {
    if (arr1[i] !== undefined && arr2[j] !== undefined && arr1[i] < arr2[j]) {
      sortedArray.push(arr1[i]);
      i++;
    } else if (
      arr1[i] !== undefined &&
      arr2[j] !== undefined &&
      arr1[i] > arr2[j]
    ) {
      sortedArray.push(arr2[j]);
      j++;
    } else if (arr1[i] === undefined) {
      sortedArray.push(arr2[j]);
      j++;
    } else {
      sortedArray.push(arr1[i]);
      i++;
    }
  }

  return sortedArray;
}

function printValues(node) {
  console.log(node.data);
}

function randomArray() {
  const array = [];
  for (let i = 0; i < 10; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
}

const array = randomArray();
console.log(array);
const randomBinary = new BinaryTree(array);
// prettyPrint(randomBinary.root);
console.log("The balance state is ", randomBinary.isBalanced());

console.log(randomBinary.levelOrder());
console.log("inOrder");
console.log(randomBinary.inOrder());
console.log("preOrder");
console.log(randomBinary.preOrder());
console.log("postOrder");
console.log(randomBinary.postOrder());

randomBinary.insert(110);
randomBinary.insert(120);
randomBinary.insert(117);
randomBinary.insert(108);
randomBinary.insert(115);

console.log("The balance state is ", randomBinary.isBalanced());
randomBinary.rebalance();
console.log("The balance state is ", randomBinary.isBalanced());

console.log(randomBinary.levelOrder());
console.log("inOrder");
console.log(randomBinary.inOrder());
console.log("preOrder");
console.log(randomBinary.preOrder());
console.log("postOrder");
console.log(randomBinary.postOrder());
