export interface AbstractNodeInterface<T> {
  value : T,
}

abstract class AbstractNode<T> implements AbstractNodeInterface<T> {
  protected constructor(value : T) {
    this._value = value;
  }

  /*  protected _next : AbstractNode<unknown> | null = null;

  protected _prev : AbstractNode<unknown> | null = null;

  protected _left : AbstractNode<unknown> | null = null;

  protected _right : AbstractNode<unknown> | null = null;

  protected _parent : AbstractNode<unknown> | null = null; */

  protected _value : T | null;

  public get value() : T {
    return this._value!;
  }

  public set value(val : T) {
    this._value = val;
  }

  protected destructor() {
    this._value = null;
  }
}

export default AbstractNode;
