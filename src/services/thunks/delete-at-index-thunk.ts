import { nanoid } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { AppThunk, nextListStep, stopList } from '../store';
import List from '../data-structures/list';
import { ListStepIteratorInterface } from '../../types/algo-struct.types';
import { TAlgoViewItem, TStructView, TStructViewItem } from '../../types/store.types';
import { SHORT_DELAY_IN_MS } from '../../constants';

const deleteAtIndexThunk : AppThunk = (
  list : List,
  index : number,
  stepGenerator : ListStepIteratorInterface,
) => (dispatch, getState) => {
  const { value: current, done } = stepGenerator.next();
  if (!done) {
    const view = [...getState().view.list.viewData];
    const [head, body, tail] = view[current];
    view[current] = [head, { ...body, isChanging: true }, tail];
    dispatch(nextListStep(view));
  } else {
    dispatch(stopList());
    let view = [...getState().view.list.viewData];
    const [head, insertable] = view[index];
    const body : TAlgoViewItem = {
      isDone: false,
      isChanging: true,
      value: '',
      id: nanoid(24),
    };
    view[index] = [head, body, insertable];
    dispatch(nextListStep(view));

    setTimeout(() => {
      view = [...getState().view.list.viewData];
      const first = view.slice(0, index)
        .map((elem, idx) => {
          const [hd, bd, tl] = elem;
          return [idx === 0 ? 'head' : hd, { ...bd, isChanging: false }, tl] as TStructViewItem;
        });
      let last : TStructView;
      if (index < view.length) {
        last = view.slice(index + 1, view.length)
          .map((elem) => {
            const [hd, bd, tl] = elem;
            return [hd, { ...bd, isChanging: false }, tl] as TStructViewItem;
          });
      } else if (index === view.length) {
        last = [];
      } else {
        throw new RangeError('Index is out of range!');
      }
      batch(() => {
        dispatch(nextListStep([...first, ...last]));
      });
    }, SHORT_DELAY_IN_MS);
  }
};

export default deleteAtIndexThunk;
