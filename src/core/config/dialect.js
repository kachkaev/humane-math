/**
 * Helper Class — to implement a functionality of aliases for functions
 */

export class Dialect {
  /** Standard western dialect, used by default (as a non-alias) */
  static WEST = 1;

  /** Standard western dialect, used by default (as a non-alias) */
  static WEST_LONG = 2;

  /** Eastern dialect where some functions are called differently, e. g. tan as tg. */
  static EAST = 16;

  /** Greek symbols */
  static GREEK = 32;

  /** Russian variant of writing names, e.g. “син” for sine */
  static RUS = 48;
  /** Russian long variant of writing names, e.g. “синус” for sine */
  static RUS_LONG = 49;

  /** Notation used in some programming languages e.g. “asin” for arcsine. */
  static PROGRAMMING = 64;

  /** All other dialects */
  static MISC = 0;
}
