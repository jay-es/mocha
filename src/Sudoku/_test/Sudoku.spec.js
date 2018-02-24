import assert from 'assert';
import Sudoku from '../Sudoku';

describe('Sudoku', () => {
  const getValues = arr => arr.map(r => r.getValues());

  describe('constructor', () => {
    const board = [[0, 0, 2, 0], [0, 3, 0, 4], [3, 0, 4, 0], [0, 2, 0, 0]];

    it('rows', () => {
      const sudoku = new Sudoku(board);
      assert.deepStrictEqual(board, getValues(sudoku.rows));
    });

    it('cols', () => {
      const sudoku = new Sudoku(board);
      assert.deepStrictEqual(
        [[0, 0, 3, 0], [0, 3, 0, 2], [2, 0, 4, 0], [0, 4, 0, 0]],
        getValues(sudoku.cols),
      );
    });

    it('boxes', () => {
      const sudoku = new Sudoku(board);
      assert.deepStrictEqual(
        [[0, 0, 0, 3], [2, 0, 0, 4], [3, 0, 0, 2], [4, 0, 0, 0]],
        getValues(sudoku.boxes),
      );
    });
  });

  describe('validateBoard', () => {
    it('valid', () => {
      let sudoku = new Sudoku([[0, 0, 2, 0], [0, 3, 0, 4], [3, 0, 4, 0], [0, 2, 0, 0]]);
      assert.strictEqual(true, sudoku.validateBoard());

      sudoku = new Sudoku([[0, 0, 4, 0], [0, 2, 0, 3], [2, 0, 0, 0], [0, 4, 0, 1]]);
      assert.strictEqual(true, sudoku.validateBoard());
    });

    it('invalid', () => {
      let sudoku = new Sudoku([[2, 0, 0, 1], [0, 0, 1, 0], [0, 2, 0, 0], [0, 0, 0, 4]]);
      assert.strictEqual(false, sudoku.validateBoard());

      sudoku = new Sudoku([[2, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 4]]);
      assert.strictEqual(false, sudoku.validateBoard());

      sudoku = new Sudoku([[2, 2, 2, 1], [0, 2, 2, 2], [0, 2, 2, 2], [0, 2, 0, 4]]);
      assert.strictEqual(false, sudoku.validateBoard());
    });
  });

  describe('validateBoard 4', () => {
    it('basic1', () => {
      const board = [[0, 0, 2, 0], [0, 3, 0, 4], [3, 0, 4, 0], [0, 2, 0, 0]];
      const answer = [[1, 4, 2, 3], [2, 3, 1, 4], [3, 1, 4, 2], [4, 2, 3, 1]];
      assert.deepStrictEqual(answer, new Sudoku(board).solve());
    });

    it('basic2', () => {
      const board = [[0, 0, 4, 0], [0, 2, 0, 3], [2, 0, 0, 0], [0, 4, 0, 1]];
      const answer = [[1, 3, 4, 2], [4, 2, 1, 3], [2, 1, 3, 4], [3, 4, 2, 1]];
      assert.deepStrictEqual(answer, new Sudoku(board).solve());
    });

    // it('valid3', () => {
    //   const board = [[0, 0, 0, 3], [3, 1, 2, 4], [0, 3, 0, 2], [0, 0, 3, 1]];
    //   const answer = [[2, 4, 1, 3], [3, 1, 2, 4], [1, 3, 4, 2], [4, 2, 3, 1]];
    //   // assert.deepStrictEqual(answer, new Sudoku(board).solve());
    // });

    it('invalid', () => {
      const board = [[3, 4, 0, 2], [2, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0]];
      assert.deepStrictEqual(null, new Sudoku(board).solve());
    });
  });

  describe('validateBoard', () => {
    it('basic1', () => {
      const puzzle = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]];

      const solution = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]];

      assert.deepStrictEqual(solution, new Sudoku(puzzle).solve());
    });
  });
});
