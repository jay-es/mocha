import Cell from './Cell';

export default class CellGroup {
  constructor(cells) {
    cells.forEach((cell) => {
      if (cell.constructor !== Cell) {
        throw new Error('not a Cell');
      }
    });

    for (let i = 0, max = cells.length; i < max; i += 1) {
      this[i] = cells[i];
    }

    this.cells = cells;
  }

  hasNum(n) {
    return this.cells.some(cell => cell.value === n);
  }

  getValues() {
    return this.cells.map(cell => cell.value);
  }

  precludeNum(n) {
    for (let i = 0, max = this.cells.length; i < max; i += 1) {
      this.cells[i][n] = false;
    }
  }
}
