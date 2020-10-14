import assert from 'assert';
import { judge } from './judge';

describe('judge', () => {
  it('"4832" vs "0123" は 0hit, 2blow になる', () => {
    const { hit, blow } = judge('4832', '0123');

    assert.strictEqual(0, hit);
    assert.strictEqual(2, blow);
  });

  it('"4832" vs "2345" は 0hit, 3blow になる', () => {
    const { hit, blow } = judge('4832', '2345');

    assert.strictEqual(0, hit);
    assert.strictEqual(3, blow);
  });

  it('"4832" vs "3467" は 0hit, 2blow になる', () => {
    const { hit, blow } = judge('4832', '3467');

    assert.strictEqual(0, hit);
    assert.strictEqual(2, blow);
  });

  it('"4832" vs "2345" は 2hit, 2blow になる', () => {
    const { hit, blow } = judge('4832', '4238');

    assert.strictEqual(2, hit);
    assert.strictEqual(2, blow);
  });

  it('"4832" vs "4832" は 4hit, 0blow になる', () => {
    const { hit, blow } = judge('4832', '4832');

    assert.strictEqual(4, hit);
    assert.strictEqual(0, blow);
  });
});
