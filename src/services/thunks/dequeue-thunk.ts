import {
  AppThunk, nextQueueStep, setQueueStart, stopQueue,
} from '../store';
import { SHORT_DELAY_IN_MS } from '../../constants';
import Queue from '../data-structures/queue';

const dequeueThunk : AppThunk = (queue : Queue) => (dispatch, getState) => {
  const { start, end } = getState().view.queue;
  if (queue.length < 1 || start > end) {
    return null;
  }
  let view = [...getState().view.queue.viewData];
  let pos = start;
  let [head, { id, value }, tail] = view[pos];
  view[pos] = [
    head,
    {
      id,
      value,
      isChanging: true,
      isDone: false,
    },
    tail,
  ];
  dispatch(nextQueueStep(view));
  queue.dequeue();
  pos = start === end ? start : start + 1;
  view = [...getState().view.queue.viewData];
  setTimeout(() => {
    [head, { id, value }, tail] = view[pos];
    if (start === pos) {
      view[pos] = [
        null,
        {
          id,
          value,
          isChanging: false,
          isDone: true,
        },
        null,
      ];
    } else {
      view[pos] = [
        'head',
        {
          id,
          value,
          isChanging: false,
          isDone: true,
        },
        tail,
      ];
      [head, { id, value }, tail] = view[start];
      view[start] = [
        null,
        {
          id,
          value: '',
          isChanging: false,
          isDone: true,
        },
        tail,
      ];
    }

    dispatch(nextQueueStep(view));
    dispatch(setQueueStart(start + 1));
    dispatch(stopQueue());
  }, SHORT_DELAY_IN_MS);
  return null;
};

export default dequeueThunk;
