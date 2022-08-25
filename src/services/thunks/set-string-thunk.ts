import { batch } from 'react-redux';
import { AppThunk, nextStringReverseStep, setString } from '../store';
import { makeViewFromString } from '../helpers';
import virginizeAlgoView from '../helpers/virginize-algo-view';

const setStringThunk : AppThunk = (value : string) => (dispatch, getState) => {
  const { viewData } = getState().view.string;
  const previous = getState().forms.string;
  batch(() => {
    dispatch(setString(value));
    dispatch(
      nextStringReverseStep(
        virginizeAlgoView(
          makeViewFromString(value, previous, viewData),
        ),
      ),
    );
  });
};

export default setStringThunk;
