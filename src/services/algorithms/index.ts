import reverseStringGenerator from './reverse-string-generator';
import fibonacchiGenerator from './fibonacchi-generator';
import insertionSortingStepGenerator from './insertion-sorting-step-generator';
import bubbleSortingStepGenerator from './bubble-sorting-step-generator';
import { TSortGeneratorsObject } from '../../types/types';

export const sortingGenerators : TSortGeneratorsObject = {
  BUBBLE: bubbleSortingStepGenerator,
  INSERTION: insertionSortingStepGenerator,
};

export {
  reverseStringGenerator,
  fibonacchiGenerator,
  insertionSortingStepGenerator,
  bubbleSortingStepGenerator,
};
