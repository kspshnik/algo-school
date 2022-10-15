import { nanoid } from '@reduxjs/toolkit';
import {
  AppThunk, nextQueueStep, setQueueEnd, stopQueue,
} from '../store';
import { TStructViewItem } from '../../types/store.types';
import { SHORT_DELAY_IN_MS } from '../../constants';
import QueueNode from '../data-structures/queue-node';
import Queue from '../data-structures/queue';

const enqueueThunk : AppThunk = (queue : Queue, newItem : string) => (dispatch, getState) => {
  const { start, end } = getState().view.queue;
  const node = new QueueNode<string>(newItem);
  if (end === 6) {
    return null;
  }
  let view = [...getState().view.queue.viewData];
  let pos : number;
  let tuple : TStructViewItem;
  if (start === end && !view[end][1].value) {
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
    const [head, base] = view[end];
    view[end] = [head, base, null];

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

  view[pos] = tuple;
  dispatch(nextQueueStep(view));
  queue.enquenue(node);
  dispatch(setQueueEnd(pos));
  setTimeout(() => {
    view = [...getState().view.queue.viewData];
    const [top, { id, value }, bottom] = view[pos];
    tuple = [top,
      {
        id,
        value,
        isChanging: false,
        isDone: true,
      },
      bottom,
    ];
    view[pos] = tuple;
    dispatch(nextQueueStep(view));
    dispatch(stopQueue());
  }, SHORT_DELAY_IN_MS);
  return null;
};

export default enqueueThunk;
