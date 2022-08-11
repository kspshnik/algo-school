import { AppThunk, nextStringReverseStep, stopStringReverse } from '../store';
import { AlgorithmsIterator } from '../../types/types';
import { TAlgoView } from '../../types/store.types';

const stepIntoReverseString : AppThunk = (
  algorithm : AlgorithmsIterator,
) => (dispatch, getState) => {
  const isLastInTheMiddle = (str : string, index : number, view : TAlgoView) : boolean => {
    const middle = Math.floor(view.length / 2);
    return (index === middle) && !!(view.length % 2)
      && view.slice(middle + 1, view.length).every((item) => item.isDone)
      && view.slice(0, middle).every((item) => item.isDone);
  };
  const generateView = (
    next : string,
    prev : string,
    view : TAlgoView,
  ) : TAlgoView => next.split('').map((item, index) => ({
    value: next[index],
    isChanging: next[index] !== prev[index] || isLastInTheMiddle(next, index, view),
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
