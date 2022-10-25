import { combineReducers } from 'redux';

import stringReverseReducer, {
  clearFinishedState,
  nextStringReverseStep,
  resetString,
  startStringReverse,
  stopStringReverse,
} from './string-subslice';
import fibonacchiReducer, {
  nextFibonacchiStep,
  resetFibonacchi,
  startFibonachhi,
  stopFibonacchi,
} from './fibonacchi-subslice';
import sortingReducer, {
  nextSortingStep, resetSorting, startSorting, stopSorting,
} from './sorting-subslice';

import stackReducer, {
  nextStackStep,
  resetStack,
  setStackEnd,
  setStackStart,
  startStack,
  stopStack,
} from './stack-subslice';

import queueReducer, {
  nextQueueStep,
  resetQueue,
  setQueueEnd,
  setQueueStart,
  startQueue,
  stopQueue,
} from './queue-subslice';

import listReducer, { nextListStep, startList, stopList } from './list-subslice';

const viewReducer = combineReducers({
  string: stringReverseReducer,
  fibonachhi: fibonacchiReducer,
  sort: sortingReducer,
  stack: stackReducer,
  queue: queueReducer,
  list: listReducer,
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
  startStack,
  stopStack,
  nextStackStep,
  resetStack,
  setStackStart,
  setStackEnd,
  startQueue,
  stopQueue,
  nextQueueStep,
  resetQueue,
  setQueueStart,
  setQueueEnd,
  startList,
  stopList,
  nextListStep,
};

export default viewReducer;
