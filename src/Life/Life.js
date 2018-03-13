export default class Life {
  constructor(matrix) {
    this.matrix = matrix;
  }

  static expandField(matrix) {
    for (let i = 0, max = matrix.length; i < max; i++) {
      const row = matrix[i];
      row.unshift(0);
      row.push(0);
    }

    const newRow = Array(matrix[0].length).fill(0);
    matrix.unshift(newRow);
    matrix.push(newRow);

    return matrix;
  }

  static sumAround(rowIndex, colIndex, matrix) {
    let sum = -matrix[rowIndex][colIndex];

    for (let ri = rowIndex - 1; ri <= rowIndex + 1; ri++) {
      const row = matrix[ri];
      if (!row) continue;

      for (let ci = colIndex - 1; ci <= colIndex + 1; ci++) {
        if (row[ci]) {
          sum += 1;
        }
      }
    }

    return sum;
  }

  static sumAroundT(rowIndex, colIndex, matrix) {
    let sum = -matrix[rowIndex][colIndex];

    for (let ri = rowIndex - 1; ri <= rowIndex + 1; ri++) {
      let row = matrix[ri];
      if (ri < 0) row = matrix[matrix.length - 1];
      if (ri >= matrix.length) [row] = matrix;

      for (let ci = colIndex - 1; ci <= colIndex + 1; ci++) {
        let cell = row[ci];
        if (ci < 0) cell = row[row.length - 1];
        if (ci >= row.length) [cell] = row;

        if (cell) {
          sum += 1;
        }
      }
    }

    return sum;
  }

  static willLive(cell, liveNeighbours) {
    if (!cell) {
      return liveNeighbours === 3;
    }

    return liveNeighbours === 2 || liveNeighbours === 3;
  }

  next() {
    const { sumAround, willLive } = Life;
    const { matrix } = this;

    const nextMatrix = matrix.map((row, ri) => row.map((col, ci) => {
      const sum = sumAround(ri, ci, matrix);
      return willLive(col, sum) * 1;
    }));

    this.matrix = nextMatrix;
    return nextMatrix;
  }
}
