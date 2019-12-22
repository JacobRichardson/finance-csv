/** 
 * This module converts the totals object into sheet
 * data that can be used by the insert google sheet
 * module to insert the data into the google sheet.
 */

// Export the sheet data function.
module.exports = toSheetData;

/**
 * This function handles converting the total object
 * into an object that can be used to insert the data
 * into the google sheet.
 * @param {Object} totals The totals object.
 * @returns {Object} An object that can be passed to the 
 * insert google sheet module to insert the data. Key value
 * pairs of the cell number and the data to be inserted into
 * the cell number. ex: {'1,A': 10}
 */
function toSheetData ({ totals, provider, providers }) {

	// Create a new empty object.
	const sheetData = {};

	// For each category in debits.
	for (let category of Object.keys(totals.debits)) {

		// If the category is mapped to a cell.
		if (providers[provider].totals[category]) {

			// Set the cell value of the category equal to the the value of the category.
			sheetData[providers[provider].totals[category]] = totals.debits[category];

		}
	}

	// Return the sheetData.
	return sheetData;
}