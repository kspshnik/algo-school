import { TSortStepResult } from '../../types/algo-struct.types';
import { swapItemsInArray } from '../helpers';
import { Direction } from '../../types/direction';

function* insertionSortingStepGenerator(
  arr : Array<number>,
  direction : Direction,
) : Generator<TSortStepResult, void, never> {
  const res : TSortStepResult = {
    baseItem: 0,
    currentItem: 0,
    doneItems: [],
    value: [],
  };
  const [begin, end, step, corrector] = direction === Direction.Descending
    ? [arr.length, 0, -1, false]
    : [0, arr.length, 1, true];
  let start : number = begin;
  let base : number = start;
  let current : number;
  let work : Array<number> = arr;
  const sorted : Array<number> = [];
  const isDone = () : boolean => work.length === sorted.length;
  while (!isDone()) {
    for (current = start; current < end; current += step) {
      res.baseItem = base;
      res.currentItem = current;
      res.value = work;
      yield res;
      const criteria = corrector ? work[base] > work[current] : work[current] > work[base];
      if (criteria) {
        base = current;
        res.baseItem = base;
        res.currentItem = current;
        yield res;
      }
    }
    work = swapItemsInArray(work, start, base);
    sorted.push(start);
    start += step;
    res.value = work;
    res.doneItems = sorted;
    yield res;
  }
}

export default insertionSortingStepGenerator;
