import { nanoid } from '@reduxjs/toolkit';
import { AppThunk, nextFibonacchiStep, stopFibonacchi } from '../store';
import { FibonacchiAlgorithmIteratorInterface } from '../../types/algo-struct.types';

const stepIntoFibonacchi : AppThunk = (
  algorithm : FibonacchiAlgorithmIteratorInterface,
) => (dispatch, getState) => {
  const { isActive, isFinished, viewData } = getState().view.fibonachhi;
  if (isActive && !isFinished) {
    const { value, done } = algorithm.next();
    if (done) {
      dispatch(stopFibonacchi());
    } else {
      dispatch(nextFibonacchiStep(value.map((item, index) => ({
        value: item,
        isChanging: false,
        isDone: false,
        id: viewData[index]?.id ?? nanoid(24),
      }))));
    }
  }
};

export default stepIntoFibonacchi;
