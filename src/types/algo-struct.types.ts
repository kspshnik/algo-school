export interface StringReverseGeneratorInterface {
  (string : string, head : number, tail : number) : string,
}

export type TStringStepResult = {
  str : string,
  changing : Array<number>,
  ready : Array<number>,
};

export type StringAlgorithmIteratorInterface = Generator<TStringStepResult, void, never>;
export type FibonacchiAlgorithmIteratorInterface = Generator<Array<number>, void, never>;

export type TSortStepResult = {
  baseItem : number,
  currentItem : number,
  doneItems : Array<number>,
  value : Array<number>,
};
