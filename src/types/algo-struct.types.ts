export interface StringReverseGeneratorInterface {
  (string : string, head : number, tail : number) : string,
}

export type TSortStepResult = {
  baseItem : number,
  currentItem : number,
  doneItems : Array<number>,
  value : Array<number>,
};
