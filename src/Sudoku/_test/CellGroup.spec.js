import assert from 'assert';
import Cell from '../Cell';
import CellGroup from '../CellGroup';

describe('CellGroup', () => {
  const createCells = arr => arr.map(v => new Cell(v, arr.length));
  const createEmptyCells = () => createCells([0, 0, 0, 0]);

  describe('constructor', () => {
    it('empty', () => {
      const cells = createEmptyCells();
      const cellGroup = new CellGroup(cells);
      assert.strictEqual(cells, cellGroup.cells);
    });
  });

  describe('hasNum', () => {
    it('empty', () => {
      const cells = createEmptyCells();
      const cellGroup = new CellGroup(cells);
      assert.strictEqual(false, cellGroup.hasNum(1));
      assert.strictEqual(false, cellGroup.hasNum(2));
      assert.strictEqual(false, cellGroup.hasNum(3));
      assert.strictEqual(false, cellGroup.hasNum(4));
    });

    it('not empty', () => {
      const cells = createCells([0, 0, 3, 1]);
      const cellGroup = new CellGroup(cells);
      assert.strictEqual(true, cellGroup.hasNum(1));
      assert.strictEqual(false, cellGroup.hasNum(2));
      assert.strictEqual(true, cellGroup.hasNum(3));
      assert.strictEqual(false, cellGroup.hasNum(4));
    });
  });

  describe('precludeNum', () => {
    it('not empty', () => {
      const cells = createCells([0, 0, 3, 1]);
      const cellGroup = new CellGroup(cells);

      assert.strictEqual(true, cells[0].possibilities[2]);
      assert.strictEqual(true, cells[1].possibilities[2]);
      assert.strictEqual(false, cells[2].possibilities[2]);
      assert.strictEqual(false, cells[3].possibilities[2]);

      cellGroup.precludeNum(2);

      assert.strictEqual(false, cells[0].possibilities[2]);
      assert.strictEqual(false, cells[1].possibilities[2]);
      assert.strictEqual(false, cells[2].possibilities[2]);
      assert.strictEqual(false, cells[3].possibilities[2]);
    });

    it('cellの値がセットされたら、cellGroupでprecludeNumが実行される', () => {
      const cells = createCells([0, 0, 3, 1]);
      new CellGroup(cells); // eslint-disable-line no-new

      assert.strictEqual(true, cells[0].possibilities[2]);
      assert.strictEqual(true, cells[1].possibilities[2]);
      assert.strictEqual(false, cells[2].possibilities[2]);
      assert.strictEqual(false, cells[3].possibilities[2]);

      cells[1].setValue(2);

      assert.strictEqual(false, cells[0].possibilities[2]);
      assert.strictEqual(false, cells[1].possibilities[2]);
      assert.strictEqual(false, cells[2].possibilities[2]);
      assert.strictEqual(false, cells[3].possibilities[2]);
    });
  });

  describe('getExclusiveCell', () => {
    it('ない場合', () => {
      const cells = createCells([0, 2, 3, 1]);
      const cellGroup = new CellGroup(cells);

      assert.strictEqual(null, cellGroup.getExclusiveCell(2));
    });

    it('ひとつだけある場合', () => {
      const cells = createCells([4, 0, 3, 1]);
      const cellGroup = new CellGroup(cells);

      assert.strictEqual(cells[1], cellGroup.getExclusiveCell(2));
    });

    it('複数ある場合', () => {
      const cells = createCells([0, 0, 3, 1]);
      const cellGroup = new CellGroup(cells);

      assert.strictEqual(null, cellGroup.getExclusiveCell(2));
    });
  });

  describe('getPossibleCells', () => {
    it('ない場合', () => {
      const cells = createCells([0, 2, 3, 1]);
      const cellGroup = new CellGroup(cells);

      assert.strictEqual(null, cellGroup.getPossibleCells(2));
    });

    it('ひとつだけある場合', () => {
      const cells = createCells([4, 0, 3, 1]);
      const cellGroup = new CellGroup(cells);

      assert.deepStrictEqual([cells[1]], cellGroup.getPossibleCells(2));
    });

    it('複数ある場合', () => {
      const cells = createCells([0, 0, 3, 1]);
      const cellGroup = new CellGroup(cells);

      assert.deepStrictEqual([cells[0], cells[1]], cellGroup.getPossibleCells(2));
    });
  });
});
