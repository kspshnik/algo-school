import React, { useEffect } from 'react';
import { ControlsLayout, PageLayout, SolutionLayout } from '../../layouts';

import { sortingGenerators } from '../../services/algorithms';
import { useDispatch, useSelector } from '../../services/hooks/store.hooks';
import { AlgorithmsIterator, TSortingChoiceType } from '../../types/types';
import { generateRandomArray, stepIntoSorting } from '../../services/thunks';
import { setSortingDirection, setSortingType, startSorting } from '../../services/store';
import {
  ASC, BUBBLE_SORT, DELAY_IN_MS, DSC, INSERTION_SORT, NONE,
} from '../../constants';
import Direction from '../../types/direction';
import { getElementState } from '../../services/helpers';

import styles from './sorting-page.module.css';
import { Column } from '../../widgets';
import { Button, RadioInput } from '../../ui';

const SortingPage : React.FC = () => {
  const { sortingType, randomArray, direction } = useSelector((state) => state.forms);
  const isReady = useSelector((state) => [ASC, DSC].includes(state.forms.sortingType));
  const { viewData, isActive, isFinished } = useSelector((store) => store.view.sort);
  const dispatch = useDispatch();

  const algorithmIterator : React.MutableRefObject<AlgorithmsIterator | null> = React.useRef(null);
  const anime : React.MutableRefObject<number | null> = React.useRef(null);

  const handleStartAlgorithm = (sortingDir : Direction) => {
    if (!isActive
      && !isFinished
      && (sortingType === INSERTION_SORT || sortingType === BUBBLE_SORT)) {
      algorithmIterator.current = sortingGenerators[sortingType](
        randomArray,
        sortingDir,
      ) as AlgorithmsIterator;
      dispatch(setSortingDirection(sortingDir));
      dispatch(startSorting());
    }
  };

  const handleChangeSorting : React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { value } = evt.target;
    dispatch(setSortingType(value as TSortingChoiceType));
  };
  const handleStartAsc : React.MouseEventHandler<HTMLButtonElement> = () => {
    handleStartAlgorithm(Direction.Ascending);
  };
  const handleStartDsc : React.MouseEventHandler<HTMLButtonElement> = () => {
    handleStartAlgorithm(Direction.Descending);
  };

  const handleNewRandomArrayRequest : React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(generateRandomArray());
  };

  const handleNextStep = React.useCallback(() : void => {
    if (algorithmIterator.current) {
      dispatch(stepIntoSorting(algorithmIterator.current));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(generateRandomArray());
  }, [dispatch]);

  useEffect(() => {
    if (isFinished) {
      algorithmIterator.current = null;
    }
  }, [isFinished, algorithmIterator]);
  useEffect(() => {
    if (isActive) {
      anime.current = setInterval(handleNextStep, DELAY_IN_MS) as unknown as number;
    } else {
      clearInterval(anime.current as number);
      anime.current = null;
    }
    return () => {
      clearInterval(anime.current as number);
      anime.current = null;
    };
  }, [isActive, handleNextStep]);

  return (
    <PageLayout title='Сортировка массива'>
      <ControlsLayout>
        <div className={styles.controls}>
          <fieldset className={styles.radio}>
            <RadioInput
              label='Выбор'
              value={INSERTION_SORT}
              onChange={handleChangeSorting}
              checked={sortingType === INSERTION_SORT}
              name='sort' />
            <RadioInput
              label='Пузырёк'
              value={BUBBLE_SORT}
              onChange={handleChangeSorting}
              checked={sortingType === BUBBLE_SORT}
              name='sort' />
          </fieldset>
          <fieldset className={styles.submits}>
            <Button
              text='По возрастанию'
              isLoader={isActive && direction === Direction.Ascending}
              sorting={Direction.Ascending}
              disabled={(isActive && !isReady) || sortingType === NONE}
              onClick={handleStartAsc} />
            <Button
              text='По убыванию'
              isLoader={isActive && direction === Direction.Descending}
              sorting={Direction.Descending}
              disabled={(isActive && !isReady) || sortingType === NONE}
              onClick={handleStartDsc} />
          </fieldset>
          <Button
            text='Новый массив'
            isLoader={false}
            sorting={Direction.Descending}
            disabled={isActive}
            onClick={handleNewRandomArrayRequest} />
        </div>
      </ControlsLayout>
      <SolutionLayout>
        <SolutionLayout>
          <div
            className={styles.dashboard}>
            {viewData.map(({
              value, isDone, isChanging, id,
            }) => (
              <Column
                key={id}
                index={Number(value)}
                state={getElementState(isChanging, isDone)} />
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            ))}
          </div>
        </SolutionLayout>
      </SolutionLayout>
    </PageLayout>
  );
};

export default SortingPage;
