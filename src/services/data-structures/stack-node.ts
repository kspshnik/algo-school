import AbstractNode from './abstract-node';

class StackNode<T> extends AbstractNode<T> {
  private _next : StackNode<unknown> | null;

  private _prev : StackNode<unknown> | null;

  constructor(value : T, top : StackNode<unknown>) {
    super(value);
    this._prev = top;
    this._next = null;
  }

  public putOn(newTop : StackNode<unknown>) {
    this._next = newTop;
  }

  public takeOff() {
    this._next = null;
  }
}

export default StackNode;
