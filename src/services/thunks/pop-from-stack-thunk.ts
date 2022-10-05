import { AppThunk, nextStackStep, stopStack } from '../store';

import Stack from '../data-structures/stack';
import { TStructView, TStructViewItem } from '../../types/store.types';
import { SHORT_DELAY_IN_MS } from '../../constants';

const popFromStackThunk : AppThunk = (stack : Stack) => (dispatch, getState) => {
  const { viewData } = getState().view.stack;
  let freshView : TStructView;
  freshView = [...viewData];
  const [top, { id, value }, bottom] = freshView[freshView.length - 1] as TStructViewItem;
  freshView[freshView.length - 1] = [top,
    {
      id,
      value,
      isChanging: true,
      isDone: false,
    },
    bottom,
  ];
  dispatch(nextStackStep(freshView));
  stack.pop();
  setTimeout(() => {
    freshView = [...viewData] as TStructView;
    const [, base, tail] = freshView[freshView.length - 1];
    freshView[freshView.length - 1] = ['top', base, tail] as TStructViewItem;
    dispatch(nextStackStep(freshView));
    dispatch(stopStack());
  }, SHORT_DELAY_IN_MS);
};

export default popFromStackThunk;
