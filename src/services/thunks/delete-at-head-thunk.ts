import { nanoid } from '@reduxjs/toolkit';
import { AppThunk, nextListStep, stopList } from '../store';
import List from '../data-structures/list';
import { TAlgoViewItem } from '../../types/store.types';
import { SHORT_DELAY_IN_MS } from '../../constants';

const deleteAtHeadThunk : AppThunk = (list : List) => (dispatch, getState) => {
  let view = [...getState().view.list.viewData];
  const start = 0;
  let [[head, body, tail]] = view;
  const insertable : TAlgoViewItem = {
    id: nanoid(24),
    value: body.value,
    isChanging: true,
    isDone: false,
  };
  view[start] = [
    head,
    { ...body, value: '' },
    insertable,
  ];
  dispatch(nextListStep(view));
  list.deleteAtHead();
  setTimeout(() => {
    view = [...getState().view.list.viewData.slice(1)];
    [[head, body, tail]] = view;
    view[start] = ['head', body, tail];
    dispatch(nextListStep(view));
    dispatch(stopList());
  }, SHORT_DELAY_IN_MS);
  return null;
};

export default deleteAtHeadThunk;
