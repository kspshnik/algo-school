import { TSortingDirection, TSortingType } from './types';

export type TAlgoViewItem = {
  id: string,
  isChanging : boolean,
  isDone : boolean,
  value : string | number,
};
export type TAlgoView = Array<TAlgoViewItem>;

export type TAlgoSliceState = {
  viewData : TAlgoView,
  isFinished : boolean,
  isActive : boolean,
};

export type TFormsSliceState = {
  string : string,
  fibonacchiLimit : number,
  randomArray : Array<number>,
  sortingType : TSortingType,
  sortingDir: TSortingDirection,
};
