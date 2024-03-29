import { nanoid } from '@reduxjs/toolkit';
import { AppThunk, nextListStep, stopList } from '../store';
import { TAlgoViewItem, TStructViewItem } from '../../types/store.types';
import { SHORT_DELAY_IN_MS } from '../../constants';
import ListNode from '../data-structures/list-node';
import List from '../data-structures/list';
import { emptyListItem } from '../../constants/store-initial-states';

const insertAtHeadThunk : AppThunk = (list : List, newItem : string) => (dispatch, getState) => {
  const node = new ListNode<string>(newItem);

  let view = [...getState().view.list.viewData];
  if (view.length === 0) {
    view = [emptyListItem];
  }
  let [[head, body, tail]] = view;
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
    let [firstItem] = view;
    [, body, tail] = firstItem;
    view[0] = [null, body, tail];
    const tuple = [
      'head',
      {
        ...insertable,
        isChanging: false,
        isDone: true,
      },
      list.length === 1 ? 'tail' : null,
    ];

    dispatch(
      nextListStep(
        view.length === 1 && list.length < 2
          ? [tuple as TStructViewItem]
          : [tuple as TStructViewItem, ...view],
      ),
    );
    setTimeout(() => {
      view = [...getState().view.list.viewData];
      [firstItem] = view;
      [head, body, tail] = firstItem;
      view[0] = [head, { ...body, isDone: false }, tail];
      dispatch(nextListStep(view));
      dispatch(stopList());
    }, SHORT_DELAY_IN_MS);
  }, SHORT_DELAY_IN_MS);
  return null;
};

export default insertAtHeadThunk;
