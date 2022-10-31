import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stackInitialState } from '../../constants/store-initial-states';
import { TStructView } from '../../types/store.types';

const initialState = stackInitialState;

const stackSubslice = createSlice({
  name: 'stack',
  initialState,
  reducers: {
    startStack: (state) => (
      { ...state, isActive: true, isFinished: false }
    ),
    stopStack: (state) => (
      { ...state, isFinished: true, isActive: false }
    ),
    nextStackStep: (state, action : PayloadAction<TStructView>) => (
      { ...state, viewData: action.payload }
    ),
    resetStack: () => (
      { ...initialState }
    ),
    setStackStart: (state, action: PayloadAction<number>) => (
      { ...state, start: action.payload }
    ),
    setStackEnd: (state, action: PayloadAction<number>) => (
      { ...state, end: action.payload }
    ),
  },
});

const stackReducer = stackSubslice.reducer;

export const {
  startStack,
  stopStack,
  nextStackStep,
  resetStack,
  setStackStart,
  setStackEnd,
} = stackSubslice.actions;

export default stackReducer;
