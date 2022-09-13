import { QueueNodeInterface } from '../../types/algo-struct.types';
import AbstractNode from './abstract-node';

class QueueNode<T> extends AbstractNode<T> implements QueueNodeInterface<T> {
  private _link : QueueNode<unknown> | null;

  constructor(value : T, prev? : QueueNode<unknown>) {
    super(value);
    if (prev) {
      this._link = prev;
    } else {
      this._link = null;
    }
  }

  get prev() : QueueNode<unknown> | null {
    return this._link;
  }

  set prev(node : QueueNode<unknown> | null) {
    this._link = node;
  }

  public remove() {
    this._link = null;
    super.destructor();
  }
}

export default QueueNode;
