/**
 * MessageList is used to store lists of errors or warnings in Math classes.
 */
export class MessageList {

  /**
   * Creates an empty list of Math Messages
   *
   * @param {MathMessageList} [MathMessageList1], [MathMessageList2], [...]
   *    Lists to be joined.
   */
  constructor(...listsToJoin) {
    this.clear();

    // Join input argument lists if any arguments were passed.
    if (listsToJoin.length) {

      for (var i = listsToJoin.length - 1; i >= 0; i--) {
        if (arguments[i]) {
          this._list = this._list.concat(listsToJoin[i]._list);
        }
      }
    }
  }

  /**
   * Clears the list of Math Messages
   *
   * @returns {MathMessageList} current object.
   */
  clear() {
    this._list = [];
    return this;
  }

  /**
   * Adds a message into the list.
   *
   * @param {Message} message
   *    message Message that needs to be added.
   *
   * @returns {MessageList}
   *     current object
   */
  add(message)
  {
    this._list.push(message);
    return this;
  }

  /**
   * Helps to verify whether a list of messages is empty.
   *
   * @returns {boolean}
   *     true if the list is empty.
   */
  isEmpty()
  {
    return this._list.length == 0;
  }

  /**
   * Returns the number of messages in the list.
   *
   * @returns {number}
   */
  count()
  {
    return this._list.length;
  }

  /**
   * Sorts the list by message positions.
   *
   * @returns {MessageList}
   *     current object
   */
  sort()
  {
    this._list = _.sortBy(this._list, function(mathMessage)
    {
      if (mathMessage.pos) {
        return mathMessage.pos.pos + 0.0001 * mathMessage.pos.len;
      } else {
        return Infinity;
      }
    });
    return this;
  }
}
