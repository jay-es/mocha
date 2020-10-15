import assert from 'assert';
import { HitAndBlow } from './HitAndBlow';

describe('HitAndBlow', () => {
  describe('constructor', () => {
    it('3桁の場合、配列の要素数は 720 個', () => {
      const res = new HitAndBlow(3);
      assert.strictEqual(720, res.candidates.length);
    });

    it('4桁の場合、配列の要素数は 5040 個', () => {
      const res = new HitAndBlow(4);
      assert.strictEqual(5040, res.candidates.length);
    });
  });

  describe('filter', () => {
    it('絞り込むと配列の中身が減る', () => {
      const res = new HitAndBlow(3);
      res.filter('123', 1, 1);

      assert.ok(res.candidates.length < 720);
    });

    it('3hit（正解）なら 1 つだけ残る', () => {
      const res = new HitAndBlow(3);
      res.filter('123', 3, 0);

      assert.strictEqual(1, res.candidates.length);
    });

    it('存在しないパターン', () => {
      const res = new HitAndBlow(3);
      res.filter('123', 2, 1);

      assert.strictEqual(0, res.candidates.length);
    });
  });
});
