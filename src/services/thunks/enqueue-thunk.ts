import { nanoid } from '@reduxjs/toolkit';
import {
  AppThunk, nextQueueStep, setQueueEnd, stopQueue,
} from '../store';
import { TStructView, TStructViewItem } from '../../types/store.types';
import { SHORT_DELAY_IN_MS } from '../../constants';
import QueueNode from '../data-structures/queue-node';
import Queue from '../data-structures/queue';

const enqueueThunk : AppThunk = (queue : Queue, newItem : string) => (dispatch, getState) => {
  const { viewData, start, end } = getState().view.queue;
  const node = new QueueNode<string>(newItem);
  if (end === 6) {
    return null;
  }
  console.log('viewData:');
  console.dir(viewData);
  const freshView = [...viewData];
  console.log('freshView:');
  console.dir(freshView);
  let pos : number;
  let tuple : TStructViewItem;
  console.log(`freshView[end][1].value = '${freshView[end][1].value}', !!freshView[end][1].value = ${!freshView[end][1].value}`);
  if (start === end && !freshView[end][1].value) {
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
    const [head, base] = freshView[end];
    freshView[end] = [head, base, null];
    // [head, base] = freshView[pos];

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
  dispatch(setQueueEnd(pos));
  let newView : TStructView;
  setTimeout(() => {
    newView = [...freshView];
    console.log('newView in callback');
    console.dir(newView);
    console.log(`pos = ${pos}\nnewView[pos]:`);
    console.dir(newView[pos]);
    const [top, { id, value }, bottom] = freshView[pos];
    tuple = [top,
      {
        id,
        value,
        isChanging: false,
        isDone: true,
      },
      bottom,
    ];
    newView[pos] = tuple;
    dispatch(nextQueueStep(newView));
    dispatch(stopQueue());
  }, SHORT_DELAY_IN_MS);
  return null;
};

export default enqueueThunk;
