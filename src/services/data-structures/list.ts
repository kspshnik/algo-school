/* eslint-disable no-param-reassign */
import ListNode from './list-node';

class List {
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

  public prepend(node : ListNode<unknown>) : void {
    if (this._head) {
      // eslint-disable-next-line no-param-reassign
      node.prev = this._head;
      this._head.next = node;
    } else {
      this._tail = node;
    }
    this._head = node;
    this._setLength();
  }

  public append(node : ListNode<unknown>) : void {
    if (this._tail) {
      // eslint-disable-next-line no-param-reassign
      node.next = this._tail;
      this._tail.prev = node;
    } else {
      this._head = node;
    }
    this._tail = node;
    this._setLength();
  }

  public insertAtPosition(node : ListNode<unknown>, position : number) {
    let current : ListNode<unknown>;
    let pre : ListNode<unknown>;
    let post : ListNode<unknown>;
    if (this._head) {
      current = this._head;
      for (let i = 0; i < position; i += 1) {
        if (current) {
          if (!current.next) {
            throw new RangeError('Position is out of range!');
          }
          current = current.next;
        }
      }
      if (current.next) {
        pre = current;
        post = current.next;
        pre.next = node;
        post.prev = node;
        node.next = pre;
        node.prev = post;
      } else {
        this.append(node);
      }
    } else {
      this.prepend(node);
    }
  }

  public purge() {
    this._head = null;
    this._tail = null;
    this._length = 0;
  }

  private _setLength() {
    let count = 0;
    let current = this._head;
    const nodesArray : Array<unknown> = [];
    nodesArray.push(current);
    while (current && !nodesArray.includes(current)) {
      count += 1;
      current = current.prev;
      nodesArray.push(current);
    }
    this._length = count;
  }
}

export default List;
