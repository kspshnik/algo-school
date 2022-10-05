import { nanoid } from '@reduxjs/toolkit';
import Stack from '../data-structures/stack';
import { AppThunk, nextStackStep, stopStack } from '../store';
import StackNode from '../data-structures/stack-node';
import { TStructView, TStructViewItem } from '../../types/store.types';
import { SHORT_DELAY_IN_MS } from '../../constants';

const pushToStackThunk : AppThunk = (stack : Stack, newItem : string) => (dispatch, getState) => {
  const { viewData } = getState().view.stack;
  const node = new StackNode<string>(newItem);
  let freshView : TStructView;
  stack.push(node);
  const stackArray = stack.toArray();
  viewData.length = stackArray.length;
  freshView = viewData.map((item, index) => {
    if (item) {
      const [top, base, bottom] = item;
      return [null, base, bottom] as TStructViewItem;
    }
    return [
      'top',
      {
        id: nanoid(24),
        isDone: false,
        isChanging: true,
        value: stackArray[index].value,
      },
      String(index),
    ] as TStructViewItem;
  });
  dispatch(nextStackStep(freshView));
  setTimeout(() => {
    freshView = [...viewData];
    const [top, { id, value }, bottom] = freshView[freshView.length - 1] as TStructViewItem;
    freshView[freshView.length - 1] = [top,
      {
        id,
        value,
        isChanging: false,
        isDone: true,
      },
      bottom,
    ];
    dispatch(nextStackStep(freshView));
    dispatch(stopStack());
  }, SHORT_DELAY_IN_MS);
};

export default pushToStackThunk;
