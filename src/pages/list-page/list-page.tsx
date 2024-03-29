import React, {
  ChangeEventHandler, FC, MutableRefObject, useCallback, useEffect, useRef, useState,
} from 'react';
import { batch } from 'react-redux';
import { ControlsLayout, PageLayout, SolutionLayout } from '../../layouts';
import { Circle } from '../../widgets';
import { useDispatch, useSelector } from '../../services/hooks/store.hooks';
import List from '../../services/data-structures/list';

import {
  clearIndex, clearItem, setIndex, setItem, startList,
} from '../../services/store';

import styles from './list-page.module.css';
import { ArrowIcon, Button, Input } from '../../ui';
import { getArrowFill, getElementState } from '../../services/helpers';
import { THeadOrTail } from '../../types/prop.types';
import { TAlgoViewItem } from '../../types/store.types';
import {
  deleteAtHeadThunk,
  deleteAtIndexThunk,
  deleteAtTailThunk,
  insertAtHeadThunk,
  insertAtIndexThunk,
  insertAtTailThunk,
  resetListThunk,
} from '../../services/thunks';
import listStepGenerator from '../../services/data-structures/list-step-generator';
import { ListStepIteratorInterface } from '../../types/algo-struct.types';
import { SHORT_DELAY_IN_MS } from '../../constants';

type TListAction = 'HEADPLUS' | 'HEADMINUS' | 'TAILPLUS' | 'TAILMINUS' | 'INDEXPLUS' | 'INDEXMINUS';

const ListPage : FC = () => {
  const { item, index } = useSelector((state) => state.forms);
  const {
    viewData, isActive, isFinished,
  } = useSelector((state) => state.view.list);
  const dispatch = useDispatch();
  const [listAction, setListAction] = useState<TListAction | null>(null);

  const listStepIterator : MutableRefObject<ListStepIteratorInterface | null> = useRef(null);
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
  const handleDeleteAtTail : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive
      && isFinished && list.current) {
      dispatch(startList());
      setListAction('TAILMINUS');
      dispatch(deleteAtTailThunk(list.current, item));
      dispatch(clearItem());
    }
  };
  const handleNextStep = React.useCallback(() : void => {
    if (listStepIterator.current) {
      switch (listAction) {
        case 'INDEXPLUS': {
          dispatch(insertAtIndexThunk(list.current, item, index, listStepIterator.current));
          break;
        }
        case 'INDEXMINUS': {
          dispatch(deleteAtIndexThunk(list.current, index, listStepIterator.current));
          break;
        }
        default: {
          const val = !listAction ? 'null' : `${listAction}`;
          throw new Error(`List action type is '${val}', should be 'INDEXPLUS' or 'INDEXMINUS'!`);
        }
      }
    }
  }, [dispatch, item, index, listAction]);
  const handleInsertAtIndex : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive
      && isFinished && list.current) {
      setListAction('INDEXPLUS');
      listStepIterator.current = listStepGenerator(index);
      dispatch(startList());
    }
  };
  const handleDeleteAtIndex : React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isActive
      && isFinished && list.current) {
      setListAction('INDEXMINUS');
      listStepIterator.current = listStepGenerator(index);
      dispatch(startList());
    }
  };
  const handleItemChange : ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { value } = evt.target;
    if (value.length <= 4) {
      dispatch(setItem(value));
    }
  };

  const handleIndexChange : ChangeEventHandler<HTMLInputElement> = (evt) => {
    const value = Number(evt.target.value);
    if (!Number.isNaN(value) && list.current && value < list.current.length) {
      dispatch(setIndex(value));
    }
  };

  useEffect(() => {
    if (isFinished) {
      listStepIterator.current = null;
      setListAction(null);
    }
  }, [isFinished, listStepIterator]);
  useEffect(() => {
    if (isActive) {
      anime.current = setInterval(handleNextStep, SHORT_DELAY_IN_MS) as unknown as number;
    } else {
      clearInterval(anime.current as number);
      anime.current = null;
      if (listAction) {
        batch(() => {
          dispatch(clearIndex());
          dispatch(clearItem());
        });
      }
    }
    return () => {
      clearInterval(anime.current as number);
      anime.current = null;
    };
  }, [isActive, handleNextStep, dispatch, listAction]);
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
              onClick={handleDeleteAtTail}
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
                || !index
                || (isActive
                  && !!listAction
                  && ['HEADMINUS', 'TAILPLUS', 'TAILMINUS', 'HEADPLUS', 'INDEXMINUS'].includes(listAction))
                || index === 0
              }
              onClick={handleInsertAtIndex}
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
                //           || list.current.length >= index
              }
              onClick={handleDeleteAtIndex}
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
          ], ind, view) => {
            const following = view[ind + 1];
            let isRightDone = false;
            let isRightChanging = false;
            if (following) {
              isRightDone = following[1].isDone;
              isRightChanging = following[1].isChanging;
            }

            return (
              <div className={styles.dashboard__item} key={id}>
                <Circle
                  key={id}
                  head={prepareHeadOrTail(head)}
                  letter={value as string}
                  index={ind}
                  state={getElementState(isChanging, isDone)}
                  tail={prepareHeadOrTail(tail)} />
                {ind === view.length - 1
                  ? null
                  : <ArrowIcon fill={getArrowFill(isChanging, isRightChanging, isRightDone)} />}
              </div>
            );
          })}
        </div>
      </SolutionLayout>
    </PageLayout>
  );
};

export default ListPage;
