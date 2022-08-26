import { SortingAlgorithmIteratorInterface } from '../../types/algo-struct.types';

import { swapItemsInArray } from '../helpers';
import { Direction } from '../../types/direction';

function* bubbleSortingStepGenerator(
  arr : Array<number>,
  direction : Direction,
) : SortingAlgorithmIteratorInterface {
  const isAsc = direction === Direction.Ascending;
  const start = 0;
  let end = arr.length - 1;
  let base : number;
  let current : number;
  let work : Array<number> = arr;
  const sorted : Array<number> = [];
  const isDone = () : boolean => work.length === sorted.length;
  base = 0;
  while (!isDone()) {
    for (base = start; base < end; base += 1) {
      current = base + 1;
      yield {
        active: [base, current],
        ready: sorted,
        array: work,
      };
      const criteria = isAsc
        ? work[base] > work[current]
        : work[current] > work[base];
      if (criteria) {
        work = swapItemsInArray(work, base, current);
        yield {
          active: [base, current],
          ready: sorted,
          array: work,
        };
      }
    }
    sorted.push(end);
    end -= 1;
    yield {
      active: [],
      ready: sorted,
      array: work,
    };
  }
}

export default bubbleSortingStepGenerator;
