import reverseStringStep from './reverse-string-step';
import { TStringStepResult } from '../../types/algo-struct.types';

function* reverseStringGenerator(str : string) : Generator<TStringStepResult, void, never> {
  const res : TStringStepResult = {
    str: '',
    changing: [],
    ready: [],
  };
  if (str.length >= 2) {
    let head = 0;
    let tail = str.length - 1;
    let oldStr = str;
    do {
      res.str = oldStr;
      res.changing = [head, tail];
      yield res;
      const newStr = reverseStringStep(oldStr, head, tail);
      res.str = newStr;
      res.ready = [...res.ready, head, tail];
      res.changing = [];
      yield res;
      head += 1;
      tail -= 1;
      oldStr = newStr;
    } while (head <= tail);
  } else {
    res.str = str;
    if (str.length > 0) {
      res.ready = [1];
    }
    yield res;
  }
}

export default reverseStringGenerator;
