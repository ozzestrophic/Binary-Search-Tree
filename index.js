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
    if (node === null) return;

    if (key > node.data) {
      node.right = this.delete(key, node.right);
      console.log("right");
      return node;
    } else if (key < node.data) {
      node.left = this.delete(key, node.left);
      console.log("left");
      return node;
    }

    if (node.data === key) {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
    }
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
    if (arr1[i] && arr2[j] && arr1[i] < arr2[j]) {
      sortedArray.push(arr1[i]);
      i++;
    } else if (arr1[i] && arr2[j] && arr1[i] > arr2[j]) {
      sortedArray.push(arr2[j]);
      j++;
    } else if (!arr1[i]) {
      sortedArray.push(arr2[j]);
      j++;
    } else {
      sortedArray.push(arr1[i]);
      i++;
    }
  }

  return sortedArray;
}

array1 = [1, 2, 3, 4, 5, 6, 8, 7];

const myBinary = new BinaryTree();
myBinary.insert(5);
myBinary.insert(2);
myBinary.insert(3);
myBinary.insert(4);
myBinary.insert(6);
myBinary.insert(1);

myBinary.delete(1);

prettyPrint(myBinary.root);
