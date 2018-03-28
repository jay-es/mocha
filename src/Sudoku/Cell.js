import { EventEmitter } from 'events';

export default class Cell {
  /**
   * @param {number} n - セルの値
   * @param {number} boardSize - マスの数（通常は9）
   * @param {number} rowNum - 行No.
   * @param {number} colNum - 列No.
   */
  constructor(n, boardSize, rowNum, colNum) {
    this.ev = new EventEmitter();
    this.boardSize = boardSize;
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.setValue(n);
    this.fillPossibilities(!n);
  }

  fillPossibilities(bool) {
    for (let i = 1; i <= this.boardSize; i += 1) {
      this[i] = bool;
    }
  }

  /**
   * そのセルで唯一入る可能性の残っている数字を探す
   * @returns {number}
   */
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

  /**
   * @returns {array}
   */
  get possibilities() {
    const possibilities = [null];
    for (let i = 1; i <= this.boardSize; i += 1) {
      possibilities[i] = this[i];
    }
    return possibilities;
  }

  setValue(n) {
    this.value = n;
    this.fillPossibilities(false);
    this.ev.emit('changeValue', n);
  }
}
