import { AbstractNodeInterface } from '../../types/algo-struct.types';

abstract class AbstractNode<T> implements AbstractNodeInterface<T> {
  protected constructor(value : T) {
    this._value = value;
  }

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
