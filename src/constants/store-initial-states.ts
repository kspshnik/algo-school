import { TAlgoSliceState, TStructSliceState } from '../types/store.types';
import { makeListInitialView, makeQueueInitialView } from '../services/helpers';

export const algoInitialState : TAlgoSliceState = {
  isFinished: false,
  viewData: [],
  isActive: false,
};

export const stackInitialState : TStructSliceState = {
  isFinished: true,
  viewData: [],
  isActive: false,
  start: 0,
  end: 0,
};

export const queueInitialState : TStructSliceState = {
  isFinished: true,
  viewData: makeQueueInitialView(7),
  isActive: false,
  start: 0,
  end: 0,
};

export const listInitialState : TStructSliceState = {
  isFinished: true,
  viewData: makeListInitialView(),
  isActive: false,
  start: 0,
  end: 0,
};
