import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAlgoView } from '../../types/store.types';

import { algoInitialState } from '../../constants';

const initialState = algoInitialState;

const fibonacchiSubslice = createSlice({
  name: 'fibonacchi',
  initialState,
  reducers: {
    startFibonachhi: (state) => (
      { ...state, isActive: true, isFinished: false }
    ),
    stopFibonacchi: (state) => (
      { ...state, isFinished: true, isActive: false }
    ),
    nextFibonacchiStep: (state, action : PayloadAction<TAlgoView>) => (
      { ...state, viewData: action.payload }
    ),
    resetFibonacchi: () => (
      { ...initialState }
    ),
  },
});

const fibonacchiReducer = fibonacchiSubslice.reducer;

export const {
  startFibonachhi,
  stopFibonacchi,
  nextFibonacchiStep,
  resetFibonacchi,
} = fibonacchiSubslice.actions;

export default fibonacchiReducer;
