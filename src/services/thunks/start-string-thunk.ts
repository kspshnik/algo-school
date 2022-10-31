import { batch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { AppThunk, nextStringReverseStep, startStringReverse } from '../store';

const startStringThunk : AppThunk = () => (dispatch, getState) => {
  const { string } = getState().forms;
  batch(() => {
    dispatch(
      nextStringReverseStep(string.split('').map((char) => ({
        value: char,
        isDone: false,
        isChanging: false,
        id: nanoid(24),
      }))),
    );
    dispatch(startStringReverse());
  });
};

export default startStringThunk;
