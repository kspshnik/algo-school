import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAlgoView } from '../../types/store.types';

import { algoInitialState } from '../../constants';

const initialState = algoInitialState;

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    startSorting: (state) => (
      { ...state, isActive: true, isDone: false }
    ),
    stopSorting: (state) => (
      { ...state, isDone: true, isActive: false }
    ),
    nextSortingStep: (state, action : PayloadAction<TAlgoView>) => (
      { ...state, viewData: action.payload }
    ),
    resetSorting: () => (
      { ...initialState }
    ),
  },
});

const sortingReducer = sortingSlice.reducer;

export const {
  startSorting,
  stopSorting,
  nextSortingStep,
  resetSorting,
} = sortingSlice.actions;

export default sortingReducer;
