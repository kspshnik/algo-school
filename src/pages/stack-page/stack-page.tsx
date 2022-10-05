import React, { useEffect } from 'react';
import { ControlsLayout, PageLayout, SolutionLayout } from '../../layouts';

import { useDispatch, useSelector } from '../../services/hooks/store.hooks';
import {
  resetStack, setItem, startStack, stopStack,
} from '../../services/store';
import { NONE, SHORT_DELAY_IN_MS } from '../../constants';
import { Direction } from '../../types/direction';
import { getElementState } from '../../services/helpers';

import styles from './sorting-page.module.css';
import { Column } from '../../widgets';
import { Button } from '../../ui';
import Stack from '../../services/data-structures/stack';
import { popFromStackThunk, pushToStackThunk } from '../../services/thunks';

const SortingPage : React.FC = () => {
  const { item } = useSelector((state) => state.forms);
  const { viewData, isActive, isFinished } = useSelector((store) => store.view.stack);
  const dispatch = useDispatch();

  const stack : React.MutableRefObject<Stack | null> = React.useRef(null);

  const handlePush : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive
      && !isFinished) {
      dispatch(startStack());
      dispatch(pushToStackThunk(stack.current, item));
    }
  };

  const handlePop : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive
      && !isFinished) {
      dispatch(startStack());
      dispatch(popFromStackThunk(stack.current));
    }
  };

  const handlePurge : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive
      && !isFinished) {
      dispatch(startStack());
      setTimeout(() => {
        dispatch(resetStack());
        dispatch(stopStack());
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

  return (
    <PageLayout title='Стек'>
      <ControlsLayout>
        <div className={styles.controls}>
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
