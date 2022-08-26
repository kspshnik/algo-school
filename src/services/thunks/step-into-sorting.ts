import { nanoid } from '@reduxjs/toolkit';
import { AppThunk, nextSortingStep, stopSorting } from '../store';
import { SortingAlgorithmIteratorInterface } from '../../types/algo-struct.types';

const stepIntoSorting : AppThunk = (
  algorithm : SortingAlgorithmIteratorInterface,
) => (dispatch, getState) => {
  const { viewData } = getState().view.sort;

  /*
    const generateView = (
      stepResult : TSortStepResult,
      view : TAlgoView,
    ) : TAlgoView => {
      const {
        array, current, base, ready,
      } = stepResult;
      return array.map((item, index) => (
        {
          value: item,
          isDone: ready.includes(index),
          id: view[index]?.id ?? nanoid(24),
          isChanging: index === base || index === current,
        }
      ));
    };
  */

  const { value, done } = algorithm.next();
  if (done) {
    dispatch(stopSorting());
  } else {
    const {
      array, active, ready,
    } = value;
    dispatch(nextSortingStep(array.map((item, index) => (
      {
        value: item,
        isDone: ready.includes(index),
        id: viewData[index]?.id ?? nanoid(24),
        isChanging: active.includes(index),
      }
    ))));
  }
};

export default stepIntoSorting;
