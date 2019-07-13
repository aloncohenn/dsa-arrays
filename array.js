const Memory = require('./Memory-class');
const memory = new Memory();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  push(value) {
    this._resize(this.length + 1);
    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of Memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    return memory.get(this.ptr + index);
  }

  pop() {
    if (this.length == 0) {
      throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }
}

function main() {
  Array.SIZE_RATIO = 3;
  // Create an instance of the Array class
  let arr = new Array();
  // Add an item to the array
  arr.push('tauhida');
  arr.push(1);
  arr.push(1);
  arr.push(1);
  console.log(arr);
  console.log(arr.get(0));
  console.log(arr.get(3));
}

main();

const URLify = str => {
  // O of n2
  // return str.split(' ').join('%20');

  // O(n)
  return str.replace(' ', '%20');
};

console.log(URLify('tauheeda parveen'));

// I: array of numbers
// O: return the array with all numbers less than 5 removed
// P: iterate through each number
// O (n)
// binary search - sorted array?

const filter = arr => {
  let filteredArr = [];
  for (let i = 0; i < arr.length; i++) {
    arr[i] >= 5 ? filteredArr.push(arr[i]) : null;
  }
  return filteredArr;
};

const testArr = [1, 2, 5, 70, 55, 43, 3, 2];

const recurFilter = (arr, filteredArr = []) => {
  if (arr.length === 0) {
    return filteredArr;
  }

  if (arr[0] >= 5) {
    filteredArr.push(arr[0]);
    return recurFilter(arr.slice(1), filteredArr);
  }

  return recurFilter(arr.slice(1), filteredArr);
};

const testArr2 = [4, 8, -3, 5, -2, 1];

console.log(recurFilter(testArr));

const highestSum = (arr, currentMax = 0) => {
  let currentSum = arr[0] + arr[1];
  if (arr.length === 1) {
    return currentMax;
  }

  if (currentSum > currentMax) {
    currentMax = currentSum;
  }

  return highestSum(arr.slice(1), currentMax);
};

console.log(highestSum(testArr2));

// set first arr, find the middle point number
// check middle num against secondArr linearly

const mergeArrays = (arrOne, arrTwo, mergedArr = []) => {
  let longest = arrOne.length > arrTwo.length ? arrOne : arrTwo;
  if (longest.length === 0) {
    return mergedArr;
  }

  let arrOneNum = 0;
  let arrTwoNum = 0;

  for (let i = 0; i < arrOne.length; i++) {
    arrOneNum = arrOne[i];
  }

  for (let i = 0; i < arrTwo.length; i++) {
    arrOneNum = arrTwo[i];
  }

  if (arrOneNum < arrTwoNum) {
    mergedArr.push(arrOneNum, arrTwoNum);
    return mergeArrays(arrOne.slice(1), arrTwo.slice(1), mergedArr);
  }
};

console.log();

// let midPoint = arrTwo.length / 2;

// if (arrOne[0] < arrTwo[midPoint]) {
//   mergedArr.push(arrOne[0])
//   return mergeArrays(arrOne.slice(1), arrTwo, mergedArr);
// }

// return from func when longest array length is 0

// find longest between arr1 and arr2

const firstArr = [1, 3, 6, 8, 11];
const secondArr = [2, 3, 5, 8, 9, 10];

// push rest of indexes of array that still has a length, into the merged array

// shortest arr is 0, take the leftover indexes in the long array, and push them onto the end of our merged array

const merge = (
  arr1,
  arr2,
  mergedArr = [],
  currentMax = 0,
  longest = [],
  shortest = []
) => {
  shortest = arr1.length < arr2.length ? arr1 : arr2;
  longest = arr1.length > arr2.length ? arr1 : arr2;

  if (shortest.length === 0) {
    let finalArr = [];
    finalArr = mergedArr.concat(longest).sort((a, b) => a - b);
    return finalArr;
  }

  if (arr1[0] >= currentMax) {
    currentMax = arr1[0];
    mergedArr.push(arr1[0]);
  } else {
    mergedArr.pop();
    mergedArr.push(arr1[0], currentMax);
  }

  if (arr2[0] >= currentMax) {
    currentMax = arr2[0];
    mergedArr.push(arr2[0]);
  } else {
    mergedArr.pop();
    mergedArr.push(arr2[0], currentMax);
  }

  return merge(
    arr1.slice(1),
    arr2.slice(1),
    mergedArr,
    currentMax,
    longest.slice(1),
    shortest.slice(1)
  );
};

console.log(firstArr.concat(secondArr).sort((a, b) => a - b));

function Products(arr, output = [], index = 0) {
  if (arr.length === index) {
    return output;
  }

  let total = 1;
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) {
      total *= arr[i];
    }
  }
  output.push(total);
  index++;
  return Products(arr, output, index);
}

console.log(Products([1, 3, 9, 4]));
