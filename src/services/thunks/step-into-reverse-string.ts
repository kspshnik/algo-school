import { AppThunk, nextStringReverseStep, stopStringReverse } from '../store';
import { StringAlgorithmIteratorInterface, TStringStepResult } from '../../types/algo-struct.types';

const stepIntoReverseString : AppThunk = (
  algorithm : StringAlgorithmIteratorInterface,
) => (dispatch, getState) => {
  const { isActive, isFinished, viewData } = getState().view.string;

  if (isActive && !isFinished) {
    const { value, done } = algorithm.next();
    const { str, ready, changing } = value as TStringStepResult;
    if (value) {
      dispatch(nextStringReverseStep(str.split('').map((chr, index) => ({
        value: chr,
        isChanging: changing.includes(index),
        isDone: ready.includes(index),
        id: viewData[index].id,
      }))));
    }

    if (done || ready.length >= str.length) {
      dispatch(stopStringReverse());
    }

    /*   if (isChangingNow) {
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
       } */
  }
};

export default stepIntoReverseString;
