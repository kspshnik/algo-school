import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listInitialState } from '../../constants/store-initial-states';
import { TStructSliceState, TStructView } from '../../types/store.types';

const initialState : TStructSliceState = listInitialState;

const listSubslice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    startList: (state) => (
      { ...state, isActive: true, isFinished: false }
    ),
    stopList: (state) => (
      { ...state, isFinished: true, isActive: false }
    ),
    nextListStep: (state, action : PayloadAction<TStructView>) => (
      { ...state, viewData: action.payload }
    ),
  },
});

const listReducer = listSubslice.reducer;

export const {
  startList,
  stopList,
  nextListStep,
} = listSubslice.actions;

export default listReducer;
