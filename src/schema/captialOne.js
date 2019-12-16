/** 
 * This module will include related information
 * about Capital One csv data.
 */

// Create the capital one schema object.
const capitalOneSchema = {

    headers: {
        "Transaction Date": {

        },
        "Posted Date": {

        },
        "Card No.": {

        },
        "Description": {

        },
        "Category": {

        },
        "Debit": {

        },
        "Credit": {

        }
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
        date: json['Transaction Date'],
        description: json['Description'],
        category: json['Category'],
        amount: (json['Debit'] * -1) || (json['Credit'])
    }
}

// Attach the to transaction function to the schema.
capitalOneSchema.toTransaction = toTransaction;

// Export the schema.
module.exports = capitalOneSchema;