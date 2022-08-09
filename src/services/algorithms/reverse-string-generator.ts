import { reverseStringStep } from './index';

function* reverseStringGenerator(str: string) : Generator<string, void, never> {
  if (str.length > 2) {
    let head = 0;
    let tail = str.length - 1;
    let oldStr = str;
    do {
      const newStr = reverseStringStep(oldStr, head, tail);
      yield newStr;
      head += 1;
      tail -= 1;
      oldStr = newStr;
    } while (head < tail);
  } else {
    yield str;
  }
}

export default reverseStringGenerator;
