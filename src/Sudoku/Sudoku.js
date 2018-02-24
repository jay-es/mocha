import Cell from './Cell';
import CellGroup from './CellGroup';

export default class Sudoku {
  constructor(board) {
    const boardSize = board.length;
    const boxSize = Math.sqrt(boardSize);
    const cells = board.map(arr => arr.map(v => new Cell(v, boardSize)));

    this.rows = cells.map(arr => new CellGroup(arr));
    this.cols = cells.map((row, ri) => new CellGroup(cells.map(col => col[ri])));
    this.boxes = cells.map((v, i) => {
      const baseRow = Math.floor(i / boxSize) * boxSize;
      const baseCol = (i % boxSize) * boxSize;
      return new CellGroup(cells.map((_, j) =>
        cells[baseRow + Math.floor(j / boxSize)][baseCol + (j % boxSize)]));
    });

    this.boardSize = boardSize;
    this.cells = cells;
  }

  fillFirstEmpty() {
    const { rows, boardSize } = this;
    let firstEmptyCell;

    for (let i = 0; i < boardSize; i += 1) {
      firstEmptyCell = rows[i].cells.find(cell => !cell.value);
      if (firstEmptyCell) break;
    }

    firstEmptyCell.value = firstEmptyCell.possibilities.findIndex(v => v);
  }

  getBoard() {
    return this.rows.map(cg => cg.getValues());
  }

  solve() {
    const { rows, cols, boxes, boardSize } = this;
    let isChanged = true;

    while (isChanged) {
      // preclude
      for (let n = 1; n <= boardSize; n += 1) {
        for (let i = 0; i < boardSize; i += 1) {
          if (rows[i].hasNum(n)) {
            rows[i].precludeNum(n);
          }
          if (cols[i].hasNum(n)) {
            cols[i].precludeNum(n);
          }
          if (boxes[i].hasNum(n)) {
            boxes[i].precludeNum(n);
          }
        }
      }

      // set value
      isChanged = false;
      for (let ri = 0; ri < boardSize; ri += 1) {
        for (let ci = 0; ci < boardSize; ci += 1) {
          const cell = rows[ri][ci];
          if (cell.value) continue;

          const num = cell.getExclusivePossibility();
          if (num) {
            cell.value = num;
            isChanged = true;
          }
        }
      }
    }

    const hasEmpty = rows.some(row => row.cells.some(cell => !cell.value));
    if (hasEmpty) {
      return null;
    }

    return this.validateAnswer() ? this.getBoard() : null;
  }

  validateAnswer() {
    const { rows, cols, boxes } = this;

    for (let n = 1; n <= this.boardSize; n += 1) {
      for (let i = 0; i < this.boardSize; i += 1) {
        if (!rows[i].getValues().includes(n)) {
          return false;
        }
        if (!cols[i].getValues().includes(n)) {
          return false;
        }
        if (!boxes[i].getValues().includes(n)) {
          return false;
        }
      }
    }

    return true;
  }

  validateBoard() {
    const { rows, cols, boxes } = this;
    for (let n = 1; n <= this.boardSize; n += 1) {
      const isN = v => v.value === n;

      for (let i = 0; i < this.boardSize; i += 1) {
        if (rows[i].cells.filter(isN).length > 1) {
          return false;
        }
        if (cols[i].cells.filter(isN).length > 1) {
          return false;
        }
        if (boxes[i].cells.filter(isN).length > 1) {
          return false;
        }
      }
    }

    return true;
  }
}
