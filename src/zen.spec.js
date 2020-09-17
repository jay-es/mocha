import assert from 'assert';

describe('クラスベース', () => {
  class Then {
    constructor(value) {
      this.value = value;
    }

    then() {
      return new Then(`${this.value}前`);
    }

    世() {
      return `${this.value}世`;
    }
  }

  const then = () => new Then('前');

  it('zen', () => {
    const res = then().then().then().世();
    assert.strictEqual('前前前世', res);
  });
});

describe('関数ベース', () => {
  const then = () => ({
    then: () => ({
      then: () => ({
        世: () => '前前前世',
      }),
    }),
  });

  it('zen', () => {
    const res = then().then().then().世();
    assert.strictEqual('前前前世', res);
  });
});

describe('関数ベース2', () => {
  const then = () => ({
    then() { return this; },
    世: () => '前前前世',
  });

  it('zen', () => {
    const res = then().then().then().世();
    assert.strictEqual('前前前世', res);
  });
});
