/*
 * Message keeps information about an error or a warning
 * revealed during text analysis
 */
export class Message {

  static LEVEL_ERROR = 10;
  static LEVEL_WARNING = 8;

  /**
   * Creates a message
   *
   * @param {string} level
   *    LEVEL_ERROR | LEVEL_WARNING
   * @param {string} type
   *    Unique textual identifier of a message type.
   * @param {Pos} pos
   *    Part of the Text the message is related to.
   * @param {Object} params
   *    Additional parameters of the message that clarify its context.
   */
  constructor(level, type, pos, params = {}) {
    this._level = level;
    this._type = type;
    this._pos = pos;
    this._params = params;
  }

  get level() {return this._level;}
  get type() {return this._type;}
  get pos() {return this._pos;}
  get params() {return this._params;}
}
