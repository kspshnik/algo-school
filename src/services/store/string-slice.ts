import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAlgoView } from '../../types/store.types';

import { algoInitialState } from '../../constants';

const initialState = algoInitialState;

const stringReverseSlice = createSlice({
  name: 'string',
  initialState,
  reducers: {
    startStringReverse: (state) => (
      { ...state, isActive: true, isDone: false }
    ),
    stopStringReverse: (state) => (
      { ...state, isFinished: true, isActive: false }
    ),
    nextStringReverseStep: (state, action : PayloadAction<TAlgoView>) => (
      { ...state, viewData: action.payload }
    ),
    resetString: (state) => (
      { ...initialState }
    ),
    clearFinishedState: (state) => (
      { ...state, isFinished: false }
    ),
  },
});

const stringReverseReducer = stringReverseSlice.reducer;

export const {
  startStringReverse,
  stopStringReverse,
  nextStringReverseStep,
  resetString,
  clearFinishedState,
} = stringReverseSlice.actions;

export default stringReverseReducer;
