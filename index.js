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
    if (key === node.data) return node;

    if (key > node.data) {
      return this.find(key, node.right);
    } else if (key < node.data) {
      return this.find(key, node.left);
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
myBinary.insert(20);
myBinary.insert(50);
myBinary.insert(40);
myBinary.insert(30);
myBinary.insert(90);
myBinary.insert(100);
myBinary.insert(80);
myBinary.insert(70);
myBinary.insert(60);
myBinary.insert(10);

console.log(myBinary.find(70));

prettyPrint(myBinary.root);
