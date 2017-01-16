import { takeField } from './math';
import { simpleMovingAverageArray } from './simpleMovingAverage';
import { exponentialMovingAverageArray } from './exponentialMovingAverage';

type CandleField = 'open' | 'high' | 'low' | 'close';

type MacdConfig = {
    fastEmaPeriod: number,
    slowEmaPeriod: number,
    signalSmaPeriod: number,
    field?: CandleField,
    pipSize: number,
};

type MacdEntry = number[];

const paddingLeft = (data: any[], length: number): any[] => {
    const arr = [];
    arr.length = length - data.length;
    arr.fill(0);
    return [...arr, ...data];
};

const macdArray = (data: Candle[], config: MacdConfig): MacdEntry[] => {
    const { field, fastEmaPeriod = 12, slowEmaPeriod = 26, signalSmaPeriod = 9, pipSize = 2 } = config;

    const vals = takeField(data, field);

    const length = vals.length;

    const fastEmaArray = paddingLeft(exponentialMovingAverageArray(vals, { periods: fastEmaPeriod, pipSize, field }), length);
    const slowEmaArray = paddingLeft(exponentialMovingAverageArray(vals, { periods: slowEmaPeriod, pipSize, field }), length);

    const macdCalcArray = paddingLeft(slowEmaArray.map((x, i) => +(fastEmaArray[i] - x).toFixed(pipSize)), length);

    const smaArray = paddingLeft(simpleMovingAverageArray(macdCalcArray.slice(slowEmaPeriod - 1), { periods: signalSmaPeriod, pipSize }), length);

    return macdCalcArray.map((x, i) =>
        [+(x - smaArray[i]).toFixed(pipSize), x, smaArray[i]]);
};

export default macdArray;
