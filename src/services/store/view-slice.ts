import { combineReducers } from 'redux';

import stringReverseReducer, { startStringReverse, stopStringReverse, nextStringReverseStep } from './string-slice';
import fibonacchiReducer, { startFibonachhi, stopFibonacchi, nextFibonacchiNumber } from './fibonacchi-slice';
import sortingReducer, { startSorting, stopSorting, nextSortingStep } from './sorting-slice';

const viewReducer = combineReducers({
  string: stringReverseReducer,
  fibonachhi: fibonacchiReducer,
  sort: sortingReducer,
});

export {
  startSorting,
  stopSorting,
  nextSortingStep,
  startFibonachhi,
  stopFibonacchi,
  nextFibonacchiNumber,
  startStringReverse,
  stopStringReverse,
  nextStringReverseStep,
};

export default viewReducer;
