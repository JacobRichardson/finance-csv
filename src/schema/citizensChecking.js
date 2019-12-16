/** 
 * This module will include related information
 * about Citizen's Bank Checking csv data.
 */

// Create the citizens bank checking schema object.
const citizensBankCheckingSchema = {

    headers: {
        "Transaction Type": {

        },
        "Date": {

        },
        "Account Type": {

        },
        "Description": {

        },
        "Amount": {

        },
        "Reference No.": {

        },
        "Credits": {

        },
        "Debits": {

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
        date: json['Date'],
        description: json['Description'],
        category: json['Merchant Category Description'],
        amount: json['Amount']
    }
}

// Attach the to transaction function to the schema.
citizensBankCheckingSchema.toTransaction = toTransaction;

// Export the schema.
module.exports = citizensBankCheckingSchema;