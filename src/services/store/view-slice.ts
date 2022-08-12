import { combineReducers } from 'redux';

import stringReverseReducer, {
  clearFinishedState,
  nextStringReverseStep,
  resetString,
  startStringReverse,
  stopStringReverse,
} from './string-slice';
import fibonacchiReducer, {
  nextFibonacchiStep,
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
  nextFibonacchiStep,
  resetFibonacchi,
  startStringReverse,
  stopStringReverse,
  nextStringReverseStep,
  resetString,
  clearFinishedState,
};

export default viewReducer;
