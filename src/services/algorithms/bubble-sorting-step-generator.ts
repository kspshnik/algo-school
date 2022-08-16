import { TSortStepResult } from '../../types/algo-struct.types';

import { swapItemsInArray } from '../helpers';
import { Direction } from '../../types/direction';

function* bubbleSortingStepGenerator(
  arr : Array<number>,
  direction : Direction,
) : Generator<TSortStepResult, void, never> {
  const res : TSortStepResult = {
    baseItem: 0,
    currentItem: 0,
    doneItems: [],
    value: [],
  };
  // const directionMultiplier = direction === Direction.Descending ? -1 : 1;
  // const directionCorrector = direction === Direction.Ascending;
  const [start, finish, step, corrector] = direction === Direction.Descending
    ? [arr.length - 1, 0, -1, false]
    : [0, arr.length - 1, 1, true];
  //  let end : number = direction === Direction.Descending ? 0 : arr.length - 1;
  let end : number = finish;
  let base : number = start;
  let current : number;
  let work : Array<number> = arr;
  const sorted : Array<number> = [];
  const isDone = () : boolean => work.length === sorted.length;
  while (!isDone()) {
    for (base = start; (((end - base) * step - 1) > 0); base += step) {
      current = base + step;
      res.baseItem = base;
      res.currentItem = current;
      res.value = work;
      yield res;
      const criteria = corrector ? work[base] > work[current] : work[current] > work[base];
      if (criteria) {
        work = swapItemsInArray(work, base, current);
        res.baseItem = base;
        res.currentItem = current;
        res.value = work;
        yield res;
      }
    }
    sorted.push(end);
    end -= 1;
    res.value = work;
    res.doneItems = sorted;
    yield res;
  }
}

export default bubbleSortingStepGenerator;
