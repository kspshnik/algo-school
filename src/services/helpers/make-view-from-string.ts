import { nanoid } from '@reduxjs/toolkit';
import { TAlgoView } from '../../types/store.types';

const makeViewFromString = (next : string, prev : string, view : TAlgoView) : TAlgoView => {
  const res : TAlgoView = [];
  let i = 0;
  let j = 0;
  // eslint-disable-next-line no-debugger
  debugger;
  if (next.length === 0) {
    return res;
  }
  do {
    if (next[i] === prev[j]) { // совпадают
      const {
        value, isDone, id, isChanging,
      } = view[i];
      res[i] = value === next[i] ? view[i] : {
        value: next[i], isDone: false, isChanging: false, id,
      };
      i += 1;
      j += 1;
    } else if (next[i] !== prev[j] && next[i] === prev[j + 1]) { // удалили
      j += 1;
    } else { // добавили или заменили полностью
      res[i] = {
        isDone: false,
        isChanging: false,
        value: next[i],
        id: nanoid(24),
      };
      i += 1;
    }
  } while (i < next.length);
  return res;
};

export default makeViewFromString;
