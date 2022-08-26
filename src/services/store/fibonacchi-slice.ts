import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAlgoView } from '../../types/store.types';

import { algoInitialState } from '../../constants';

const initialState = algoInitialState;

const fibonacchiSlice = createSlice({
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

const fibonacchiReducer = fibonacchiSlice.reducer;

export const {
  startFibonachhi,
  stopFibonacchi,
  nextFibonacchiStep,
  resetFibonacchi,
} = fibonacchiSlice.actions;

export default fibonacchiReducer;
