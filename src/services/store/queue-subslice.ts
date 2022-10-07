import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { structInitialState } from '../../constants/store-initial-states';
import { TStructSliceState, TStructView } from '../../types/store.types';

const initialState : TStructSliceState = structInitialState;

const queueSubslice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    startQueue: (state) => (
      { ...state, isActive: true, isFinished: false }
    ),
    stopQueue: (state) => (
      { ...state, isFinished: true, isActive: false }
    ),
    nextQueueStep: (state, action : PayloadAction<TStructView>) => (
      { ...state, viewData: action.payload }
    ),
    resetQueue: () => (
      { ...initialState }
    ),
  },
});

const queueReducer = queueSubslice.reducer;

export const {
  startQueue,
  stopQueue,
  nextQueueStep,
  resetQueue,
} = queueSubslice.actions;

export default queueReducer;
