import {
  ASC, BUBBLE_SORT, DSC, INSERTION_SORT, NONE,
} from '../constants/type-literals';

export type TSortingType = typeof BUBBLE_SORT | typeof INSERTION_SORT | typeof NONE;

export type TSortingDirection = typeof ASC | typeof DSC | typeof NONE;

export type TAlgoData = string | Array<number>;

export interface AlgorithmsGenerator {
  (data : TAlgoData) : AlgorithmsIterator;
}

export type AlgorithmsIterator = Generator<string | number | Array<number>, void, never>;

export interface AlgorithmIterationHookInterface {
  (generator : AlgorithmsGenerator, data : TAlgoData) : React.MutableRefObject<AlgorithmsIterator>,
}
