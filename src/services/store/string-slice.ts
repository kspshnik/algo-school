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
      { ...state, isDone: true, isActive: false }
    ),
    nextStringReverseStep: (state, action: PayloadAction<TAlgoView>) => (
      { ...state, stringView: action.payload }
    ),
  },
});

const stringReverseReducer = stringReverseSlice.reducer;

export const {
  startStringReverse,
  stopStringReverse,
  nextStringReverseStep,
} = stringReverseSlice.actions;

export default stringReverseReducer;
