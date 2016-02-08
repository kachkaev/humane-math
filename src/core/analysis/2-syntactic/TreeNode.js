import {
  TreeNodeType
} from 'humane-math';

/**
 * Part of Tree
 */
export class TreeNode {

  constructor() {
    this.type = TreeNodeType.EMPTY;
    this.brackets = false;
    this.hasErrors = false;
  }

  /**
   * Checks if the node is empty.
   *
   * @returns {boolean}
   */
  isEmpty() {
    return this.type == TreeNodeType.EMPTY;
  }

  /**
   * Checks if the node is unparsed
   *
   * @returns {boolean}
   */
  isUnparsed() {
    return this.type == TreeNodeType.UNPARSED;
  }
}
