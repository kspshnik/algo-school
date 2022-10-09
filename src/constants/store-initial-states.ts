import { TAlgoSliceState, TStructSliceState, TStructView } from '../types/store.types';
import { makeEmptyTuple } from '../services/helpers';

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
  viewData: Array(7).fill(makeEmptyTuple()) as TStructView,
  isActive: false,
  start: 0,
  end: 0,
};
