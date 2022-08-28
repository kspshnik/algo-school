import { AbstractNodeInterface } from '../../types/algo-struct.types';

abstract class AbstractNode<T> implements AbstractNodeInterface<T> {
  protected _value : T;

  /*  protected _next : AbstractNode<unknown> | null = null;

  protected _prev : AbstractNode<unknown> | null = null;

  protected _left : AbstractNode<unknown> | null = null;

  protected _right : AbstractNode<unknown> | null = null;

  protected _parent : AbstractNode<unknown> | null = null; */

  protected constructor(value : T) {
    this._value = value;
  }

  public get value() : T {
    return this._value;
  }

  public set value(val : T) {
    this._value = val;
  }
}

export default AbstractNode;
