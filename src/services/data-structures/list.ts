/* eslint-disable no-param-reassign */
import ListNode from './list-node';
import { ListInterface } from '../../types/algo-struct.types';

class List implements ListInterface {
  constructor() {
    this._tail = null;
    this._head = null;
    this._length = 0;
  }

  private _tail : ListNode<unknown> | null;

  get tail() : ListNode<unknown> | null {
    return this._tail;
  }

  private _head : ListNode<unknown> | null;

  get head() : ListNode<unknown> | null {
    return this._head;
  }

  private _length : number;

  get length() : number {
    return this._length;
  }

  get isEmpty() : boolean {
    return this._head === null && this._tail === null;
  }

  get isCycled() : boolean {
    let current = this._head;
    if (!current) {
      return false;
    }
    while (current.prev) {
      if (current.prev.prev === this._tail) {
        return true;
      }
      current = current.prev;
    }
    return false;
  }

  private static ensureNode(node : ListNode<unknown> | unknown) : ListNode<unknown> {
    if (node instanceof ListNode) {
      return node;
    }
    return new ListNode<typeof node>(node);
  }

  public insertAtHead(node : ListNode<unknown>) : void {
    if (this._head) {
      // eslint-disable-next-line no-param-reassign
      node.prev = this._head;
      this._head.next = node;
    } else {
      this._tail = node;
    }
    this._head = node;
    this._length += 1;
  }

  public deleteAtHead() : ListNode<unknown> {
    if (!this._head || this._length === 0) {
      throw new RangeError('Deletion index is out of range: list is empty');
    }
    const res : ListNode<unknown> = this._head;
    if (this._head.prev) {
      this._head.prev.next = null;
      this._head = this._head.prev;
    } else {
      this._head = null;
      this._tail = null;
    }
    this._length -= 1;
    return res;
  }

  public insertAtTail(node : ListNode<unknown>) : void {
    if (this._tail) {
      // eslint-disable-next-line no-param-reassign
      node.next = this._tail;
      this._tail.prev = node;
    } else {
      this._head = node;
    }
    this._tail = node;
    this._length += 1;
  }

  public deleteAtTail() : ListNode<unknown> {
    if (!this._tail || this._length === 0) {
      throw new RangeError('Deletion index is out of range: list is empty');
    }
    const res : ListNode<unknown> = this._tail;
    if (this._tail.next) {
      this._tail.next.prev = null;
      this._tail = this._tail.next;
    } else {
      this._head = null;
      this._tail = null;
    }
    this._length -= 1;
    return res;
  }

  public getAtPosition(position : number) : ListNode<unknown> | null {
    let current : ListNode<unknown>;
    if (!this._head || !this._tail || this._length === 0) {
      return null;
    }
    current = this._head;
    for (let i = 0; i < position; i += 1) {
      if (current) {
        if (!current.prev) {
          throw new RangeError('Position is out of range!');
        }
        current = current.prev;
      }
    }
    return current;
  }

  public insertAtPosition(node : ListNode<unknown>, position : number) {
    let current : ListNode<unknown>;
    let pre : ListNode<unknown>;
    let post : ListNode<unknown>;
    if (!this._head || !this._tail || this._length === 0) {
      throw new RangeError('Deletion index is out of range: list is empty');
    }
    if (this._head) {
      current = this._head;
      for (let i = 0; i < position; i += 1) {
        if (current) {
          if (!current.prev) {
            throw new RangeError('Position is out of range!');
          }
          current = current.prev;
        }
      }
      if (current.prev) {
        pre = current;
        post = current.prev;
        pre.prev = node;
        post.next = node;
        node.prev = pre;
        node.next = post;
      } else {
        this.insertAtTail(node);
      }
    } else {
      this.insertAtHead(node);
    }
  }

  public deleteAtPosition(position : number) : ListNode<unknown> {
    let current : ListNode<unknown>;
    if (position > this._length) {
      throw new RangeError('Position is out of range!');
    }
    if (!this._head || !this._tail || this._length === 0) {
      throw new RangeError('Deletion index is out of range: list is empty');
    }

    current = this._head;
    for (let i = 0; i < position; i += 1) {
      if (current) {
        if (!current.prev) {
          throw new RangeError('Position is out of range!');
        }
        current = current.prev;
      }
    }
    const res : ListNode<unknown> = current;
    if (current.prev) {
      current.prev.next = current.next;
    }
    if (current.next) {
      current.next.prev = current.prev;
    }

    this._length -= 1;
    return res;
  }

  public purge() {
    this._head = null;
    this._tail = null;
    this._length = 0;
  }
}

export default List;
