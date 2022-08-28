import { StackNodeInterface } from '../../types/algo-struct.types';
import AbstractNode from './abstract-node';

class StackNode<T> extends AbstractNode<T> implements StackNodeInterface<T> {
  private _prev : StackNode<unknown> | null;

  constructor(value : T, top? : StackNode<unknown>) {
    super(value);
    if (top) {
      this._prev = top;
    } else {
      this._prev = null;
    }
  }

  public remove() {
    this._prev = null;
  }

  get on() : StackNode<unknown> | null {
    return this._prev;
  }

  set on(node : StackNode<unknown> | null) {
    this._prev = node;
  }
}

export default StackNode;
