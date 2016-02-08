import * as removeMarkdown from 'remove-markdown';
import {
  Message
} from 'humane-math';

export class Locale {

  /**
   * Returns a user-friendly message markdown with details.
   *
   * @param {Message} objectToLocalize
   *      HumaneMath object to extract localized sting from
   *
   * @returns {string}
   *      markdown
   */
  toMarkdown(objectToLocalize) {
    if (objectToLocalize instanceof Message) {
      let messageId = objectToLocalize.type;
      let message = this.messages[messageId];
      if (_.isString(message)) {
        return message;
      } else if (_.isFunction(message)){
        let params = _.extend(objectToLocalize.params || {}, objectToLocalize.pos);
        return message(params);
      }
    }
  }

  /**
   * Returns a user-friendly message text with details.
   *
   * @param {Message} objectToLocalize
   *      HumaneMath object to extract localized sting from
   *
   * @returns {string}
   *      unescaped text
   */
  toText(objectToLocalize) {
    var markdown = this.toMarkdown(objectToLocalize);
    return removeMarkdown(markdown);
  }
}
