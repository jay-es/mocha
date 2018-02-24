export default class Cell {
  constructor(n, boardSize) {
    this.boardSize = boardSize;
    this.value = n;
    this.fillPossibilities(!n);
  }

  fillPossibilities(bool) {
    for (let i = 1; i <= this.boardSize; i += 1) {
      this[i] = bool;
    }
  }

  getExclusivePossibility() {
    if (this.value) return 0;

    let num = 0;

    for (let i = 1; i <= this.boardSize; i += 1) {
      if (this[i]) {
        if (num) return 0;
        num = i;
      }
    }

    return num;
  }

  get possibilities() {
    const possibilities = [null];
    for (let i = 1; i <= this.boardSize; i += 1) {
      possibilities[i] = this[i];
    }
    return possibilities;
  }
}
