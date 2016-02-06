/**
 * Saves the position of a token / tree / node / error / warning, etc.
 */

export class Pos {

    /**
     * Creates an object that saves the position of
     * token / tree / node / error / warning / etc.
     *
     * @param {int} col
     *        Position — Column
     * @param {int} row
     *        Position — Row
     * @param {int} pos
     *        Absolute Position
     * @param {int} length
     *        Length of an object
     */
    construct(col, row, pos, length) {
        this.col = col;
        this.row = row;
        this.pos = pos;
        this.len = length;
    }

    /**
     * Creates a new Pos object which contains the whole range of characters
     * from the beginning of pos1 to the end of pos2.
     *
     * @param {Pos} pos1
     * @param {Pos} pos2
     *
     * @returns {Pos}
     *          new Pos object.
     */
    unite(pos1, pos2) {
        return new Pos(
                pos1.col,
                pos1.row,
                pos1.pos,
                pos2.len + pos2.pos - pos1.pos
            );
    }

    /**
     * Creates a new Pos object which contains the range of characters between
     * end of pos1 to the beginning of pos2.
     *
     * @param {Pos} pos1
     * @param {Pos} pos2
     *
     * @returns {Pos}
     *          new Pos object.
     */
    between(pos1, pos2) {
        return new Pos(
                pos1.col + pos1.len,
                pos1.row,
                pos1.pos + pos1.len,
                pos2.pos - pos1.pos - pos1.len
            );
    }

    /**
     * Creates a new Pos object with zero length at the beginning of the given pos.
     *
     * @param {Pos} pos
     *
     * @returns {Pos}
     */
    beginning(pos) {
        return new Pos(
                pos.col,
                pos.row,
                pos.pos,
                0
            );
    }

    /**
     * Creates a new Pos object with zero length at the ending of the given pos.
     *
     * @param {Pos} pos
     *
     * @returns {Pos}
     */
    ending(pos) {
        return new Pos(
                pos.col + pos.len,
                pos.row,
                pos.pos + pos.len,
                0
            );
    }
}
