import { TAlgoView } from '../../types/store.types';

const virginizeAlgoView = (view : TAlgoView) : TAlgoView => view.map(
  ({ value, id }) => ({
    id, value, isDone: false, isChanging: false,
  }),
);

export default virginizeAlgoView;
