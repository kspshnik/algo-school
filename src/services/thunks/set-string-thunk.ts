import { batch } from 'react-redux';
import { AppThunk, nextStringReverseStep, setString } from '../store';
import { makeViewFromString } from '../helpers';
import virginizeAlgoView from '../helpers/virginize-algo-view';

const setStringThunk : AppThunk = (value : string) => (dispatch, getState) => {
  console.log(`setStringThunk('${value}') is engaged!`);
  // eslint-disable-next-line no-debugger
  // debugger;
  const { viewData, isFinished, isActive } = getState().view.string;
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
