/*
 * Math Message keeps information about an error or warning, found in the Math Object
 */
/**
 * Creates a message
 * @param {Object} type
 * @param {Object} pos
 * @param {Object} params
 */
function MathMessage(type, pos, params)
{
	this.type = type;
	this.pos = pos;
	this.params = params;
	this.strCache = null;
}

MathMessage.prototype = {};

/**
 * Returns a user-friendly message text with details.
 */
MathMessage.prototype.toString = function()
{
	if (!this.params)
		this.params = {};
	if (!this.strCache) 
		this.strCache = Lang.str(["math_message", this.type], _.extend(this.params, this.pos));
	return this.strCache;
};
