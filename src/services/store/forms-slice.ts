import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFormsSliceState } from '../../types/store.types';
import { TSortingType } from '../../types/types';

const initialState : TFormsSliceState = {
  string: '',
  fibonacchiLimit: 0,
  randomArray: [],
  sortingType: 'BUBBLE',
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setString: (state, action : PayloadAction<string>) => (
      { ...state, string: action.payload }
    ),
    clearString: (state) => ({
      ...state, string: '',
    }),
    setFibonacchiLimit: (state, action : PayloadAction<number>) => (
      { ...state, fibonacchiLimit: action.payload }
    ),
    clearFibonacchiLimit: (state) => (
      { ...state, fibonacchiLimit: 0 }
    ),
    setRandomArray: (state, action : PayloadAction<Array<number>>) => (
      { ...state, randomArray: action.payload }
    ),
    clearRandomArray: (state) => (
      { ...state, randomArray: [] }
    ),
    setSortingType: (state, action : PayloadAction<TSortingType>) => (
      { ...state, sortingType: action.payload }
    ),
  },
});

const formsReducer = formsSlice.reducer;

export const {
  setString,
  clearString,
  setFibonacchiLimit,
  clearFibonacchiLimit,
  setRandomArray,
  clearRandomArray,
  setSortingType,
} = formsSlice.actions;

export default formsReducer;
