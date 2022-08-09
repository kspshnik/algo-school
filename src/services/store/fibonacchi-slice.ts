import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAlgoView } from '../../types/store.types';

import { algoInitialState } from '../../constants';

const initialState = algoInitialState;

const fibonacchiSlice = createSlice({
  name: 'fibonacchi',
  initialState,
  reducers: {
    startFibonachhi: (state) => (
      { ...state, isActive: true, isDone: false }
    ),
    stopFibonacchi: (state) => (
      { ...state, isDone: true, isActive: false }
    ),
    nextFibonacchiNumber: (state, action : PayloadAction<TAlgoView>) => (
      { ...state, viewData: action.payload }
    ),
    resetFibonacchi: (state) => (
      { ...initialState }
    ),
  },
});

const fibonacchiReducer = fibonacchiSlice.reducer;

export const {
  startFibonachhi,
  stopFibonacchi,
  nextFibonacchiNumber,
  resetFibonacchi,
} = fibonacchiSlice.actions;

export default fibonacchiReducer;
