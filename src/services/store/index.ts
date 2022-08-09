import store, {
  AppDispatch, AppThunk, rootReducer, RootState,
} from './store';
import {
  nextFibonacchiNumber,
  nextSortingStep,
  nextStringReverseStep,
  resetFibonacchi,
  resetSorting,
  resetString,
  startFibonachhi,
  startSorting,
  startStringReverse,
  stopFibonacchi,
  stopSorting,
  stopStringReverse,
} from './view-slice';
import {
  clearFibonacchiLimit,
  clearRandomArray,
  clearString,
  setFibonacchiLimit,
  setRandomArray,
  setSortingType,
  setString,
} from './forms-slice';

export {
  store,
  rootReducer,
  startStringReverse,
  stopStringReverse,
  nextStringReverseStep,
  resetString,
  startFibonachhi,
  stopFibonacchi,
  nextFibonacchiNumber,
  resetFibonacchi,
  startSorting,
  stopSorting,
  nextSortingStep,
  resetSorting,
  setString,
  clearString,
  setFibonacchiLimit,
  clearFibonacchiLimit,
  setRandomArray,
  clearRandomArray,
  setSortingType,
};

export type {
  RootState,
  AppDispatch,
  AppThunk,
};
