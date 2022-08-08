import { StringReverseGeneratorInterface } from '../../types/algo-struct.types';

const reverseStringStep : StringReverseGeneratorInterface = (
  str,
  head,
  tail,
) : string => {
  if (head === 0 && head === tail) {
    return '';
  }

  if (head >= str.length || tail >= str.length || head > tail) {
    throw new RangeError('reverseStringStep(): Head and/or tail is/are out of range!');
  }
  if (head === tail) {
    return str;
  }
  return str.slice(0, head).concat(
    str[tail],
    str.slice(head + 1, tail),
    str[head],
    str.slice(tail + 1, str.length),
  );
};

export default reverseStringStep;
