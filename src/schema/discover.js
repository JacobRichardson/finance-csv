/** 
 * This module will include related information
 * about Discovers csv data.
 */

// Create the discover schema.
const discoverSchema = {

    headers: {
        "Trans. Date": {

        },
        "Post Date": {

        },
        "Description": {

        },
        "Amount": {

        },
        "Category": {

        }
    }
    , totals: {
        'Gasoline': '21,H'
    }
}

/**
 * Transforms the raw json into a transaction.
 * @param {Object} json The raw json data from the csv file.
 * @returns {Object} A transaction object to be inserted into the db.
 */
function toTransaction(json) {

    // Return an object with the correct properties.
    return {
        date: json['Trans. Date'],
        description: json['Description'],
        category: json['Category'],
        amount: (json['Amount'] * -1)
    }
}

// Attach the to transaction function to the schema.
discoverSchema.toTransaction = toTransaction;

// Export the schema.
module.exports = discoverSchema;