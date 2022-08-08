import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFormsSliceState } from '../../types/store.types';

const initialState : TFormsSliceState = {
  string: '',
  fibonacchiLimit: 0,
  randomArray: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setString: (state, action: PayloadAction<string>) => (
      { ...state, string: action.payload }
    ),
    clearString: (state) => ({
      ...state, string: '',
    }),
    setFibonacchiLimit: (state, action: PayloadAction<number>) => (
      { ...state, fibonacchiLimit: action.payload }
    ),
    clearFibonacchiLimit: (state) => (
      { ...state, fibonacchiLimit: 0 }
    ),
    setRandomArray: (state, action: PayloadAction<Array<number>>) => (
      { ...state, randomArray: action.payload }
    ),
    clearRandomArray: (state) => (
      { ...state, randomArray: [] }
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
} = formsSlice.actions;

export default formsReducer;
