import { nanoid } from '@reduxjs/toolkit';
import {
  AppThunk, nextQueueStep, setQueueEnd, stopQueue,
} from '../store';
import { TStructViewItem } from '../../types/store.types';
import { SHORT_DELAY_IN_MS } from '../../constants';
import QueueNode from '../data-structures/queue-node';
import Queue from '../data-structures/queue';

const enqueueThunk : AppThunk = (queue : Queue, newItem : string) => (dispatch, getState) => {
  const { viewData, start, end } = getState().view.stack;
  const node = new QueueNode<string>(newItem);
  if (end === 6) {
    return null;
  }
  const freshView = viewData;
  const pos = start === end ? end : end + 1;
  let tuple : TStructViewItem;
  if (start === end) {
    pos = end;
    tuple = [
      'head',
      {
        id: nanoid(24),
        isDone: false,
        isChanging: true,
        value: node.value,
      },
      'tail',
    ];
  } else {
    pos = end + 1;
    let [head, base, tail] = freshView[end];
    freshView[end] = [head, base, null];
    [head, base, tail] = freshView[pos];

    tuple = [
      null,
      {
        id: nanoid(24),
        isDone: false,
        isChanging: true,
        value: node.value,
      },
      'tail',
    ];
  }
  freshView[pos] = tuple;
  dispatch(nextQueueStep(freshView));
  queue.enquenue(node);
  setQueueEnd(pos);
  setTimeout(() => {
    const [top, { id, value }, bottom] = freshView[pos];
    freshView[pos] = [top,
      {
        id,
        value,
        isChanging: false,
        isDone: true,
      },
      bottom,
    ];
    dispatch(nextQueueStep(freshView));
    dispatch(stopQueue());
  }, SHORT_DELAY_IN_MS);
};

export default enqueueThunk;
