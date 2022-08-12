import { AppThunk, nextSortingStep } from '../store';
import { getRandomArray, makeViewFromArray } from '../helpers';
import {
  MAX_ARRAY_LENGTH, MAX_VALUE, MIN_ARRAY_LENGTH, MIN_VALUE,
} from '../../constants';

const setRandomArray : AppThunk = () => (dispatch) => {
  const arr = getRandomArray(
    MIN_VALUE as number,
    MAX_VALUE as number,
    MIN_ARRAY_LENGTH as number,
    MAX_ARRAY_LENGTH as number,
  );
  dispatch(setRandomArray(arr));
  dispatch(nextSortingStep(makeViewFromArray(arr)));
};
