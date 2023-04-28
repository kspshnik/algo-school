import { SortingAlgorithmIteratorInterface } from '../../types/algo-struct.types';
import { swapItemsInArray } from '../helpers';
import Direction from '../../types/direction';

function* insertionSortingStepGenerator(
  arr : Array<number>,
  direction : Direction,
) : SortingAlgorithmIteratorInterface {
  const isAsc = direction === Direction.Ascending;
  let start : number;
  const end = arr.length;
  let base : number;
  let current : number;
  let work : Array<number> = arr;
  const sorted : Array<number> = [];
  const isDone = () : boolean => work.length === sorted.length;
  start = 0;
  base = 0;
  while (!isDone()) {
    for (current = start + 1; current < end; current += 1) {
      yield {
        active: [base, current],
        ready: sorted,
        array: work,
      };
      const criteria = isAsc ? work[base] > work[current] : work[current] > work[base];
      if (criteria) {
        base = current;
      }
    }
    yield {
      active: [start, base],
      ready: sorted,
      array: work,
    };
    work = swapItemsInArray(work, start, base);
    sorted.push(start);
    start += 1;
    base = start;
    yield {
      active: [],
      ready: sorted,
      array: work,
    };
  }
}

export default insertionSortingStepGenerator;
