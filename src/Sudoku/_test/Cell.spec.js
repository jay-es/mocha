import assert from 'assert';
import Cell from '../Cell';

describe('Cell', () => {
  describe('constructor', () => {
    it('empty', () => {
      const cell = new Cell(0, 4);
      assert.strictEqual(0, cell.value);
      assert.strictEqual(4, cell.boardSize);
      assert.deepStrictEqual([null, true, true, true, true], cell.possibilities);
    });

    it('not empty', () => {
      const cell = new Cell(1, 4);
      assert.strictEqual(1, cell.value);
      assert.strictEqual(4, cell.boardSize);
      assert.deepStrictEqual([null, false, false, false, false], cell.possibilities);
    });
  });

  describe('getExclusivePossibility', () => {
    it('not empty', () => {
      const cell = new Cell(1, 4);
      assert.strictEqual(0, cell.getExclusivePossibility());
    });

    it('empty', () => {
      const cell = new Cell(0, 4);
      assert.strictEqual(0, cell.getExclusivePossibility());
      cell[1] = 0;
      cell[2] = 0;
      assert.strictEqual(0, cell.getExclusivePossibility());
      cell[4] = 0;
      assert.strictEqual(3, cell.getExclusivePossibility());
    });

    it('値をセット', () => {
      const cell = new Cell(0, 4);
      cell[1] = 0;
      cell[2] = 0;
      cell[4] = 0;
      assert.strictEqual(3, cell.getExclusivePossibility());
      cell.value = 1;
      assert.strictEqual(0, cell.getExclusivePossibility());
    });
  });
});
