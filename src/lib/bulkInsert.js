/** 
 * This module handles bulk inserting
 * json into the database.
 */

// Export the function.
module.exports = bulkInsert;

// Imports.
const db = require('./db');

/**
 * Inserts multiple records into a model.
 * @param {String} model The name of the model.
 * @param {Array<Object>} data An array of data objects.
 * @returns {Array<Object>} The inserted data.
 * @throws {Error} An error.
 */
async function bulkInsert (model, data) {

	// If the model is not on the db.
	if (!db[model]) {

		// Throw an error.
		throw new Error('That model doesn\'t exist.');
	}

	// Set result to an empty array.
	const result = [];

	// For each record in data.
	for (let record of data) {

		// Insert the record into the db.
		const insertedRecord = await db[model].insert(record);

		// Push the record into result.
		result.push(insertedRecord);
	}

	// Close the db.
	db.close();

	// Return result.
	return result;
}

// TODO: Find a way to remove this.
// Close the db connection.
db.close();