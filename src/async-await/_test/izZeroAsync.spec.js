import assert from 'assert';
import { isZeroAsync, isZeroPromise } from '../isZeroAsync';

describe('Async', () => {
  it('async関数はpromiseを返す', () => {
    assert.strictEqual('AsyncFunction', isZeroAsync.constructor.name);
    assert.ok(isZeroAsync(0) instanceof Promise);
  });

  it('async関数はreturnした値でresolveする', (done) => {
    isZeroAsync(0)
      .then((result) => {
        assert.strictEqual(true, result);
        done();
      });
  });

  it('async関数内で例外が発生すると、そのエラーをrejectする', (done) => {
    isZeroAsync(1)
      .catch((err) => {
        assert.ok(err instanceof TypeError);
        assert.strictEqual('Not Zero!', err.message);
        done();
      });
  });
});

describe('Await', () => {
  it('resolveされた値が返る', async () => {
    const result = await isZeroPromise(0);
    assert.strictEqual(true, result);
  });

  it('rejectされた値で例外が発生する', async () => {
    try {
      await isZeroPromise(1);
    } catch (err) {
      assert.ok(err instanceof TypeError);
      assert.strictEqual('Not Zero!', err.message);
    }
  });
});
