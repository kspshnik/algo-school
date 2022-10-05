import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAlgoView } from '../../types/store.types';

import { algoInitialState } from '../../constants';

const initialState = algoInitialState;

const sortingSubslice = createSlice({
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

const sortingReducer = sortingSubslice.reducer;

export const {
  startSorting,
  stopSorting,
  nextSortingStep,
  resetSorting,
} = sortingSubslice.actions;

export default sortingReducer;
