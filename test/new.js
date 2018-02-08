import assert from 'assert';

it('配列比較', () => {
  const myArray = ['a', 'b', 'c'];
  assert.deepEqual(myArray, ['a', 'b', 'c', 'X']);
});
