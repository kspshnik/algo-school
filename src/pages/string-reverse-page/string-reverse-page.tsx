import React, { useEffect } from 'react';
import { ControlsLayout, PageLayout, SolutionLayout } from '../../layouts';
import Circle from '../../widgets/circle/circle';
import { Button, Input } from '../../ui';

import styles from './string-reverse-page.module.css';
import { useDispatch, useSelector } from '../../services/hooks/store.hooks';
import { resetString, startStringReverse } from '../../services/store';
import { reverseStringGenerator } from '../../services/algorithms';
import { AlgorithmsIterator } from '../../types/types';
import { getElementState } from '../../services/helpers';
import { setStringThunk, stepIntoReverseString } from '../../services/thunks';
import { DELAY_IN_MS, MAX_STRING_LENGTH } from '../../constants';

const StringReversePage : React.FC = () => {
  const { string } = useSelector(((store) => store.forms));
  const { viewData, isActive, isFinished } = useSelector((store) => store.view.string);
  const dispatch = useDispatch();

  const algorithmIterator : React.MutableRefObject<AlgorithmsIterator | null> = React.useRef(null);
  const anime : React.MutableRefObject<number | null> = React.useRef(null);
  // let anime : ReturnType<typeof setInterval>;
  const handleChange : React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setStringThunk(evt.target.value));
  };
  const handleStartAlgorithm : React.MouseEventHandler<HTMLButtonElement> = () => {
    // TODO: разобраться с типизацией!
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    if (!isActive && !isFinished) {
      algorithmIterator.current = reverseStringGenerator(string) as AlgorithmsIterator;
      dispatch(startStringReverse());
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

  /* useEffect(() => {
     console.log(`Trasitions ended: ${transitionsCount.current}`);
     if (!!transitionsCount && transitionsCount.current === string.length) {
       console.log('Firing next step!');
       dispatch(stepIntoReverseString(algorithmIterator.current));
       transitionsCount.current = 0;
     }
   }, [transitionsCount, string, isActive, dispatch]); */

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
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          ))}
        </div>
      </SolutionLayout>
    </PageLayout>
  );
};

export default StringReversePage;
