import { AppThunk, nextStringReverseStep, stopStringReverse } from '../store';
import { StringAlgorithmIteratorInterface } from '../../types/algo-struct.types';

const stepIntoReverseString : AppThunk = (
  algorithm : StringAlgorithmIteratorInterface,
) => (dispatch, getState) => {
  const { isActive, isFinished, viewData } = getState().view.string;

  if (isActive && !isFinished) {
    const { value, done } = algorithm.next();
    if (done) {
      dispatch(stopStringReverse());
    } else {
      const { str, ready, changing } = value;
      if (value) {
        dispatch(nextStringReverseStep(str.split('').map((chr, index) => ({
          value: chr,
          isChanging: changing.includes(index),
          isDone: ready.includes(index),
          id: viewData[index].id,
        }))));
      }
    }
  }
};

export default stepIntoReverseString;
