import {
  AppThunk, nextQueueStep, setQueueStart, stopQueue,
} from '../store';
import { SHORT_DELAY_IN_MS } from '../../constants';
import QueueNode from '../data-structures/queue-node';
import Queue from '../data-structures/queue';

const dequeueThunk : AppThunk = (queue : Queue, newItem : string) => (dispatch, getState) => {
  const { viewData, start, end } = getState().view.stack;
  const node = new QueueNode<string>(newItem);
  if (queue.length < 1 || start > end) {
    return null;
  }
  const freshView = viewData;
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
  setTimeout(() => {
    [head, { id, value }, tail] = freshView[pos];
    if (start === pos) {
      freshView[pos] = [
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
      freshView[pos] = [
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
      freshView[start] = [
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

    dispatch(nextQueueStep(freshView));
    setQueueStart(start + 1);
    dispatch(stopQueue());
  }, SHORT_DELAY_IN_MS);
};

export default dequeueThunk;
