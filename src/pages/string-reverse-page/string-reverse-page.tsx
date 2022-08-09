import React from 'react';
import { ControlsLayout, PageLayout, SolutionLayout } from '../../layouts';
import { Button, Input } from '../../ui';

import styles from './string-reverse-page.module.css';
import { useDispatch, useSelector } from '../../services/hooks/store.hooks';
import { setString } from '../../services/store';

const StringReversePage : React.FC = () => {
  const { string } = useSelector(((store) => store.forms));
  const dispatch = useDispatch();

  const handleChange : React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    console.log(evt.target.value);
    dispatch(setString(evt.target.value));
  };
  return (
    <PageLayout title='Строка'>
      <ControlsLayout>
        <div className={styles.controls}>
          <Input
            maxLength={11}
            isLimitText
            placeholder='Введите текст'
            extraClass='mr-6'
            value={string}
            onChange={handleChange} />
          <Button
            text='Развернуть'
            disabled={!(string.length > 0 && string.length < 12)} />
        </div>
      </ControlsLayout>
      <SolutionLayout>
        <div className={styles.dashboard}>
          <p>заглушко</p>
        </div>
      </SolutionLayout>
    </PageLayout>
  );
};

export default StringReversePage;
