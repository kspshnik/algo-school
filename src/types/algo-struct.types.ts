import QueueNode from '../services/data-structures/queue-node';
import ListNode from '../services/data-structures/list-node';

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
  on : StackNodeInterface<unknown> | null,

  remove() : void;
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
  prev : QueueNode<unknown> | null;

  remove() : void;
}

export interface ListNodeInterface<T> extends AbstractNodeInterface<T> {
  prev : ListNode<unknown> | null;
  next : ListNode<unknown> | null;

  remove() : void;
}

export interface QueueInterface {
  readonly tail : QueueNode<unknown> | null;
  readonly isEmpty : boolean;
  readonly head : QueueNode<unknown> | null;

  enquenue(node : QueueNode<unknown>) : void;

  dequeue() : QueueNode<unknown> | null;

  purge() : void;
}
