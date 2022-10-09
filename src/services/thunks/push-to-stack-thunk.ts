import { nanoid } from '@reduxjs/toolkit';
import Stack from '../data-structures/stack';
import {
  AppThunk, nextStackStep, setStackEnd, stopStack,
} from '../store';
import StackNode from '../data-structures/stack-node';
import { TStructView, TStructViewItem } from '../../types/store.types';
import { SHORT_DELAY_IN_MS } from '../../constants';

const pushToStackThunk : AppThunk = (stack : Stack, newItem : string) => (dispatch, getState) => {
  const { viewData, end } = getState().view.stack;
  const node = new StackNode<string>(newItem);
  let freshView : TStructView;
  // const stackArray = stack.toArray();
  // viewData.length = stackArray.length;
  //  freshView = stackArray.map()
  freshView = viewData.map(([top, base, bottom]) => [null, base, bottom] as TStructViewItem);
  const newCortege : TStructViewItem = [
    'top',
    {
      id: nanoid(24),
      isDone: false,
      isChanging: true,
      value: node.value,
    },
    null,
  ];
  const newViewData = [...freshView, newCortege];
  dispatch(nextStackStep(newViewData));
  stack.push(node);
  setStackEnd(end + 1);
  setTimeout(() => {
    freshView = [...newViewData];
    const [top, { id, value }, bottom] = freshView[freshView.length - 1];
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
