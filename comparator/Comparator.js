export default class Comparator {
  constructor(compareFunction) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  // default comparison function. Assumts that "a" and "b" are strings or numbers
  static defaultCompareFunction(a, b) {
    if (a == b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  // Checks if two variables are equal
  equal(a, b) {
    return this.compare(a, b) === 0;
  }

  //  Checks if variable "a" is less than "b"
  lessThan(a, b) {
    return this.compare(a, b) < 0;
  }

  //  Checks if variable "a" is greater than "b"
  greaterThan(a, b) {
    return this.compare(a, b) > 0;
  }

  // Checks if variable "a" is less than or equal to "b"
  lessThanOrEqual(a, b) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  // Checks if variable "a" is greater than or equal to "b"
  greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  // reverses the comparison order
  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }
}
