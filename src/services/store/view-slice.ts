import { combineReducers } from 'redux';

import stringReverseReducer, {
  nextStringReverseStep,
  resetString,
  startStringReverse,
  stopStringReverse,
} from './string-slice';
import fibonacchiReducer, {
  nextFibonacchiNumber,
  resetFibonacchi,
  startFibonachhi,
  stopFibonacchi,
} from './fibonacchi-slice';
import sortingReducer, {
  nextSortingStep, resetSorting, startSorting, stopSorting,
} from './sorting-slice';

const viewReducer = combineReducers({
  string: stringReverseReducer,
  fibonachhi: fibonacchiReducer,
  sort: sortingReducer,
});

export {
  startSorting,
  stopSorting,
  nextSortingStep,
  resetSorting,
  startFibonachhi,
  stopFibonacchi,
  nextFibonacchiNumber,
  resetFibonacchi,
  startStringReverse,
  stopStringReverse,
  nextStringReverseStep,
  resetString,
};

export default viewReducer;
