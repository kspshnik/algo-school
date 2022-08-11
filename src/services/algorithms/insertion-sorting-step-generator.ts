import { TSortStepResult } from '../../types/algo-struct.types';
import { swapItemsInArray } from '../helpers';

function* insertionSortingStepGenerator(
  arr : Array<number>,
) : Generator<TSortStepResult, void, never> {
  const res : TSortStepResult = {
    baseItem: 0,
    currentItem: 0,
    isSwitched: false,
    doneItems: [],
    value: [],
  };
  let start = 0;
  const end: number = arr.length;
  let base: number = start;
  let current: number;
  let work : Array<number> = arr;
  const sorted : Array<number> = [];
  const isDone = () : boolean => work.length === sorted.length;
  while (!isDone()) {
    for (current = start; current < end; current += 1) {
      res.baseItem = base;
      res.currentItem = current;
      res.value = work;
      yield res;
      if (work[base] > work[current]) {
        base = current;
        res.baseItem = base;
        res.currentItem = current;
        yield res;
      }
    }
    work = swapItemsInArray(work, start, base);
    sorted.push(start);
    start += 1;
    res.value = work;
    res.doneItems = sorted;
    yield res;
  }
}

export default insertionSortingStepGenerator;
