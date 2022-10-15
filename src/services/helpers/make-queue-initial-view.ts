import { TStructView } from '../../types/store.types';
import makeEmptyTuple from './make-empty-tuple';

const makeQueueInitialView = (qty : number) : TStructView => {
  const res : TStructView = [];
  for (let i = 0; i < qty; i += 1) {
    res.push(makeEmptyTuple());
  }
  return res;
};

export default makeQueueInitialView;
