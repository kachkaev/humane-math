import _ from 'underscore';
/**
 * Stores the position of a token / tree / node / error / warning, etc.
 */

export class Position {

  /**
   * @param {int} row
   *        Horizontal position in original text, zero-based
   * @param {int} column
   *        Vertical position in original text, zero-based
   * @param {int} offset
   *        Absolute offset from the beginning of the original text, zero-based
   * @param {int} length
   *        Number of characters the object contains
   */
  constructor(row, column, offset, length) {
    if (!_.isNumber(row) || row % 1 !== 0 || row < 0) {
      throw `Position row is expected to be a non-negative iteger, ${row} given.`;
    }
    if (!_.isNumber(column) || column % 1 !== 0 || column < 0) {
      throw `Position column is expected to be a non-negative iteger, ${column} given.`;
    }
    if (!_.isNumber(offset) || offset % 1 !== 0 || offset < 0) {
      throw `Position offset is expected to be a non-negative iteger, ${offset} given.`;
    }
    if (!_.isNumber(length) || length % 1 !== 0 || length < 0) {
      throw `Position length is expected to be a non-negative iteger, ${length} given.`;
    }
    this.row = row;
    this.column = column;
    this.offset = offset;
    this.length = length;
  }

  /**
   * Creates a new Position object which contains the whole range of characters
   * from the beginning of position1 to the end of position2.
   *
   * @param {Position} position1
   * @param {Position} position2
   *
   * @returns {Position}
   *          new Position instance.
   */
  static unite(position1, position2) {
    return new Position(
        position1.column,
        position1.row,
        position1.offset,
        position2.length + position2.offset - position1.offset
      );
  }

  /**
   * Creates a new Position object which contains the range of characters between
   * end of position1 to the beginning of position2.
   *
   * @param {Position} position1
   * @param {Position} position2
   *
   * @returns {Position}
   *          new Position instance.
   */
  static between(position1, position2) {
    return new Position(
        position1.col + position1.length,
        position1.row,
        position1.offset + position1.length,
        position2.offset - position1.offset - position1.length
      );
  }

  /**
   * Creates a new Position object with zero length at the beginning of the given position.
   *
   * @param {Position} position
   *
   * @returns {Position}
   *          new Position instance.
   */
  static beginning(position) {
    return new Position(
        position.column,
        position.row,
        position.offset,
        0
      );
  }

  /**
   * Creates a new Pos object with zero length at the ending of the given position.
   *
   * @param {Position} position
   *
   * @returns {Position}
   *          new Position instance.
   */
  static ending(position) {
    return new Position(
        position.column + position.length,
        position.row,
        position.offset + position.length,
        0
      );
  }
}
