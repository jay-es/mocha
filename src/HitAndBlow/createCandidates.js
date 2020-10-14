/* eslint-disable import/prefer-default-export */
export const createCandidates = digit =>
  [...Array(10 ** digit)]
    .map((_, i) => i)
    .filter((v) => {
      // ゼロ埋め
      const str = v.toString().padStart(digit, '0');
      // 重複なし
      const set = new Set([...str]);

      return str.length === set.size;
    });
