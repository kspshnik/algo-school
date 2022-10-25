import { nanoid } from '@reduxjs/toolkit';
import { AppThunk, nextListStep } from '../store';
import { generateRandomInt, makeEmptyTuple } from '../helpers';
import { TStructView } from '../../types/store.types';
import List from '../data-structures/list';
import ListNode from '../data-structures/list-node';

const resetListThunk : AppThunk = (list : List) => (dispatch) => {
  console.dir(list);
  const qty = 3 + generateRandomInt(4);
  const initialListView : TStructView = [];
  for (let i = 0; i < qty; i += 1) {
    initialListView.push(makeEmptyTuple());
  }
  initialListView[0] = [
    'head',
    {
      isChanging: false,
      isDone: false,
      id: nanoid(24),
      value: generateRandomInt(9999).toFixed(0),
    },
    null,
  ];
  for (let i = 1; i < initialListView.length - 1; i += 1) {
    initialListView[i] = [
      null,
      {
        isChanging: false,
        isDone: false,
        id: nanoid(24),
        value: generateRandomInt(9999).toFixed(0),
      },
      null,
    ];
  }
  initialListView[initialListView.length - 1] = [
    null,
    {
      isChanging: false,
      isDone: false,
      id: nanoid(24),
      value: generateRandomInt(9999).toFixed(0),
    },
    'tail',
  ];
  initialListView.forEach(([, { value }]) => {
    const node = new ListNode<string>(`${value}`);
    list.insertAtTail(node);
  });
  dispatch(nextListStep(initialListView));
};

export default resetListThunk;
