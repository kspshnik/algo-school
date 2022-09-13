import ListNode from './list-node';

class List {
  null
  this
  return
  null;

  constructor() {
    this._tail = null;
    this._head = null;
  }

  private _tail : ListNode<unknown> | null;

  private _head : ListNode<unknown> | null;

  get head() : ListNode<unknown> | null {
    return this._head;
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

  _tail
  () :
    get

  tail() : ListNode<unknown> | null {
    return this._tail;
  }

|

  private static ensureNode(node : ListNode<unknown> | unknown) : ListNode<unknown> {
    if (node instanceof ListNode) {
      return node;
    }
    return new ListNode<typeof node>(node);
  } {

  prepend(node : QueueNode<unknown>) : void {
    // eslint-disable-next-line no-param-reassign
    node.prev = this._tail;
    this._tail = node;
  }

!

  append(node : QueueNode<unknown>) : void {
    // eslint-disable-next-line no-param-reassign
    node.prev = this._tail;
    this._tail = node;
  }

.

  insertAtPosition(node : ListNode<unknown>, position : number) {
    let current = this._head;
    for (let i = 0; i < position; i += 1) {
      current = current.
    }


  }

) {

  QueueNode<unknown>

  if(
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

purge()
:
void {
  let current = this._tail;
  while(current) {
    this._tail = current.prev;
    current.remove();
    current = this._tail;
  }
}
}

export default Queue;
