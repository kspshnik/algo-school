import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { queueInitialState } from '../../constants/store-initial-states';
import { TStructSliceState, TStructView } from '../../types/store.types';

const initialState : TStructSliceState = queueInitialState;

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
    setQueueStart: (state, action: PayloadAction<number>) => (
      { ...state, start: action.payload }
    ),
    setQueueEnd: (state, action: PayloadAction<number>) => (
      { ...state, end: action.payload }
    ),
  },
});

const queueReducer = queueSubslice.reducer;

export const {
  startQueue,
  stopQueue,
  nextQueueStep,
  resetQueue,
  setQueueStart,
  setQueueEnd,
} = queueSubslice.actions;

export default queueReducer;
