import { QueueNodeInterface } from '../../types/algo-struct.types';
import AbstractNode from './abstract-node';

class QueueNode<T> extends AbstractNode<T> implements QueueNodeInterface {
  _next : QueueNode<unknown> | null;

  constructor(value : T, last? : QueueNode<unknown>) {
    super(value);
    if (last) {
      this._next = last;
    } else {
      this._next = null;
    }
  }

  public remove() {
    this._next = null;
  }

  get prev() : QueueNode<unknown> | null {
    return this._next;
  }

  set prev(node : QueueNode<unknown> | null) {
    this._next = node;
  }
}

export default QueueNode;
