import { AppThunk, nextStringReverseStep, stopStringReverse } from '../store';
import { AlgorithmsIterator } from '../../types/types';
import { TAlgoView } from '../../types/store.types';
import { makeViewFromString } from '../helpers';

const stepIntoReverseString : AppThunk = (
  algorithm : AlgorithmsIterator,
) => (dispatch, getState) => {
  const generateView = (
    next : string,
    prev : string,
    view : TAlgoView,
  ) : TAlgoView => next.split('').map((item, index) => ({
    value: next[index],
    isChanging: next[index] !== prev[index],
    isDone: view[index].isDone && next[index] === prev[index],
    id: view[index].id,
  }));

  const { isActive, isFinished, viewData } = getState().view.string;
  const isChangingNow = viewData.some((item) => item.isChanging);

  if (isActive && !isFinished) {
    if (isChangingNow) {
      dispatch(nextStringReverseStep(viewData.map(
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
      const previous = viewData.map((item) => item.value).join('');
      const { value, done } = algorithm.next();
      if (done) {
        dispatch(stopStringReverse());
      } else {
        dispatch(nextStringReverseStep(generateView(value as string, previous, viewData)));
      }
    }
  }
};

export default stepIntoReverseString;
