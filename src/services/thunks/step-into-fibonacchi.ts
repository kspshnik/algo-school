import { nanoid } from '@reduxjs/toolkit';
import { AppThunk, nextFibonacchiStep, stopFibonacchi } from '../store';
import { AlgorithmsIterator } from '../../types/types';
import { TAlgoView } from '../../types/store.types';

const stepIntoFibonacchi : AppThunk = (
  algorithm : AlgorithmsIterator,
) => (dispatch, getState) => {
  const generateView = (
    next : Array<number>,
    prev : Array<number>,
    view : TAlgoView,
  ) : TAlgoView => next.map((item, index) => ({
    value: String(next[index]),
    isChanging: index >= prev.length,
    isDone: view[index]?.isDone && index < prev.length,
    id: view[index]?.id ?? nanoid(24),
  }));

  const { isActive, isFinished, viewData } = getState().view.fibonachhi;
  if (isActive && !isFinished) {
    if (viewData.some((item) => item.isChanging)) {
      dispatch(nextFibonacchiStep(viewData.map(
        ({
          isChanging,
          isDone,
          value,
          id,
        }) => ({
          value,
          isDone: isChanging || isDone,
          isChanging: false,
          id,
        }),
      )));
    } else {
      const previous = viewData.map((item) => item.value);
      const { value, done } = algorithm.next();
      if (done) {
        dispatch(nextFibonacchiStep(viewData.map(
          (item) => (
            {
              id: item.id,
              value: item.value,
              isChanging: false,
              isDone: false,
            }
          ),
        )));
        dispatch(stopFibonacchi());
      } else {
        dispatch(nextFibonacchiStep(generateView(
          value as Array<number>,
          previous as Array<number>,
          viewData,
        )));
      }
    }
  }
};

export default stepIntoFibonacchi;
