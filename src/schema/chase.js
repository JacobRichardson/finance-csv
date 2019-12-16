/** 
 * This module will include related information
 * about Chase csv data.
 */

// Create the chase schema object.
const chaseSchema = {

    headers: {
        "Transaction Date": {

        },
        "Post Date": {

        },
        "Description": {

        },
        "Category": {

        },
        "Type": {

        },
        "Amount": {

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
        amount: json['Amount']
    }
}


// Attach the to transaction function to the schema.
chaseSchema.toTransaction = toTransaction;

// Export the schema.
module.exports = chaseSchema;