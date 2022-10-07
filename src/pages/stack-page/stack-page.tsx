import React, { useEffect } from 'react';
import { ControlsLayout, PageLayout, SolutionLayout } from '../../layouts';

import { useDispatch, useSelector } from '../../services/hooks/store.hooks';
import {
  clearItem, resetStack, setItem, startStack, stopStack,
} from '../../services/store';
import { SHORT_DELAY_IN_MS } from '../../constants';
import { getElementState } from '../../services/helpers';

import styles from './stack-page.module.css';
import { Button, Input } from '../../ui';
import Stack from '../../services/data-structures/stack';
import { popFromStackThunk, pushToStackThunk } from '../../services/thunks';
import { Circle } from '../../widgets';

type TStackAction = 'PUSH' | 'POP' | 'PURGE';

const StackPage : React.FC = () => {
  const { item } = useSelector((state) => state.forms);
  const { viewData, isActive, isFinished } = useSelector((state) => state.view.stack);
  const dispatch = useDispatch();
  const [stackAction, setStackAction] = React.useState<TStackAction | null>(null);

  const stack : React.MutableRefObject<Stack | null> = React.useRef(null);

  const handlePush : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive
      && isFinished) {
      dispatch(startStack());
      setStackAction('PUSH');
      dispatch(pushToStackThunk(stack.current, item));
      dispatch(clearItem());
      setStackAction(null);
    }
  };

  const handlePop : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive
      && isFinished) {
      dispatch(startStack());
      setStackAction('POP');
      dispatch(popFromStackThunk(stack.current));
      dispatch(clearItem());
      setStackAction(null);
    }
  };

  const handlePurge : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive
      && isFinished) {
      dispatch(startStack());
      setStackAction('PURGE');
      setTimeout(() => {
        dispatch(resetStack());
        dispatch(stopStack());
        setStackAction(null);
        dispatch(clearItem());
      }, SHORT_DELAY_IN_MS);
    }
  };
  const handleInputChange : React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { value } = evt.target;
    if (value.length <= 4) {
      dispatch(setItem(value));
    }
  };
  useEffect(() => {
    dispatch(resetStack());
    stack.current = new Stack();
    return () => {
      stack.current = null;
    };
  }, [dispatch]);
  useEffect(() => {
    if (!isActive || isFinished) {
      setStackAction(null);
    }
  }, [isActive, isFinished]);

  return (
    <PageLayout title='Стек'>
      <ControlsLayout>
        <div className={styles.controls}>
          <fieldset className={styles.submits}>
            <Input
              type='text'
              maxLength={4}
              isLimitText
              placeholder='Введите текст'
              extraClass='mr-6'
              value={item}
              onChange={handleInputChange} />
            <Button
              text='Добавить'
              isLoader={isActive && stackAction === 'PUSH'}
              disabled={(isActive && !!stackAction && ['POP', 'PURGE'].includes(stackAction)) || item.length === 0}
              onClick={handlePush} />
            <Button
              text='Удалить'
              isLoader={isActive && stackAction === 'POP'}
              disabled={(isActive && !!stackAction && ['PUSH', 'PURGE'].includes(stackAction)) || viewData.length === 0}
              onClick={handlePop} />
          </fieldset>
          <Button
            text='Очистить'
            isLoader={isActive && stackAction === 'PURGE'}
            disabled={(isActive && !!stackAction && ['PUSH', 'POP'].includes(stackAction)) || viewData.length === 0}
            onClick={handlePurge} />
        </div>
      </ControlsLayout>
      <SolutionLayout>
        <SolutionLayout>
          <div className={styles.dashboard}>
            {viewData.map(([
              head,
              {
                value,
                isDone,
                isChanging,
                id,
              },
            ], index) => (
              <Circle
                key={id}
                head={head as string}
                letter={value as string}
                index={index}
                state={getElementState(isChanging, isDone)} />
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            ))}
          </div>
        </SolutionLayout>
      </SolutionLayout>
    </PageLayout>
  );
};

export default StackPage;
