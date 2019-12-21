/**
 * This module handles inserting data
 * into the google sheet.
 */

// Export the function.
module.exports = insertIntoGoogleSheet;

/**
 * Inserts data into a sheet.
 * @param {Object} opts The opts object.
 * @param {String} opts.sheetId The id of the Google sheet.
 * @param {Object} opts.data An object of key value pairs such that
 * the key is the cell number separated by a comma ex: 1,2 means row
 * 1 column 2 and the value of the key should be the data that is
 * going to be inserted into that cell.
 * @param {Object} opts.googleSheet The dependency to interact with the
 * Google sheet.
 * @throws {Error} An error.
 */
async function insertIntoGoogleSheet ({ sheetId, data, googleSheet }) {

	// Value for the sheet.
	let sheet;

	try {
		// Use the Google sheet module to retrieve the sheet.
		sheet = await googleSheet.accessSpreadsheet(sheetId);
	}
	catch (e) {

		// Throw an error.
		throw new Error('Error trying to access the sheet: ', e);
	}

	// An array of cells that need to be saved.
	const toBeSavedCells = [];

	// Values for the cell, row, and column.
	let cell, row, col;

	// For each key in data.
	for (let key of Object.keys(data)) {

		// If the key doesn't include a comma.
		if (!key.includes(',')) {

			// Throw an error.
			throw new Error('Invalid data provided. The key must contain a comma.');
		}

		// Set row equal to parsing the first value as an integer when spitting on the comma.
		row = parseInt(key.split(',')[0], 10);

		// Set col equal to parsing the second value as an integer when splitting on the comma.
		col = parseInt(key.split(',')[1], 10);

		try {

			// Retrieve the cell.
			cell = await googleSheet.getCell(sheet, row, col);
		}
		catch (e) {

			// Throw an error.
			throw new Error('Error trying to retrieve the cell:', e);
		}

		// Set the value of the cell equal to the value of the data object.
		cell._value = data[key];

		// Push the cell into the to be saved cells.
		toBeSavedCells.push(cell);
	}

	// Save all the cells.
	await googleSheet.saveCells(sheet, toBeSavedCells);
}