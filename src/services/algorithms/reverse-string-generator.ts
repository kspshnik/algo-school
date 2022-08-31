import { TStringStepResult } from '../../types/algo-struct.types';
import { swapItems } from '../helpers';

function* reverseStringGenerator(str : string) : Generator<TStringStepResult, void, never> {
  const res : TStringStepResult = {
    arr: [],
    changing: [],
    ready: [],
  };
  if (str.length >= 2) {
    let head = 0;
    let tail = str.length - 1;
    let work = str.split('');
    do {
      res.arr = work;
      res.changing = [head, tail];
      yield res;
      work = swapItems<string>(work, head, tail);
      res.arr = work;
      res.ready = [...res.ready, head, tail];
      res.changing = [];
      yield res;
      head += 1;
      tail -= 1;
    } while (head <= tail);
  } else {
    res.arr = str.split('');
    if (str.length > 0) {
      res.ready = [1];
    }
    yield res;
  }
}

export default reverseStringGenerator;
