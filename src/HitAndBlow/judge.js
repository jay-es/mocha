/* eslint-disable import/prefer-default-export */
/**
 * @param {string} left
 * @param {string} right
 * @returns {{ hit: number, blow: number }}
 */
export const judge = (left, right) =>
  [...left].reduce(
    ({ hit, blow }, v, i) => {
      // 位置が同じなら hit
      if (v === right[i]) {
        return { hit: hit + 1, blow };
      }

      // 含んでいれば blow
      if (right.includes(v)) {
        return { hit, blow: blow + 1 };
      }

      // そのまま
      return { hit, blow };
    },
    { hit: 0, blow: 0 },
  );
