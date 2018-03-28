import Cell from './Cell';

export default class CellGroup {
  constructor(cells) {
    this.cells = cells;

    cells.forEach((cell, i) => {
      if (cell.constructor !== Cell) {
        throw new Error('not a Cell');
      }

      this[i] = cells[i];
      this.precludeNum(cell.value);
      cell.ev.on('changeValue', this.precludeNum.bind(this));
    });
  }

  /**
   * グループ内にnがあるかを返す
   * @param {number} n
   * @returns {boolean}
   */
  hasNum(n) {
    return this.cells.some(cell => cell.value === n);
  }

  /**
   * グループ内で唯一nが入る可能性のあるセルを返す
   * @param {number} n
   * @returns {Cell, null}
   */
  getExclusiveCell(n) {
    const filtered = this.getPossibleCells(n);
    return filtered && filtered.length === 1 ? filtered[0] : null;
  }

  /**
   * グループ内でnが入る可能性のあるセルを返す
   * @param {number} n
   * @returns {array, null}
   */
  getPossibleCells(n) {
    if (this.hasNum(n)) return null;

    return this.cells.filter(cell => cell[n]);
  }

  /**
   * セルの値の配列を返す
   * @returns {array}
   */
  getValues() {
    return this.cells.map(cell => cell.value);
  }

  /**
   * グループ内の全セルで、nの可能性をfalseにする
   * @param {number} n
   */
  precludeNum(n) {
    for (let i = 0, max = this.cells.length; i < max; i += 1) {
      this.cells[i][n] = false;
    }
  }
}
