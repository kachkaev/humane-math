/**
 * MathMessageList is used to store lists of errors or warnings in Math classes.
 */

/**
 * Creates an empty list of Math Messages
 * @param {MathMessageList} [MathMessageList1], [MathMessageList2], [...] Lists to be joined.
 */
function MathMessageList()
{
	this.clear();
	
	// Joining input argument lists if any arguments were passed.
	if (arguments.length) 
	{
				
		for (var i = arguments.length - 1; i >= 0; i--) 
		{
			if (arguments[i]) 
			{
				this.list = this.list.concat(arguments[i].list);
			}
		}
	}
}

MathMessageList.prototype = {};

/**
 * Clears the list of Math Messages
 * @return {MathMessageList} current object.
 */
MathMessageList.prototype.clear = function()
{
	this.list = [];
	return this;
};

/**
 * Adds a message into the list.
 * @param {MathMessage} message Message that needs to be added.
 * @return {MathMessageList} current object.
 */
MathMessageList.prototype.add = function(message)
{
	this.list.push(message);
	return this;
};

/**
 * Helps to verify whether a list of messages is empty.
 * @return {Boolean} true if the list is empty.
 */
MathMessageList.prototype.isEmpty = function()
{
	return this.list.length == 0;
};

/**
 * Returns the number of messages.
 * @return {Number}
 */
MathMessageList.prototype.count = function()
{
    return this.list.length;
};

/**
 * Sorts a list by message positions.
 * @return {MathMessageList} current object.
 */
MathMessageList.prototype.sort = function()
{
	this.list = _.sortBy(this.list, function(mathMessage)
	{
		if (mathMessage.pos) 
			return mathMessage.pos.pos + 0.0001 * mathMessage.pos.len;
		else 
			return Infinity;
	});
	return this;
};

/**
 * Avoids messages to be converted to JSON by json2 lib
 */
MathMessage.prototype.toJSON = function()
{
    return null;
};