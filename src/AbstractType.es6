/**
 * Types of nodes in a syntax tree
 */
export class AbstractType {

    /**
     * Returns the name of a type (useful during debugging).
     *
     * @param {number}
     *        type
     *
     * @returns {string}
     */
    static getAsString = function(type) {
        for (var k in this) {
            if (this[k] == type) {
                return k;
            }
        }
        return '';
    };
}
