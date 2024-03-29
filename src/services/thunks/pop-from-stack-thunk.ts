import {
  AppThunk, nextStackStep, setStackEnd, stopStack,
} from '../store';

import Stack from '../data-structures/stack';
import { TStructView, TStructViewItem } from '../../types/store.types';
import { SHORT_DELAY_IN_MS } from '../../constants';

const popFromStackThunk : AppThunk = (stack : Stack) => (dispatch, getState) => {
  const { viewData, end } = getState().view.stack;
  let freshView : TStructView;
  console.dir(viewData);
  freshView = [...viewData];
  console.dir(freshView);
  const [top, { id, value }, bottom] = freshView[freshView.length - 1];
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
  setStackEnd(end - 1);
  setTimeout(() => {
    freshView = viewData.slice(0, viewData.length - 1);
    if (freshView.length > 0) {
      const [, base, tail] = freshView[freshView.length - 1];
      freshView[freshView.length - 1] = ['top', base, tail] as TStructViewItem;
    }
    dispatch(nextStackStep(freshView));
    dispatch(stopStack());
  }, SHORT_DELAY_IN_MS);
};

export default popFromStackThunk;
