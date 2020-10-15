/* eslint-disable import/prefer-default-export */
import { judge } from './judge';

/**
 * @param {number} digit
 */
const createCandidates = digit =>
  [...Array(10 ** digit)]
    // ゼロ埋め
    .map((_, i) => i.toString().padStart(digit, '0'))
    // 数字の重複がないものだけにする
    .filter(v => new Set([...v]).size === v.length);


export class HitAndBlow {
  /**
   * @param {number} digit
   */
  constructor(digit) {
    this.candidates = createCandidates(digit);
  }

  /**
   * @param {string} str
   * @param {number} hit
   * @param {number} blow
   */
  filter(str, hit, blow) {
    this.candidates = this.candidates.filter((v) => {
      const res = judge(v, str);
      return res.hit === hit && res.blow === blow;
    });
  }
}
