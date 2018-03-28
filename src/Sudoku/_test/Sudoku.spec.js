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

  // return;

  describe('solve 4', () => {
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

  describe('solve', () => {
    const conv = (str) => {
      const len = Math.sqrt(str.length);
      return str.split(new RegExp(`(\\d{${len}})`))
        .filter(v => v)
        .map(v => v.split('').map(Number));
    };

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

    it('2018/03/19 初級', () => {
      const puzzle = conv('004307000000001890250000000039180450020970600006520003342005089018749006007832145');
      const solution = conv('894367521673251894251498367739186452425973618186524973342615789518749236967832145');
      assert.deepStrictEqual(solution, new Sudoku(puzzle).solve());
    });

    it('2018/03/20 初級', () => {
      const puzzle = conv('000004060820000000000500000370691248200053079406080010967325180504910730002840096');
      const solution = conv('759234861823169457641578923375691248218453679496782315967325184584916732132847596');
      assert.deepStrictEqual(solution, new Sudoku(puzzle).solve());
    });

    it('2018/03/19 中級', () => {
      const puzzle = conv('000100090074000000080000003000000708100609000000000004000070000000900000600003050');
      const solution = conv('326147895974835126581296473269354718147689532835721964413572689752968341698413257');
      assert.deepStrictEqual(solution, new Sudoku(puzzle).solve());
    });

    it('2018/03/20 中級', () => {
      const puzzle = conv('000003100904050600800000000000090000030000200000040000080001000000000090500002080');
      const solution = conv('756823149924157638813469527145296873639718254278345916482971365361584792597632481');
      assert.deepStrictEqual(solution, new Sudoku(puzzle).solve());
    });

    it('expert', () => {
      const puzzle = [
        [0, 0, 0, 0, 7, 0, 0, 9, 0],
        [0, 4, 6, 0, 3, 0, 0, 0, 0],
        [0, 2, 0, 5, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 2, 0, 0],
        [3, 0, 7, 0, 0, 4, 0, 0, 0],
        [8, 1, 0, 0, 0, 0, 5, 0, 0],
        [5, 0, 0, 0, 6, 3, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 3, 7],
        [0, 0, 0, 0, 0, 0, 0, 0, 6],
      ];

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

      // console.log('\n', new Sudoku(puzzle).solve());
      // assert.deepStrictEqual(solution, new Sudoku(puzzle).solve());
    });
  });
});
