/**
 * Helper Class — Math Dialect To implement a functionality of aliases for
 * functions, it is necessary to know, what kind of an alias it is. This call
 * help to bring formulas to standard forms.
 * 
 */

function MathDialect() {}
MathDialect.WEST = 1; /* Standard western dialect, used by default (as a non-alias) */
MathDialect.WEST_LONG = 2; /* Standard western dialect, used by default (as a non-alias) */

MathDialect.EAST = 16; /* Eastern dialect where some functions are called differently, e. g. tan as tg. */

MathDialect.GREEK =32; /* Greek symbols */

MathDialect.RUS = 48; /* Russian variant of writing names, e.g. “син” for sine */
MathDialect.RUS_LONG = 49; /* Russian long variant of writing names, e.g. “синус” for sine */

MathDialect.PROGRAMMING = 64; /* Notation used in some programming lanugages e.g. “asin” for arcsine. */

MathDialect.MISC = 0; /* All other dialects */