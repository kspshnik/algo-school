import QueueNode from './queue-node';
import { QueueInterface } from '../../types/algo-struct.types';

class Queue implements QueueInterface {
  constructor() {
    this._head = null;
    this._tail = null;
    this._length = 0;
  }

  private _head : QueueNode<unknown> | null;

  private _tail : QueueNode<unknown> | null;

  private _length : number;

  public get tail() : QueueNode<unknown> | null {
    return this._tail;
  }

  public get isEmpty() : boolean {
    return !!this._tail;
  }

  public get head() : QueueNode<unknown> | null {
    return this._head;
  }

  public get length() : number {
    return this._length;
  }

  private static ensureNode(node : QueueNode<unknown> | unknown) : QueueNode<unknown> {
    if (node instanceof QueueNode) {
      return node;
    }
    return new QueueNode<typeof node>(node);
  }

  public enqueue(node : QueueNode<unknown>) : void {
    // eslint-disable-next-line no-param-reassign
    node.prev = this._tail ? this._tail : null;
    this._tail = node;
    if (!this._head) {
      this._head = node;
    }
    this._length += 1;
  }

  public dequeue() : QueueNode<unknown> | null {
    if (!this._tail) {
      return null;
    }
    if (!this._tail.prev) {
      const res = this._tail;
      this._tail = null;
      this._head = null;
      this._length = 0;
      return res;
    }

    let current : QueueNode<unknown> | null = this._tail;
    let next : QueueNode<unknown> | null = current.prev;
    while (next?.prev) {
      current = next;
      next = next.prev;
    }
    current.prev = null;
    this._head = current;
    this._length -= 1;
    return next;
  }

  public purge() : void {
    this._head = null;
    this._tail = null;
    this._length = 0;
  }
}

export default Queue;
