/*
 * Message keeps information about an error or a warning in a math text
 */
export class Message {

  /**
   * Creates a message
   *
   * @param {string} type
   *    Unique textual identifier of a message type.
   * @param {Pos} pos
   *    Part of the Text the message is related to.
   * @param {Object} params
   *    Additional parameters of the message that clarify its context.
   */
  constructor(type, pos, params = {}) {
    this._type = type;
    this._pos = pos;
    this._params = params;
    //this.strCache = null;
  }

  get type() {return this._type;}
  get pos() {return this._pos;}
  get params() {return this._params;}
}
