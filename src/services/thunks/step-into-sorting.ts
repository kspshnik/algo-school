import { nanoid } from '@reduxjs/toolkit';
import { AppThunk, nextSortingStep, stopSorting } from '../store';
import { AlgorithmsIterator } from '../../types/types';
import { TSortStepResult } from '../../types/algo-struct.types';
import { TAlgoView } from '../../types/store.types';

const stepIntoSorting : AppThunk = (algorithm : AlgorithmsIterator) => (dispatch, getState) => {
  const { viewData } = getState().view.sort;

  const generateView = (
    stepResult : TSortStepResult,
    view : TAlgoView,
  ) : TAlgoView => {
    const {
      value, currentItem, baseItem, doneItems,
    } = stepResult;
    return value.map((item, index) => (
      {
        value: item,
        isDone: doneItems.includes(index),
        id: view[index]?.id ?? nanoid(24),
        isChanging: index === baseItem || index === currentItem,
      }
    ));
  };

  const { value, done } = algorithm.next();
  if (value) {
    dispatch(nextSortingStep(generateView(value as TSortStepResult, viewData)));
    if (done) {
      dispatch(stopSorting());
    }
  }
};

export default stepIntoSorting;
