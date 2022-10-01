import QueueNode from './queue-node';
import { QueueInterface } from '../../types/algo-struct.types';

class Queue implements QueueInterface {
  private _last : QueueNode<unknown> | null;

  constructor() {
    this._last = null;
  }

  get last() : QueueNode<unknown> | null {
    return this._last;
  }

  get isEmpty() : boolean {
    return !!this._last;
  }

  private static ensureNode(node : QueueNode<unknown> | unknown) : QueueNode<unknown> {
    if (node instanceof QueueNode) {
      return node;
    }
    return new QueueNode<typeof node>(node);
  }

  enqueue(node : QueueNode<unknown>) : void {
    // eslint-disable-next-line no-param-reassign
    node.prev = this._last;
    this._last = node;
  }

  dequeue() : QueueNode<unknown> | null {
    const current : QueueNode<unknown> | null = this._last;
    if (current) {
      this._last = current.prev;
      current.prev = null;
    }
    return current;
  }
}
