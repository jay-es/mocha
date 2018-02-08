import assert from 'power-assert';

describe('Array', () => {
  let myArray;

  beforeEach(() => {
    myArray = ['a', 'b', 'c'];
  });

  describe('#push()', () => {
    it('最後に追加される', () => {
      myArray.push('X');
      assert.deepEqual(myArray, ['a', 'b', 'c', 'X']);
    });

    it('引数を複数渡すと、全て追加される', () => {
      myArray.push('X', 'Y', 'Z');
      assert.deepEqual(myArray, ['a', 'b', 'c', 'X', 'Y', 'Z']);
    });

    it('メソッドの返り値は、追加された後のlength', () => {
      assert.equal(myArray.push('X'), 4);
    });
  });

  describe('#unshift()', () => {
    it('先頭に追加される', () => {
      myArray.unshift('X');
      assert.deepEqual(myArray, ['X', 'a', 'b', 'c']);
    });

    it('引数を複数渡すと、全て追加される', () => {
      myArray.unshift('X', 'Y', 'Z');
      assert.deepEqual(myArray, ['X', 'Y', 'Z', 'a', 'b', 'c']);
    });

    it('メソッドの返り値は、追加された後のlength', () => {
      assert.equal(myArray.unshift('X'), 4);
    });
  });

  describe('#pop()', () => {
    it('最後が削除される', () => {
      myArray.pop();
      assert.deepEqual(myArray, ['a', 'b']);
    });

    it('引数は無効', () => {
      myArray.pop('X');
      assert.deepEqual(myArray, ['a', 'b']);
    });

    it('メソッドの返り値は、削除された要素', () => {
      assert.equal(myArray.pop(), 'c');
    });

    it('空の配列で呼び出すと、返り値はundefined', () => {
      assert.equal([].pop(), undefined);
    });
  });

  describe('#shift()', () => {
    it('先頭が削除される', () => {
      myArray.shift();
      assert.deepEqual(myArray, ['b', 'c']);
    });

    it('引数は無効', () => {
      myArray.shift('X');
      assert.deepEqual(myArray, ['b', 'c']);
    });

    it('メソッドの返り値は、削除された要素', () => {
      assert.equal(myArray.shift(), 'a');
    });

    it('空の配列で呼び出すと、返り値はundefined', () => {
      assert.equal([].shift(), undefined);
    });
  });

  // describe('#indexOf()', () => {
  //   it('should return -1 when the value is not present', () => {
  //     assert.equal([1, 2, 3].indexOf(4), -1);
  //     assert.equal(-1, [1, 2, 3].indexOf(1)); // ここが失敗する
  //   });
  // });
});
