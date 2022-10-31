import { nanoid } from '@reduxjs/toolkit';
import { AppThunk, nextListStep, stopList } from '../store';
import List from '../data-structures/list';
import ListNode from '../data-structures/list-node';
import { ListStepIteratorInterface } from '../../types/algo-struct.types';
import { TAlgoViewItem, TStructViewItem } from '../../types/store.types';

const insertAtIndexThunk : AppThunk = (
  list : List,
  item : string,
  index : number,
  stepGenerator : ListStepIteratorInterface,
) => (dispatch, getState) => {
  const { value: current, done } = stepGenerator.next();
  if (!done) {
    const view = [...getState().view.list.viewData];
    if (current === 0) {
      const [, body, tail] = view[current];
      const insertable : TAlgoViewItem = {
        isDone: false,
        isChanging: true,
        value: item,
        id: nanoid(24),
      };
      view[current] = [insertable, { ...body, isChanging: true }, tail];
      dispatch(nextListStep(view));
    } else if (current > 0) {
      const [head, prevBody, prevTail] = view[current - 1];
      const [, body, tail] = view[current];
      const prev = current === 1 ? 'head' : null;
      view[current - 1] = [prev, prevBody, prevTail];
      view[current] = [head, { ...body, isChanging: true }, tail];
      dispatch(nextListStep(view));
    } else {
      throw new RangeError('List index is out of range!');
    }
  } else {
    const node = new ListNode<string>(item);
    list.insertAtPosition(node, index);
    let view = [...getState().view.list.viewData];
    const insertable : TAlgoViewItem = {
      isDone: true,
      isChanging: false,
      value: item,
      id: nanoid(24),
    };
    const first = view.slice(0, index - 1)
      .map((elem) => {
        const [hd, bd, tl] = elem;
        return [hd, { ...bd, isChanging: false }, tl] as TStructViewItem;
      });
    const last = view.slice(index, view.length)
      .map((elem, idx) => {
        const [hd, bd, tl] = elem;
        return [idx === 0 ? null : hd, { ...bd, isChanging: false }, tl] as TStructViewItem;
      });
    const [, bdy, til] = view[index - 1];
    const prev = [null, { ...bdy, isChanging: false }, til] as TStructViewItem;
    const base : TStructViewItem = [null, insertable, null];
    dispatch(nextListStep([...first, prev, base, ...last]));
    setTimeout(() => {
      view = [...getState().view.list.viewData];
      dispatch(nextListStep(view.map((elem) => {
        const [hd, bd, tl] = elem;
        return [hd, { ...bd, isDone: false }, tl] as TStructViewItem;
      })));
      dispatch(stopList());
    });
  }
};

export default insertAtIndexThunk;
