import React, { useEffect } from 'react';
import { ControlsLayout, PageLayout, SolutionLayout } from '../../layouts';
import { useDispatch, useSelector } from '../../services/hooks/store.hooks';
import { AlgorithmsIterator } from '../../types/types';
import { stepIntoFibonacchi } from '../../services/thunks';
import { fibonacchiGenerator } from '../../services/algorithms';
import { resetFibonacchi, setFibonacchiLimit, startFibonachhi } from '../../services/store';
import { MAX_NUMBER_FIBONACCHI, SHORT_DELAY_IN_MS } from '../../constants';
import styles from './fibonacchi-page.module.css';
import { Button, Input } from '../../ui';
import Circle from '../../widgets/circle/circle';
import { getElementState } from '../../services/helpers';

const FibonacciPage : React.FC = () => {
  const { fibonacchiLimit } = useSelector(((store) => store.forms));
  const { viewData, isActive, isFinished } = useSelector((store) => store.view.fibonachhi);
  const dispatch = useDispatch();

  const algorithmIterator : React.MutableRefObject<AlgorithmsIterator | null> = React.useRef(null);
  const anime : React.MutableRefObject<number | null> = React.useRef(null);
  // let anime : ReturnType<typeof setInterval>;
  const handleChange : React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setFibonacchiLimit(Number(evt.target.value)));
  };
  const handleStartAlgorithm : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive) {
      algorithmIterator.current = fibonacchiGenerator(fibonacchiLimit) as AlgorithmsIterator;
      dispatch(startFibonachhi());
    }
  };

  const handleNextStep = React.useCallback(() : void => {
    if (algorithmIterator.current) {
      dispatch(stepIntoFibonacchi(algorithmIterator.current));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetFibonacchi());
  }, [dispatch]);

  useEffect(() => {
    if (isFinished) {
      algorithmIterator.current = null;
    }
  }, [isFinished, algorithmIterator]);

  useEffect(() => {
    if (isActive) {
      anime.current = setInterval(handleNextStep, SHORT_DELAY_IN_MS) as unknown as number;
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
    <PageLayout title='Последовательность Фибоначчи'>
      <ControlsLayout>
        <div className={styles.controls}>
          <Input
            type='number'
            max={Number(MAX_NUMBER_FIBONACCHI)}
            isLimitText
            placeholder='Введите текст'
            extraClass='mr-6'
            value={String(fibonacchiLimit)}
            onChange={handleChange} />
          <Button
            text='Рассчитать'
            disabled={!(fibonacchiLimit > 0
              && fibonacchiLimit <= Number(MAX_NUMBER_FIBONACCHI)) || isActive}
            isLoader={isActive}
            onClick={handleStartAlgorithm} />
        </div>
      </ControlsLayout>
      <SolutionLayout>
        <div
          className={styles.dashboard}>
          {viewData.map(({
            value, isDone, isChanging, id,
          }, index) => (
            <Circle
              key={id}
              index={index}
              letter={`${value}`}
              state={getElementState(isChanging, isDone)} />
          ))}
        </div>
      </SolutionLayout>
    </PageLayout>
  );
};

export default FibonacciPage;
