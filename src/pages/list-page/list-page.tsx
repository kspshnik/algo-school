import React, {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from 'react';
import { ControlsLayout, PageLayout, SolutionLayout } from '../../layouts';
import { Circle } from '../../widgets';
import { useDispatch, useSelector } from '../../services/hooks/store.hooks';
import List from '../../services/data-structures/list';

import {
  clearItem, setIndex, setItem, startList,
} from '../../services/store';
import { AlgorithmsIterator } from '../../types/types';

import styles from './list-page.module.css';
import { Button, Input } from '../../ui';
import { getElementState } from '../../services/helpers';
import { THeadOrTail } from '../../types/prop.types';
import { TAlgoViewItem } from '../../types/store.types';
import {
  deleteAtHeadThunk, insertAtHeadThunk, insertAtTailThunk, resetListThunk,
} from '../../services/thunks';

type TListAction = 'HEADPLUS' | 'HEADMINUS' | 'TAILPLUS' | 'TAILMINUS' | 'INDEXPLUS' | 'INDEXMINUS';

const ListPage : FC = () => {
  const { item, index } = useSelector((state) => state.forms);
  const {
    viewData, isActive, isFinished, start, end,
  } = useSelector((state) => state.view.list);
  const dispatch = useDispatch();
  const [listAction, setListAction] = useState<TListAction | null>(null);

  const algorithmIterator : MutableRefObject<AlgorithmsIterator | null> = useRef(null);
  const anime : MutableRefObject<number | null> = useRef(null);

  const list : MutableRefObject<List | null> = useRef(null);

  const prepareHeadOrTail = useCallback((itm : TAlgoViewItem | string | null) : THeadOrTail => {
    if (itm === null) {
      return null;
    }
    if (typeof itm === 'string') {
      return itm;
    }
    const {
      value, isDone, isChanging, id,
    } = itm;
    return (
      <Circle
        key={id}
        head={null}
        letter={value as string}
        state={getElementState(isChanging, isDone)}
        tail={null}
        isSmall />

    );
  }, []);

  const handleInsertAtHead : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive
      && isFinished && list.current) {
      dispatch(startList());
      setListAction('HEADPLUS');
      dispatch(insertAtHeadThunk(list.current, item));
      dispatch(clearItem());
    }
  };
  const handleInsertAtTail : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive
      && isFinished && list.current) {
      dispatch(startList());
      setListAction('TAILPLUS');
      dispatch(insertAtTailThunk(list.current, item));
      dispatch(clearItem());
    }
  };
  const handleDeleteAtHead : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive
      && isFinished && list.current) {
      dispatch(startList());
      setListAction('HEADMINUS');
      dispatch(deleteAtHeadThunk(list.current, item));
      dispatch(clearItem());
    }
  };
  /*
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
 */
  const handleItemChange : ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { value } = evt.target;
    if (value.length <= 4) {
      dispatch(setItem(value));
    }
  };

  const handleIndexChange : ChangeEventHandler<HTMLInputElement> = (evt) => {
    const value = Number(evt.target.value);
    if (value && !Number.isNaN(value)) {
      dispatch(setIndex(value));
    }
  };

  const handleNoAction : MouseEventHandler<HTMLButtonElement> = () => null;

  React.useEffect(() => {
    list.current = new List();
    dispatch(resetListThunk(list.current));
    return () => {
      list.current = null;
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (!isActive || isFinished) {
      setListAction(null);
    }
  }, [isActive, isFinished]);

  return (
    <PageLayout title='Связный список'>
      <ControlsLayout>
        <div className={styles.controls}>
          <fieldset className={`${styles.controls} ${styles.controls__set} ${styles.controls__item}`}>
            <Input
              type='text'
              maxLength={4}
              isLimitText
              placeholder='Введите текст'
              extraClass='mr-6'
              value={item}
              onChange={handleItemChange} />
            <Button
              text='Добавить в head'
              isLoader={isActive
                && listAction === 'HEADPLUS'}
              disabled={
                !list.current
                || (isActive
                  && !!listAction
                  && ['HEADMINUS', 'TAILPLUS', 'TAILMINUS', 'INDEXPLUS', 'INDEXMINUS'].includes(listAction))
                || item.length === 0
              }
              onClick={handleInsertAtHead}
              linkedList='small' />
            <Button
              text='Удалить из head'
              isLoader={isActive && listAction === 'HEADMINUS'}
              disabled={
                !list.current
                || (isActive
                  && !!listAction
                  && ['HEADPLUS', 'TAILPLUS', 'TAILMINUS', 'INDEXPLUS', 'INDEXMINUS'].includes(listAction))
                || list.current.isEmpty
              }
              onClick={handleDeleteAtHead}
              linkedList='small' />
            <Button
              text='Добавить в tail'
              isLoader={isActive && listAction === 'TAILPLUS'}
              disabled={
                !list.current
                || (isActive
                  && !!listAction
                  && ['HEADPLUS', 'HEADMINUS', 'TAILMINUS', 'INDEXPLUS', 'INDEXMINUS'].includes(listAction))
                || item.length === 0
              }
              onClick={handleInsertAtTail}
              linkedList='small' />
            <Button
              text='Удалить из tail'
              isLoader={isActive && listAction === 'TAILMINUS'}
              disabled={
                !list.current
                || (isActive
                  && !!listAction
                  && ['HEADPLUS', 'HEADMINUS', 'TAILPLUS', 'INDEXPLUS', 'INDEXMINUS'].includes(listAction))
                || list.current.isEmpty
              }
              onClick={handleNoAction}
              linkedList='small' />
          </fieldset>

          <fieldset className={`${styles.controls} ${styles.controls__set} ${styles.controls__index}`}>
            <Input
              type='text'
              maxLength={2}
              isLimitText
              placeholder='Введите индекс'
              extraClass='mr-6'
              value={index}
              onChange={handleIndexChange} />
            <Button
              text='Добавить по индексу'
              isLoader={isActive
                && listAction === 'INDEXPLUS'}
              disabled={
                !list.current
                || (isActive
                  && !!listAction
                  && ['HEADMINUS', 'TAILPLUS', 'TAILMINUS', 'HEADPLUS', 'INDEXMINUS'].includes(listAction))
                || index === 0
              }
              onClick={handleNoAction}
              linkedList='big' />
            <Button
              text='Удалить по индексу'
              isLoader={isActive && listAction === 'INDEXMINUS'}
              disabled={
                !list.current
                || (isActive
                  && !!listAction
                  && ['HEADPLUS', 'TAILPLUS', 'TAILMINUS', 'INDEXPLUS', 'HEADMINUS'].includes(listAction))
                || list.current.isEmpty
              }
              onClick={handleNoAction}
              linkedList='big' />
          </fieldset>
        </div>
      </ControlsLayout>
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
          ], ind) => (
            <Circle
              key={id}
              head={prepareHeadOrTail(head)}
              letter={value as string}
              index={ind}
              state={getElementState(isChanging, isDone)}
              tail={prepareHeadOrTail(tail)} />
          ))}
        </div>
      </SolutionLayout>
    </PageLayout>
  );
};

export default ListPage;
