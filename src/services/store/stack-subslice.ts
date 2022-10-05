import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { structInitialState } from '../../constants/store-initial-states';
import { TStructView } from '../../types/store.types';

const initialState = structInitialState;

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
  },
});

const stackReducer = stackSubslice.reducer;

export const {
  startStack,
  stopStack,
  nextStackStep,
  resetStack,
} = stackSubslice.actions;

export default stackReducer;
