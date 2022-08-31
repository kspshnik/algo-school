export interface StringReverseGeneratorInterface {
  (string : string, head : number, tail : number) : string,
}

export type TStringStepResult = {
  arr : Array<string>,
  changing : Array<number>,
  ready : Array<number>,
};

export type StringAlgorithmIteratorInterface = Generator<TStringStepResult, void, never>;
export type FibonacchiAlgorithmIteratorInterface = Generator<Array<number>, void, never>;
export type SortingAlgorithmIteratorInterface = Generator<TSortStepResult, void, never>;

export type TSortStepResult = {
  active : Array<number>,
  ready : Array<number>,
  array : Array<number>,
};
