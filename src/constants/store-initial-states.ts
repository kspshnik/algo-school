import { TAlgoSliceState, TStructSliceState } from '../types/store.types';

// eslint-disable-next-line import/prefer-default-export
export const algoInitialState : TAlgoSliceState = {
  isFinished: false,
  viewData: [],
  isActive: false,
};

export const structInitialState : TStructSliceState = {
  isFinished: false,
  viewData: [],
  isActive: false,
};
