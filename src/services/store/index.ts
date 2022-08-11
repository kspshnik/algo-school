import store, {
  AppDispatch, AppThunk, rootReducer, RootState,
} from './store';
import {
  nextFibonacchiStep,
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
  setString,
  setSortingType,
  setSortingDirection,
  clearSortingType,
  clearSortingDirections,
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
  nextFibonacchiStep,
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
  setSortingDirection,
  clearSortingType,
  clearSortingDirections,
};

export type {
  RootState,
  AppDispatch,
  AppThunk,
};
