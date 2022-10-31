import { nanoid } from '@reduxjs/toolkit';
import { TAlgoView } from '../../types/store.types';

const makeViewFromArray = (
  arr : Array<number>,
) : TAlgoView => arr.map((item, index) => (
  {
    value: item,
    isChanging: false,
    isDone: false,
    id: nanoid(24),
  }
));

export default makeViewFromArray;
