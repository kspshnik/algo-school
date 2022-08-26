import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFormsSliceState } from '../../types/store.types';
import { TSortingChoiceType } from '../../types/types';
import { NONE } from '../../constants';
import { Direction } from '../../types/direction';

const initialState : TFormsSliceState = {
  string: '',
  fibonacchiLimit: 0,
  randomArray: [],
  sortingType: NONE,
  direction: null,
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
    setSortingDirection: (state, action : PayloadAction<Direction>) => (
      { ...state, direction: action.payload }
    ),
    clearSortingDirections: (state) => (
      { ...state, direction: null }
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
