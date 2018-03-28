import Cell from './Cell';
import CellGroup from './CellGroup';

export default class Sudoku {
  constructor(board) {
    const boardSize = board.length;
    const boxSize = Math.sqrt(boardSize);
    const cells = board.map((arr, ri) => arr.map((v, ci) => new Cell(v, boardSize, ri, ci)));

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
      isChanged = false;

      // セルごとの判定
      for (let ri = 0; ri < boardSize; ri += 1) {
        for (let ci = 0; ci < boardSize; ci += 1) {
          const cell = rows[ri][ci];
          if (cell.value) continue;

          const num = cell.getExclusivePossibility();
          if (num) {
            cell.setValue(num);
            isChanged = true;
          }
        }
      }

      // グループごとの判定
      for (let gi = 0; gi < boardSize; gi += 1) {
        for (let n = 1; n <= boardSize; n += 1) {
          let cell = rows[gi].getExclusiveCell(n);

          if (cell) {
            cell.setValue(n);
            isChanged = true;
          }

          cell = cols[gi].getExclusiveCell(n);

          if (cell) {
            cell.setValue(n);
            isChanged = true;
          }

          cell = boxes[gi].getExclusiveCell(n);

          if (cell) {
            cell.setValue(n);
            isChanged = true;
          }
        }
      }

      // ボックスの中で行or列が決まっていたら、行or列グループの別ボックス部分の可能性を消す
      for (let gi = 0; gi < boardSize; gi += 1) {
        for (let n = 1; n <= boardSize; n += 1) {
          const cells = boxes[gi].getPossibleCells(n);
          if (!cells || cells.length === 1) continue;

          const { rowNum, colNum } = cells[0];
          const isSameRow = cells.every(cell => cell.rowNum === rowNum);
          const isSameCol = cells.every(cell => cell.colNum === colNum);

          const fn = (cell) => {
            if (cell[n] && !cells.includes(cell)) {
              cell[n] = false;
              isChanged = true;
            }
          };

          if (isSameRow) rows[rowNum].cells.forEach(fn);
          if (isSameCol) cols[colNum].cells.forEach(fn);
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
