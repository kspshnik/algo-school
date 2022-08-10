import { nanoid } from '@reduxjs/toolkit';
import { TAlgoView } from '../../types/store.types';

const makeViewFromString = (next: string, prev: string, view: TAlgoView) : TAlgoView => {
  const res : TAlgoView = [];
  let i = 0;
  let j = 0;
  if (next.length === 0) {
    return res;
  }
  do {
    if (next[i] === prev[j]) { // совпадают
      res[i] = view[i];
      i += 1;
      j += 1;
    } else if (next[i] !== prev[j] && next[i + 1] === prev[j]) { // добавили
      res[i] = {
        isDone: false,
        isChanging: false,
        value: next[i],
        id: nanoid(24),
      };
      i += 1;
    } else if (next[i] !== prev[j] && next[i] === prev[j + 1]) {
      j += 1;
    }
  } while (i < next.length);
  return res;
};

export default makeViewFromString;
