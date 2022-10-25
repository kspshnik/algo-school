import { nanoid } from '@reduxjs/toolkit';
import { AppThunk, nextListStep, stopList } from '../store';
import { TAlgoViewItem, TStructViewItem } from '../../types/store.types';
import { SHORT_DELAY_IN_MS } from '../../constants';
import ListNode from '../data-structures/list-node';
import List from '../data-structures/list';

const insertAtHeadThunk : AppThunk = (list : List, newItem : string) => (dispatch, getState) => {
  const node = new ListNode<string>(newItem);

  let view = [...getState().view.list.viewData];
  let [head, body, tail] = view[0];
  const insertable : TAlgoViewItem = {
    isDone: false,
    isChanging: true,
    value: newItem,
    id: nanoid(24),
  };
  view[0] = [
    insertable,
    body,
    tail,
  ];
  dispatch(nextListStep(view));
  list.insertAtHead(node);
  setTimeout(() => {
    view = [...getState().view.list.viewData];
    [, body] = view[0];
    view[0] = [null, body, null];
    insertable.isChanging = false;
    insertable.isDone = true;
    const tuple = [
      'head',
      insertable,
      null,
    ];

    dispatch(nextListStep([tuple as TStructViewItem, ...view]));
    setTimeout(() => {
      view = [...getState().view.list.viewData];
      [head, body, tail] = view[0];
      body.isDone = false;
      view[0] = [head, body, tail];
      dispatch(nextListStep(view));
      dispatch(stopList());
    }, SHORT_DELAY_IN_MS);
  }, SHORT_DELAY_IN_MS);
  return null;
};

export default insertAtHeadThunk;
