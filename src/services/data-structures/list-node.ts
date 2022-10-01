import { ListNodeInterface } from '../../types/algo-struct.types';
import AbstractNode from './abstract-node';

class ListNode<T> extends AbstractNode<T> implements ListNodeInterface<T> {
  constructor(value : T, prev? : ListNode<unknown>, next? : ListNode<unknown>) {
    super(value);
    if (prev) {
      this._prev = prev;
    } else {
      this._prev = null;
    }
    if (next) {
      this._next = next;
    } else {
      this._next = null;
    }
  }

  private _prev : ListNode<unknown> | null;

  get prev() : ListNode<unknown> | null {
    return this._prev;
  }

  set prev(node : ListNode<unknown> | null) {
    this._prev = node;
  }

  private _next : ListNode<unknown> | null;

  get next() : ListNode<unknown> | null {
    return this._next;
  }

  set next(node : ListNode<unknown> | null) {
    this._next = node;
  }

  remove() {
    this._prev = null;
    this._next = null;
    super.destructor();
  }
}

export default ListNode;
