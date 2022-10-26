import { nanoid } from '@reduxjs/toolkit';
import { AppThunk, nextListStep, stopList } from '../store';
import List from '../data-structures/list';
import { TAlgoViewItem } from '../../types/store.types';
import { SHORT_DELAY_IN_MS } from '../../constants';

const deleteAtTailThunk : AppThunk = (list : List) => (dispatch, getState) => {
  let view = [...getState().view.list.viewData];
  let last = view.length - 1;
  console.log(`In the beginning last = ${last}, view:`);
  console.dir(view);
  let [head, body, tail] = view[last];
  const insertable : TAlgoViewItem = {
    isDone: false,
    isChanging: true,
    value: body.value,
    id: nanoid(24),
  };
  view[last] = [
    head,
    { ...body, value: '' },
    insertable,
  ];
  dispatch(nextListStep(view));
  list.deleteAtTail();
  setTimeout(() => {
    view = [...getState().view.list.viewData.slice(0, last)];
    if (view.length === 0) {
      dispatch(nextListStep([]));
      dispatch(stopList());
      return null;
    }
    last -= 1;
    [head, body, tail] = view[last];
    view[last] = [head, body, 'tail'];
    dispatch(nextListStep(view));
    dispatch(nextListStep(view));
    dispatch(stopList());
  }, SHORT_DELAY_IN_MS);
  return null;
};

export default deleteAtTailThunk;
