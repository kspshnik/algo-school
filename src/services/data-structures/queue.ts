import QueueNode from './queue-node';
import { QueueInterface } from '../../types/algo-struct.types';

class Queue implements QueueInterface {
  constructor() {
    this._tail = null;
  }

  private _tail : QueueNode<unknown> | null;

  get tail() : QueueNode<unknown> | null {
    return this._tail;
  }

  get isEmpty() : boolean {
    return !!this._tail;
  }

  get head() : QueueNode<unknown> | null {
    let current : QueueNode<unknown> | null = this._tail;
    if (!current) {
      return null;
    }
    while (current.prev) {
      current = current.prev;
    }
    return current;
  }

  private static ensureNode(node : QueueNode<unknown> | unknown) : QueueNode<unknown> {
    if (node instanceof QueueNode) {
      return node;
    }
    return new QueueNode<typeof node>(node);
  }

  enquenue(node : QueueNode<unknown>) : void {
    // eslint-disable-next-line no-param-reassign
    node.prev = this._tail;
    this._tail = node;
  }

  dequeue() : QueueNode<unknown> | null {
    if (!this._tail) {
      return null;
    }
    if (!this._tail.prev) {
      const res = this._tail;
      this._tail = null;
      return res;
    }

    let current : QueueNode<unknown> | null = this._tail;
    let next : QueueNode<unknown> | null = current.prev;
    while (next?.prev) {
      current = next;
      next = next.prev;
    }
    current.prev = null;
    return next;
  }

  purge() : void {
    this._tail = null;
  }
}

export default Queue;
