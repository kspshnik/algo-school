import React, { useEffect } from 'react';
import { ControlsLayout, PageLayout, SolutionLayout } from '../../layouts';
import Circle from '../../widgets/circle/circle';
import { Button, Input } from '../../ui';

import styles from './string-reverse-page.module.css';
import { useDispatch, useSelector } from '../../services/hooks/store.hooks';
import { resetString, setString } from '../../services/store';
import { reverseStringGenerator } from '../../services/algorithms';
import { AlgorithmsIterator } from '../../types/types';
import { getElementState } from '../../services/helpers';
import { startStringThunk, stepIntoReverseString } from '../../services/thunks';
import { DELAY_IN_MS, MAX_STRING_LENGTH } from '../../constants';

const StringReversePage : React.FC = () => {
  const { string } = useSelector(((store) => store.forms));
  const { viewData, isActive, isFinished } = useSelector((store) => store.view.string);
  const dispatch = useDispatch();

  const algorithmIterator : React.MutableRefObject<AlgorithmsIterator | null> = React.useRef(null);
  const anime : React.MutableRefObject<number | null> = React.useRef(null);
  // let anime : ReturnType<typeof setInterval>;
  const handleChange : React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setString(evt.target.value));
  };
  const handleStartAlgorithm : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive) {
      algorithmIterator.current = reverseStringGenerator(string) as AlgorithmsIterator;
      dispatch(startStringThunk());
    }
  };

  const handleNextStep = React.useCallback(() : void => {
    if (algorithmIterator.current) {
      dispatch(stepIntoReverseString(algorithmIterator.current));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetString());
  }, [dispatch]);

  useEffect(() => {
    if (isFinished) {
      algorithmIterator.current = null;
    }
  }, [isFinished, algorithmIterator]);
  useEffect(() => {
    if (isActive) {
      anime.current = window.setInterval(handleNextStep, DELAY_IN_MS);
    } else if (anime.current) {
      window.clearInterval(anime.current);
      anime.current = null;
    }
    return () => {
      clearInterval(anime.current as number);
      anime.current = null;
    };
  }, [isActive, handleNextStep]);

  return (
    <PageLayout title='Строка'>
      <ControlsLayout>
        <div className={styles.controls}>
          <Input
            maxLength={Number(MAX_STRING_LENGTH)}
            isLimitText
            placeholder='Введите текст'
            extraClass='mr-6'
            value={string}
            onChange={handleChange} />
          <Button
            text='Развернуть'
            disabled={!(string.length > 0
              && string.length <= Number(MAX_STRING_LENGTH)) || isActive}
            onClick={handleStartAlgorithm}
            isLoader={isActive} />
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
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          ))}
        </div>
      </SolutionLayout>
    </PageLayout>
  );
};

export default StringReversePage;
