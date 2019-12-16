/** 
 * This module will include related information
 * about Citizen's Bank Credit Card csv data.
 */

// Create the citizens bank credit card.
const citizensBankCCSchema = {

    headers: {
        "Date": {

        },
        "Activity Type": {

        },
        "Merchant Name": {

        },
        "Merchant Category Description": {

        },
        "Amount": {

        },
        "Rewards": {

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
        description: json['Merchant Name'],
        category: json['Merchant Category Description'],
        amount: (json['Amount'] * -1)
    }
}

// Attach the to transaction function to the schema.
citizensBankCCSchema.toTransaction = toTransaction;

// Export the schema.
module.exports = citizensBankCCSchema;