import { batch } from 'react-redux';
import { AppThunk, nextStringReverseStep, startStringReverse } from '../store';
import { AlgorithmsIterator } from '../../types/types';
import { TAlgoView } from '../../types/store.types';
import stepIntoReverseString from './step-into-reverse-string';

const invokeReverseString : AppThunk = (algorithm : AlgorithmsIterator) => (dispatch, getState) => {
  const { view: { string: { isActive, isFinished } }, forms: { string } } = getState();
  if (!isActive && !isFinished) {
    const viewData : TAlgoView = [];
    string.split('').forEach((char) => ({
      isDone: false,
      isChanging: false,
      value: char,
    }));
    batch(() => {
      dispatch(nextStringReverseStep(viewData));
      dispatch(startStringReverse());
    });
    dispatch(stepIntoReverseString(algorithm));
  }
};

export default invokeReverseString;
