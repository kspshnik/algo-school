import { nanoid } from '@reduxjs/toolkit';
import { AppThunk, nextListStep, stopList } from '../store';
import List from '../data-structures/list';
import ListNode from '../data-structures/list-node';
import { TAlgoViewItem, TStructViewItem } from '../../types/store.types';
import { SHORT_DELAY_IN_MS } from '../../constants';
import { emptyListItem } from '../../constants/store-initial-states';

const insertAtTailThunk : AppThunk = (list : List, newItem : string) => (dispatch, getState) => {
  const node = new ListNode<string>(newItem);
  let view = [...getState().view.list.viewData];
  if (view.length === 0) {
    view = [emptyListItem];
  }
  let last = view.length - 1;
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

    [, body] = view[last];
    if (last === 0) {
      view[last] = ['head', body, null];
    } else {
      view[last] = [null, body, null];
    }
    const tuple = [
      list.length === 1 ? 'head' : null,
      {
        ...insertable,
        isChanging: false,
        isDone: true,
      },
      'tail',
    ];

    dispatch(
      nextListStep(
        view.length === 1 && list.length < 2
          ? [tuple as TStructViewItem]
          : [...view, tuple as TStructViewItem],
      ),
    );
    setTimeout(() => {
      view = [...getState().view.list.viewData];
      last = view.length - 1;
      [head, body, tail] = view[last];
      view[last] = [head, { ...body, isDone: false }, tail];
      dispatch(nextListStep(view));
      dispatch(stopList());
    }, SHORT_DELAY_IN_MS);
  }, SHORT_DELAY_IN_MS);
  return null;
};

export default insertAtTailThunk;
