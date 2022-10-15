import { nanoid } from '@reduxjs/toolkit';
import { TStructViewItem } from '../../types/store.types';

const makeEmptyTuple = () : TStructViewItem => ([
  null,
  {
    id: nanoid(24),
    isDone: true,
    isChanging: false,
    value: '',
  },
  null,
]);

export default makeEmptyTuple;
