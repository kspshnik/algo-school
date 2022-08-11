import { TSortStepResult } from '../../types/algo-struct.types';

import { swapItemsInArray } from '../helpers';

function* bubbleSortingStepGenerator(
  arr : Array<number>,
) : Generator<TSortStepResult, void, never> {
  const res : TSortStepResult = {
    baseItem: 0,
    currentItem: 0,
    isSwitched: false,
    doneItems: [],
    value: [],
  };
  const start = 0;
  let end: number = arr.length - 1;
  let base: number = start;
  let current: number;
  let work : Array<number> = arr;
  const sorted : Array<number> = [];
  const isDone = () : boolean => work.length === sorted.length;
  while (!isDone()) {
    for (base = start; base < end - 1; base += 1) {
      current = base + 1;
      res.baseItem = base;
      res.currentItem = current;
      res.value = work;
      yield res;
      if (work[base] > work[current]) {
        work = swapItemsInArray(work, base, current);
        res.baseItem = base;
        res.currentItem = current;
        res.value = work;
        yield res;
      }
    }
    sorted.push(end);
    end += 1;
    res.value = work;
    res.doneItems = sorted;
    yield res;
  }
}

export default bubbleSortingStepGenerator;
