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
  nextStackStep, resetStack, startStack, stopStack, setStackStart, setStackEnd,
} from './stack-subslice';

import queueReducer, {
  startQueue, stopQueue, nextQueueStep, resetQueue, setQueueStart, setQueueEnd,
} from './queue-subslice';

const viewReducer = combineReducers({
  string: stringReverseReducer,
  fibonachhi: fibonacchiReducer,
  sort: sortingReducer,
  stack: stackReducer,
  queue: queueReducer,
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
};

export default viewReducer;
