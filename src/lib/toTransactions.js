/** 
 * This module converts json into transaction
 * objects.
 */

// Export the to transactions function.
module.exports = toTransactions;

/**
 * Converts an array of json into an array of transaction
 * objects using the providers 'to transaction' function.
 * @param {Object} opts The opts object.
 * @param {String} opts.provider The provider of the json data.
 * @param {Array<Object>} opts.data An array of json data.
 * @param {Object} opts.providers The providers schema of all providers.
 * @throws {Error} An error.
 * @returns {Array<Object>} An array of transaction objects.
 */
function toTransactions ({ provider, data, providers }) {

	// If the provider doesn't have a to transaction function.
	if (!providers[provider].toTransaction) {

		// Throw an error.
		throw new Error('The toTransaction function must exist on the provider.');
	}

	// Set result to an empty array.
	const result = [];

	// For each json in data.
	for (let json of data) {

		// Push the result of converting the json to a transaction into the results array.
		result.push(providers[provider].toTransaction(json));
	}

	// Return the result.
	return result;
}