// https://ui.dev/creating-your-own-array/
// Array is just an object all along. Object with numerical keys
function array() {
  let arr = Object.create(array.prototype);

  // don't allow length property to be enumerable
  Object.defineProperty(arr, "length", {
    value: 0,
    enumerable: false,
    writable: true,
  });

  for (key in arguments) {
    // for every key in the object, make it so that accessing the value by index (numerical index) is possible
    arr[key] = arguments[key];
    // when we loop over the object, we increment by 1 for each item to get the length of the array at the end of the loop
    arr.length += 1;
  }

  return arr;
}

array.prototype.push = function (element) {
  this[this.length] = element;
  this.length++;
  return this.length;
};

array.prototype.pop = function () {
  if (this.length === 0) {
    return;
  }

  const deletedElem = this[this.length - 1];
  delete this[this.length - 1];
  this.length--;
  return deletedElem;
};

// create new array after filtering out elements that don't pass a given test
// specified by a given function
array.prototype.filter = function (callback) {
  let result = array();

  for (let index in this) {
    // focus on index property on prototype
    if (this.hasOwnProperty(index)) {
      const element = this[index];

      // if the condition if truthy, push element into the result array
      if (callback(element, index)) {
        result.push(element);
      }
    }
  }

  return result;
};

// Test using instance of our implementation
const testArr = array("Hello", "Hiya", "Hi", "hellur");

console.log(testArr);
console.log(testArr[0]);
console.log(testArr.push("hey"));
console.log(testArr);
console.log(testArr.pop());
console.log(testArr);
console.log(testArr.filter((value) => value.charAt(0) === "H"));
