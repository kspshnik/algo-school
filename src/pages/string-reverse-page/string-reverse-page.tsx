import React, { useEffect } from 'react';
import { ControlsLayout, PageLayout, SolutionLayout } from '../../layouts';
import { Button, Input } from '../../ui';

import styles from './string-reverse-page.module.css';
import { useDispatch, useSelector } from '../../services/hooks/store.hooks';
import { resetString } from '../../services/store';
import { reverseStringGenerator } from '../../services/algorithms';
import { AlgorithmsIterator } from '../../types/types';
import { invokeReverseString, setStringThunk, stepIntoReverseString } from '../../services/thunks';
import { MAX_STRING_LENGTH } from '../../constants';
import { Circle } from '../../widgets';
import { getElementState } from '../../services/helpers';

const StringReversePage : React.FC = () => {
  const { string } = useSelector(((store) => store.forms));
  const { viewData, isActive, isFinished } = useSelector((store) => store.view.string);
  const dispatch = useDispatch();
  const algorithmIterator : React.MutableRefObject<AlgorithmsIterator | null> = React.useRef(null);
  // = React.useRef<ReturnType<typeof reverseStringGenerator>>(null);

  const handleChange : React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setStringThunk(evt.target.value));
  };
  const handleStartAlgorithm : React.MouseEventHandler<HTMLButtonElement> = () => {
    // TODO: разобраться с типизацией!
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    algorithmIterator.current = reverseStringGenerator(string) as AlgorithmsIterator;
    dispatch(invokeReverseString(algorithmIterator.current));
  };

  const handleNextStep : React.AnimationEventHandler = () => {
    dispatch(stepIntoReverseString(algorithmIterator));
  };

  useEffect(() => {
    dispatch(resetString());
  }, [dispatch]);

  useEffect(() => {
    if (isFinished) {
      algorithmIterator.current = null;
    }
  }, [isFinished, algorithmIterator]);

  return (
    <PageLayout title='Строка'>
      <ControlsLayout>
        <div className={styles.controls}>
          <Input
            maxLength={MAX_STRING_LENGTH}
            isLimitText
            placeholder='Введите текст'
            extraClass='mr-6'
            value={string}
            onChange={handleChange} />
          <Button
            text='Развернуть'
            disabled={!(string.length > 0 && string.length <= MAX_STRING_LENGTH) || isActive}
            onClick={handleStartAlgorithm} />
        </div>
      </ControlsLayout>
      <SolutionLayout>
        <div className={styles.dashboard}>
          {viewData.map(({
            value, isDone, isChanging, id,
          }) => (
            /* <Circle
            key={`${index}-${value}`}
            index={index}
            letter={`${value}`}
            state={getElementState(isChanging, isDone)}
            onAnimationEnd={handleNextStep} /> */
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            <p key={id}>{`value = '${value}' isDone: ${isDone} isChanging: ${isChanging}`}</p>
          ))}
        </div>
      </SolutionLayout>
    </PageLayout>
  );
};

export default StringReversePage;
