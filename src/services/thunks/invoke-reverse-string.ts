import { AppThunk, startStringReverse } from '../store';
import { AlgorithmsIterator } from '../../types/types';
import stepIntoReverseString from './step-into-reverse-string';

const invokeReverseString : AppThunk = (algorithm : AlgorithmsIterator) => (dispatch, getState) => {
  const { isActive, isFinished } = getState().view.string;

  if (!isActive && !isFinished) {
    dispatch(startStringReverse());
    dispatch(stepIntoReverseString(algorithm));
  }
};

export default invokeReverseString;
