import { TSortingChoiceType } from './types';
import { Direction } from './direction';

export type TAlgoViewItem = {
  id : string,
  isChanging : boolean,
  isDone : boolean,
  value : string | number,
};

export type TStructViewItem = [
  TAlgoViewItem | string | null,
  TAlgoViewItem,
  TAlgoViewItem | string | null,
];
export type TStructView = Array<TStructViewItem>;
export type TAlgoView = Array<TAlgoViewItem>;

export type TAlgoSliceState = {
  viewData : TAlgoView,
  isFinished : boolean,
  isActive : boolean,
};

export type TStructSliceState = {
  viewData : TStructView,
  isFinished : boolean,
  isActive : boolean,
  start : number,
  end: number,
};
export type TFormsSliceState = {
  string : string,
  fibonacchiLimit : number,
  randomArray : Array<number>,
  sortingType : TSortingChoiceType,
  direction : Direction | null,
  item : string,
  index : number,
};
