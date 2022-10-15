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

export interface AbstractNodeInterface<T> {
  value : T,
}

export interface StackNodeInterface<T> extends AbstractNodeInterface<T> {
  remove() : void;
  on : StackNodeInterface<unknown> | null,
}

export interface StackInterface {
  top : StackNodeInterface<unknown> | null,
  isEmpty : boolean,

  push(node : StackNodeInterface<unknown>) : void,

  pop() : StackNodeInterface<unknown> | null,

  peek() : StackNodeInterface<unknown> | null,

  purge() : void,
}

export interface QueueNodeInterface<T> extends AbstractNodeInterface<T> {
  prev : QueueNodeInterface<unknown> | null;

  remove() : void;
}

export interface ListNodeInterface<T> extends AbstractNodeInterface<T> {
  prev : ListNodeInterface<unknown> | null;
  next : ListNodeInterface<unknown> | null;

  remove() : void;
}

export interface QueueInterface {
  readonly tail : QueueNodeInterface<unknown> | null;
  readonly isEmpty : boolean;
  readonly head : QueueNodeInterface<unknown> | null;

  enqueue(node : QueueNodeInterface<unknown>) : void;

  dequeue() : QueueNodeInterface<unknown> | null;

  purge() : void;
}
