/** 
 * This module converts a 2D array of csv into keyed json.
 */

// Export the function
module.exports = toJson;

/**
 * Converts the 2D array of csv into keyed Json. This mean
 * it will create an object for each row in the csv with
 * the keys equal to the column headers.
 * @param {Array<Array>} data A 2D array of the csv data.
 * @returns {Array<Object>} An array of he json data.
 * @throws {Error} If a 2D array is not supplied to the function.
 */
function toJson(data) {

    // If data is not array.
    if (!Array.isArray(data)) {

        // Throw an error.
        throw new Error('An array must be passed to the to json function.');
    }

    // If data has no elements.
    if (data.length === 0) {

        // Throw an error.
        throw new Error('A 2D array must be provided to the to json function.');
    }

    // Variable if the data contains all arrays.
    let containsAllArrays;

    // For each value in data.
    data.forEach(array => {

        // If the element is not an array.
        if (!Array.isArray(array)) {

            // Set contains all arrays to false.
            containsAllArrays = false;
        }
    });

    // If the array doesn't contain all arrays.
    if (containsAllArrays === false) {

        // Throw an error.
        throw new Error('A 2D array must be provided to the to json function.');
    }

    // The retrieve the column headers from the first row in data.
    const columnHeaders = data[0];

    // Set headers map to an empty object.
    const headersMap = {};

    // For each header in the first row.
    columnHeaders.forEach((header, index) => {

        // Set the index equal to the header.
        headersMap[index] = header;
    });

    // Remove the first element (headers array) from the data array.
    data.shift();

    // Variable for a row of json.
    let rowJson;

    // Set result to a new array.
    const result = [];

    // For each row.
    data.forEach(row => {

        // Set row json to a new object.
        rowJson = {};

        // For each value in row.
        row.forEach((value, index) => {

            // Set the header value as the property and the value as the value.
            rowJson[headersMap[index]] = value;
        });

        // Push the json into result.
        result.push(rowJson);
    });

    // Return result.
    return result;
}