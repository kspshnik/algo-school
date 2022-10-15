import React, { useEffect } from 'react';
import { ControlsLayout, PageLayout, SolutionLayout } from '../../layouts';

import { useDispatch, useSelector } from '../../services/hooks/store.hooks';
import {
  clearItem, resetQueue, setItem, startQueue, stopQueue,
} from '../../services/store';
import { SHORT_DELAY_IN_MS } from '../../constants';
import { getElementState } from '../../services/helpers';

import styles from './queue-page.module.css';
import { Button, Input } from '../../ui';
import { dequeueThunk, enqueueThunk } from '../../services/thunks';
import { Circle } from '../../widgets';
import Queue from '../../services/data-structures/queue';

type TQueueAction = 'ENQUEUE' | 'DEQUEUE' | 'PURGE';

const QueuePage : React.FC = () => {
  const { item } = useSelector((state) => state.forms);
  const {
    viewData, isActive, isFinished, start, end,
  } = useSelector((state) => state.view.queue);
  const dispatch = useDispatch();
  const [queueAction, setQueueAction] = React.useState<TQueueAction | null>(null);

  const queue : React.MutableRefObject<Queue | null> = React.useRef(null);

  const handleEnqueue : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive
      && isFinished && queue.current && queue.current.length < 7) {
      dispatch(startQueue());
      setQueueAction('ENQUEUE');
      dispatch(enqueueThunk(queue.current, item));
      dispatch(clearItem());
      setQueueAction(null);
    }
  };

  const handleDequeue : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive
      && isFinished && queue.current && queue.current.length > 0) {
      dispatch(startQueue());
      setQueueAction('DEQUEUE');
      dispatch(dequeueThunk(queue.current));
      dispatch(clearItem());
      setQueueAction(null);
    }
  };

  const handlePurge : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive
      && isFinished) {
      dispatch(startQueue());
      setQueueAction('PURGE');
      setTimeout(() => {
        dispatch(resetQueue());
        dispatch(stopQueue());
        setQueueAction(null);
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
    dispatch(resetQueue());
    queue.current = new Queue();
    return () => {
      queue.current = null;
    };
  }, [dispatch]);
  useEffect(() => {
    if (!isActive || isFinished) {
      setQueueAction(null);
    }
  }, [isActive, isFinished]);

  return (
    <PageLayout title='Очередь'>
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
              isLoader={isActive
                && queueAction === 'ENQUEUE'}
              disabled={
                !queue.current
                || (isActive
                  && !!queueAction
                  && ['DEQUEUE', 'PURGE'].includes(queueAction)
                  && queue.current.length < 7)
                || item.length === 0
              }
              onClick={handleEnqueue} />
            <Button
              text='Удалить'
              isLoader={isActive && queueAction === 'DEQUEUE'}
              disabled={
                !queue.current
                || (isActive
                  && !!queueAction
                  && ['ENQUEUE', 'PURGE'].includes(queueAction)
                  && queue.current
                  && queue.current.length < 1
                )
                || viewData.every(([, body]) => !body.value)
              }
              onClick={handleDequeue} />
          </fieldset>
          <Button
            text='Очистить'
            isLoader={isActive && queueAction === 'PURGE'}
            disabled={
              !queue.current
              || (isActive
                && !!queueAction
                && ['ENQUEUE', 'DEQUEUE'].includes(queueAction)
                && queue.current.length > 0)
              || (viewData.every(([, body]) => !body.value) && start === 0 && end === 0)
            }
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
              tail,
            ], index) => (
              <Circle
                key={id}
                head={head as string}
                letter={value as string}
                index={index}
                state={getElementState(isChanging, isDone)}
                tail={tail as string} />
            ))}
          </div>
        </SolutionLayout>
      </SolutionLayout>
    </PageLayout>
  );
};

export default QueuePage;
