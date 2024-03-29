import StackNode from './stack-node';
import { StackInterface } from '../../types/algo-struct.types';

class Stack implements StackInterface {
  constructor() {
    this._top = null;
  }

  private _top : StackNode<unknown> | null;

  public get top() : StackNode<unknown> | null {
    return this._top;
  }

  public get isEmpty() : boolean {
    return this._top === null;
  }

  public static ensureNode(node : StackNode<unknown> | unknown) : StackNode<unknown> {
    if (node instanceof StackNode) {
      return node;
    }
    return new StackNode<typeof node>(node);
  }

  public push(node : StackNode<unknown>) : void {
    // eslint-disable-next-line no-param-reassign
    node.on = this._top;
    this._top = node;
  }

  public pop() : StackNode<unknown> | null {
    const current : StackNode<unknown> | null = this._top;
    if (current) {
      this._top = current.on;
      current.on = null;
    }
    return current;
  }

  public peek() : StackNode<unknown> | null {
    return this._top;
  }

  public purge() : void {
    let current = this._top;
    while (current) {
      this._top = current.on;
      current.remove();
      current = this._top;
    }
  }

  public toArray() : Array<StackNode<unknown>> {
    let current : StackNode<unknown> | null = this._top;
    const res : Array<StackNode<unknown>> = [];
    while (current) {
      res.push(current);
      current = current.on;
    }
    return res;
  }
}

export default Stack;
