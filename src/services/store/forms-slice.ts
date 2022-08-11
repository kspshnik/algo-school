import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFormsSliceState } from '../../types/store.types';
import { TSortingDirection, TSortingChoiceType } from '../../types/types';
import { NONE } from '../../constants';

const initialState : TFormsSliceState = {
  string: '',
  fibonacchiLimit: 0,
  randomArray: [],
  sortingType: NONE,
  sortingDir: NONE,
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
    setSortingType: (state, action : PayloadAction<TSortingChoiceType>) => (
      { ...state, sortingType: action.payload }
    ),
    clearSortingType: (state) => (
      { ...state, sortingType: NONE }
    ),
    setSortingDirection: (state, action: PayloadAction<TSortingDirection>) => (
      { ...state, sortingDir: action.payload }
    ),
    clearSortingDirections: (state) => (
      { ...state, sortingDir: NONE }
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
  setSortingDirection,
  clearSortingType,
  clearSortingDirections,
} = formsSlice.actions;

export default formsReducer;
