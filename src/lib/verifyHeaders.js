/** 
 * This module verifies the correct column
 * headers for csv data for a certain provider.
 */

// Export the module.
module.exports = verifyHeaders;

// Imports.
const requireDirectory = require('require-directory');
const providers = requireDirectory(module, '../schema');

/**
 * Verifies the csv data has the correct headers.
 * @param {String} provider The provider of the csv file.
 * @param {Array<String>} headers An array of the header strings.
 * @returns {Boolean} Wether or not the headers are correct.
 * @throws {Error} An error.
 */
function verifyHeaders(provider, headers) {

    // If type of provider does not equal string.
    if (typeof (provider) !== 'string') {

        // Throw an error.
        throw new Error('Provider must be passed as a string to the verify headers function.')
    }

    // If headers isn't an array.
    if (!Array.isArray(headers)) {

        // Throw an error.
        throw new Error('Headers must be passed as an array to the verify headers function.')
    }

    // If the provider doesn't exist.
    if (!providers[provider]) {

        // Return false.
        return false;
    }

    // If the aren't the same number of headers.
    if (Object.keys(providers[provider].headers).length !== headers.length) {

        // Return false.
        return false;
    }

    // For each header.
    for (let header of headers) {

        // If the header is not a string.
        if (typeof (header) !== 'string') {

            // Throw an error.
            throw new Error('Only strings can be passed in the header array to the verify headers function.')
        }

        // If the header doesn't exist on headers.
        if (!providers[provider].headers[header]) {

            // Return false.
            return false;
        }
    }

    // Return true.
    return true;
}