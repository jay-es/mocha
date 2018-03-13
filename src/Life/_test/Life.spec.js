import assert from 'assert';
import Life from '../Life';

describe('GameOfLife', () => {
  describe('constructor', () => {
    it('matrixが格納される', () => {
      const matrix = [[1, 1], [1, 1]];
      const life = new Life(matrix);
      assert.equal(matrix, life.matrix);
    });
  });

  describe('static expandField', () => {
    const { expandField } = Life;

    it('2*2', () => {
      const matrix = [[1, 1], [1, 1]];
      assert.deepStrictEqual(
        [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
        expandField(matrix),
      );
    });

    it('3*3', () => {
      const matrix = [[0, 1, 0], [0, 1, 0], [0, 1, 0]];
      assert.deepStrictEqual(
        [[0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]],
        expandField(matrix),
      );
    });
  });

  describe('static sumAround', () => {
    const { sumAround } = Life;

    it('2*2', () => {
      const matrix = [[1, 1], [1, 1]];
      assert.strictEqual(3, sumAround(0, 0, matrix));
      assert.strictEqual(3, sumAround(1, 1, matrix));
    });

    it('3*3', () => {
      const matrix = [[0, 1, 0], [0, 1, 0], [0, 1, 0]];
      assert.strictEqual(2, sumAround(0, 0, matrix));
      assert.strictEqual(2, sumAround(1, 1, matrix));
      assert.strictEqual(3, sumAround(1, 2, matrix));
      assert.strictEqual(1, sumAround(2, 1, matrix));
    });
  });

  describe('static willLive', () => {
    const { willLive } = Life;

    it('Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', () => {
      assert.strictEqual(true, willLive(0, 3));

      for (let i = 0; i < 10; i += 1) {
        if (i !== 3) {
          assert.strictEqual(false, willLive(0, i));
        }
      }
    });

    it('Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.', () => {
      assert.strictEqual(false, willLive(1, 0));
      assert.strictEqual(false, willLive(1, 1));
    });

    it('Any live cell with two or three live neighbours lives on to the next generation.', () => {
      assert.strictEqual(true, willLive(1, 2));
      assert.strictEqual(true, willLive(1, 3));
    });

    it('Any live cell with more than three live neighbours dies, as if by overpopulation.', () => {
      for (let i = 4; i < 10; i += 1) {
        assert.strictEqual(false, willLive(1, i));
      }
    });
  });

  describe('next', () => {
    it('2*2', () => {
      const life = new Life([[1, 1], [1, 1]]);
      assert.deepStrictEqual(
        [[1, 1], [1, 1]],
        life.next(),
      );
    });

    it('3*3', () => {
      const life = new Life([[0, 1, 0], [0, 1, 0], [0, 1, 0]]);
      assert.deepStrictEqual(
        [[0, 0, 0], [1, 1, 1], [0, 0, 0]],
        life.next(),
      );
    });
  });
});
