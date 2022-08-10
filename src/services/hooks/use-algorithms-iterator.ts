import React from 'react';
import { AlgorithmIterationHookInterface, AlgorithmsIterator } from '../../types/types';

const useAlgorithmsIterator : AlgorithmIterationHookInterface = (generator, data) => {
  const algoIterator = React.useRef<AlgorithmsIterator>(generator(data));
  return algoIterator;
};
