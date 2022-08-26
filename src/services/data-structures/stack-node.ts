import AbstractNode from './abstract-node';

class StackNode<T> extends AbstractNode<any> {
  private _next : StackNode<any> | null;

  private _prev : StackNode<any> | null;

  constructor(value : T, top : StackNode<any>) {
    super(value);
    this._prev = top;
    this._next = null;
  }

  public putOn(newTop : StackNode<any>) {
    this._next = newTop;
  }

  public takeOff() {
    this._next = null;
  }
}

export default StackNode;
