import { expect } from 'chai';
import exponentialMovingAverage, { exponentialMovingAverageArray } from '../exponentialMovingAverage';

describe('exponentialMovingAverage', () => {
    it('single value with periods of 1 equals the value', () => {
        const result = exponentialMovingAverage([1], { periods: 1 });
        expect(result).to.equal(1);
    });

    it('whole data sample', () => {
        const result = exponentialMovingAverage([1, 2, 3], { periods: 3 });
        // const roundedResult = roundResult(result);
        expect(result).to.deep.equal(2);
    });

    it('wuut2', () => {
        const data = [1, 2, 3, 4, 5];
        const result = exponentialMovingAverageArray(data, { periods: 3 });
        expect(result).to.deep.equal([2, 3, 4]);
    });

    it('real world', () => {
        const data = [22.27, 22.19, 22.08, 22.17, 22.18, 22.13, 22.23, 22.43, 22.24, 22.29,
            22.15, 22.39, 22.38, 22.61, 23.36, 24.05, 23.75, 23.83, 23.95, 23.63, 23.82,
            23.87, 23.65, 23.19, 23.10, 23.33, 22.68, 23.10, 22.40, 22.17];
        const ema10days = [22.22, 22.21, 22.23, 22.26, 22.3, 22.42,
          22.61, 22.77, 22.91, 23.08, 23.21, 23.38, 23.53, 23.65,
          23.71, 23.68, 23.61, 23.51, 23.43, 23.28, 23.13];
        const result = exponentialMovingAverageArray(data, { periods: 10 });
        const roundedResult = result.map(x => Math.round(x * 100) / 100);
        expect(roundedResult).to.deep.equal(ema10days);
    });
});
