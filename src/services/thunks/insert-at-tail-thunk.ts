import { nanoid } from '@reduxjs/toolkit';
import { AppThunk, nextListStep, stopList } from '../store';
import List from '../data-structures/list';
import ListNode from '../data-structures/list-node';
import { TAlgoViewItem, TStructViewItem } from '../../types/store.types';
import { SHORT_DELAY_IN_MS } from '../../constants';

const insertAtTailThunk : AppThunk = (list : List, newItem : string) => (dispatch, getState) => {
  const node = new ListNode<string>(newItem);
  let view = [...getState().view.list.viewData];
  const last = view.length - 1;
  let [head, body, tail] = view[last];
  const insertable : TAlgoViewItem = {
    isDone: false,
    isChanging: true,
    value: newItem,
    id: nanoid(24),
  };
  view[last] = [
    insertable,
    body,
    tail,
  ];
  dispatch(nextListStep(view));
  list.insertAtTail(node);
  setTimeout(() => {
    view = [...getState().view.list.viewData];
    let lastItem = view[last];
    [, body] = lastItem;
    view[last] = [null, body, null];
    const tuple = [
      null,
      {
        ...insertable,
        isChanging: false,
        isDone: true,
      },
      'tail',
    ];

    dispatch(nextListStep([...view, tuple as TStructViewItem]));
    setTimeout(() => {
      view = [...getState().view.list.viewData];
      lastItem = view[last];
      [head, body, tail] = lastItem;
      view[last] = [head, { ...body, isDone: false }, tail];
      dispatch(nextListStep(view));
      dispatch(stopList());
    }, SHORT_DELAY_IN_MS);
  }, SHORT_DELAY_IN_MS);
  return null;
};

export default insertAtTailThunk;
