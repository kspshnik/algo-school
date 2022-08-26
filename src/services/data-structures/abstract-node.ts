abstract class AbstractNode<T> {
  protected _value : T;

  constructor(value : T) {
    this._value = value;
  }
}

export default AbstractNode;
