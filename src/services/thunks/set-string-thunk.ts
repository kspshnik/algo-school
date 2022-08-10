import { batch } from 'react-redux';
import { AppThunk, nextStringReverseStep, setString } from '../store';
import { makeViewFromString } from '../helpers';

const setStringThunk : AppThunk = (value: string) => (dispatch, getState) => {
  const previous = getState().forms.string;
  const currentView = getState().view.string.viewData;
  batch(() => {
    dispatch(setString(value));
    dispatch(nextStringReverseStep(makeViewFromString(value, previous, currentView)));
  });
};

export default setStringThunk;
