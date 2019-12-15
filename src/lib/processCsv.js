/** 
 * This module handles processing the
 * raw CSV data into a 2D array.
 */

// Export process csv.
module.exports = processCsv;

/**
 * This function turns the csv data into
 * a 2D array.
 * @param {String} csv The csv data.
 * @returns {Array<Array<String>>} A 2d array of the processed csv data.
 */
function processCsv(csv) {

    // Set result equal to an empty array.
    const result = [];

    // Split the csv data into lines.
    const lines = csv.split('\n');

    // For each line.
    for (let line of lines) {

        // Push the result of splitting the line on comma.
        result.push(line.split(','));
    }

    // Return result.
    return result;
}