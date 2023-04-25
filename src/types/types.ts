import {
  ASC, BUBBLE_SORT, DSC, INSERTION_SORT, NONE,
} from '../constants/type-literals';
import { TSortStepResult, TStringStepResult } from './algo-struct.types';
import Direction from './direction';

export type TSortingChoiceType = typeof BUBBLE_SORT | typeof INSERTION_SORT | typeof NONE;

export type TSortingType = typeof BUBBLE_SORT | typeof INSERTION_SORT;

export interface SortingGeneratorInterface {
  (arr : Array<number>, direction : Direction) : Generator<TSortStepResult, void, never>,
}

export type TSortGeneratorsObject = {
  [key in TSortingType] : SortingGeneratorInterface;
};

export type TSortingDirection = typeof ASC | typeof DSC | typeof NONE;

export type TAlgoData = string | Array<number>;

export interface AlgorithmsGenerator {
  (data : TAlgoData) : AlgorithmsIterator;
}

// eslint-disable-next-line max-len
export type AlgorithmsIterator = Generator<TStringStepResult | Array<number> | TSortStepResult, void, never>;

export interface AlgorithmIterationHookInterface {
  (generator : AlgorithmsGenerator, data : TAlgoData) : React.MutableRefObject<AlgorithmsIterator>,
}
