import { BUBBLE_SORT, INSERTION_SORT } from '../constants/type-literals';

export type TSortingType = typeof BUBBLE_SORT | typeof INSERTION_SORT;

export type TAlgoData = string | Array<number>;

export interface AlgorithmsGenerator {
  (data : TAlgoData) : AlgorithmsIterator;
}

export type AlgorithmsIterator = Generator<string | number | Array<number>, void, never>;

export interface AlgorithmIterationHookInterface {
  (generator : AlgorithmsGenerator, data : TAlgoData) : React.MutableRefObject<AlgorithmsIterator>,
}
