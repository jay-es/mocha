import assert from 'assert';
import { createCandidates } from './createCandidates';

describe('createCandidates', () => {
  it('3桁の場合、配列の要素数は 720 個', () => {
    const res = createCandidates(3);
    assert.strictEqual(720, res.length);
  });

  it('4桁の場合、配列の要素数は 5040 個', () => {
    const res = createCandidates(4);
    assert.strictEqual(5040, res.length);
  });
});

