import QueueNode from '../services/data-structures/queue-node';

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
  top: StackNodeInterface<unknown> | null,
  isEmpty: boolean,
  put(node: StackNodeInterface<unknown>) : void,
  take() : StackNodeInterface<unknown> | null,
}
export interface QueueNodeInterface {
  readonly prev : QueueNode<unknown> | null;
  remove() : void;
}
export interface QueueInterface {
  readonly last : QueueNode<unknown> | null;
  readonly isEmpty : boolean;

  enqueue(node : QueueNode<unknown>) : void;

  dequeue() : QueueNode<unknown> | null;
}
