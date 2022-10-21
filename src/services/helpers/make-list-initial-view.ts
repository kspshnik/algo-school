import { nanoid } from '@reduxjs/toolkit';
import { TStructView } from '../../types/store.types';
import makeEmptyTuple from './make-empty-tuple';
import generateRandomInt from './generate-random-int';

const makeListInitialView = () : TStructView => {
  const qty = 3 + generateRandomInt(4);
  const res : TStructView = [];
  for (let i = 0; i < qty; i += 1) {
    res.push(makeEmptyTuple());
  }
  res[0] = [
    'head',
    {
      isChanging: false,
      isDone: false,
      id: nanoid(24),
      value: generateRandomInt(9999).toFixed(0),
    },
    null,
  ];
  for (let i = 1; i < res.length - 1; i += 1) {
    res[i] = [
      null,
      {
        isChanging: false,
        isDone: false,
        id: nanoid(24),
        value: generateRandomInt(9999).toFixed(0),
      },
      null,
    ];
  }
  res[res.length - 1] = [
    null,
    {
      isChanging: false,
      isDone: false,
      id: nanoid(24),
      value: generateRandomInt(9999).toFixed(0),
    },
    'tail',
  ];

  return res;
};

export default makeListInitialView;
