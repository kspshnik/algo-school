import store, {
  rootReducer, RootState, AppDispatch, AppThunk,
} from './store';
import {
  startStringReverse,
  stopStringReverse,
  nextStringReverseStep,
  startFibonachhi,
  stopFibonacchi,
  nextFibonacchiNumber,
  startSorting,
  stopSorting,
  nextSortingStep,
} from './view-slice';
import {
  setString,
  clearString,
  setFibonacchiLimit,
  clearFibonacchiLimit,
  setRandomArray,
  clearRandomArray,
} from './forms-slice';

export {
  store,
  rootReducer,
  startStringReverse,
  stopStringReverse,
  nextStringReverseStep,
  startFibonachhi,
  stopFibonacchi,
  nextFibonacchiNumber,
  startSorting,
  stopSorting,
  nextSortingStep,
  setString,
  clearString,
  setFibonacchiLimit,
  clearFibonacchiLimit,
  setRandomArray,
  clearRandomArray,
};

export type {
  RootState,
  AppDispatch,
  AppThunk,
};
