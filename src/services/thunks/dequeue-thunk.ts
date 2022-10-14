import {
  AppThunk, nextQueueStep, setQueueStart, stopQueue,
} from '../store';
import { SHORT_DELAY_IN_MS } from '../../constants';
import QueueNode from '../data-structures/queue-node';
import Queue from '../data-structures/queue';

const dequeueThunk : AppThunk = (queue : Queue) => (dispatch, getState) => {
  const { viewData, start, end } = getState().view.queue;
  if (queue.length < 1 || start > end) {
    console.log('Фихня какая-то!');
    return null;
  }
  const freshView = [...viewData];
  let pos = start;
  let [head, { id, value }, tail] = freshView[pos];
  freshView[pos] = [
    head,
    {
      id,
      value,
      isChanging: true,
      isDone: false,
    },
    tail,
  ];
  dispatch(nextQueueStep(freshView));
  queue.dequeue();
  pos = start === end ? start : start + 1;
  const newView = [...freshView];
  setTimeout(() => {
    [head, { id, value }, tail] = newView[pos];
    if (start === pos) {
      newView[pos] = [
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
      newView[pos] = [
        'head',
        {
          id,
          value,
          isChanging: false,
          isDone: true,
        },
        tail,
      ];
      [head, { id, value }, tail] = freshView[start];
      newView[start] = [
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

    dispatch(nextQueueStep(newView));
    dispatch(setQueueStart(start + 1));
    dispatch(stopQueue());
  }, SHORT_DELAY_IN_MS);
  return null;
};

export default dequeueThunk;
