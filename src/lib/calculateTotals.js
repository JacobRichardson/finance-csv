/** 
 * This module calculates the total amount 
 * of credits and debits for a given set  of
 * transactions. An object of totals is returned
 * with debits and credits. The debits will be
 * categorized into categories as well as a
 * not categorized category for transactions that
 * are not categorized.
 */

// Export the function.
module.exports = calculateTotals;

/**
 * Calculates the totals of given transactions.
 * @param {Array<Object>} transactions An array of transactions.
 * @return {Object} The total for each category in debits and
 * the total amount of credits.
 */
function calculateTotals (transactions) {

	// Set totals to a new object with debits as an object and credits to zero.
	const totals = {
		debits: {}
		, credits: 0
	};

	// Variable for the amount.
	let amount;

	// For each transaction.
	for (let transaction of transactions) {

		// If the amount is greater than zero (the transaction is a credit).
		if (transaction.amount > 0) {

			// Set credits equal to the current transaction amount added to the total.
			totals.credits = totals.credits + transaction.amount;

			// Move onto the next transaction.
			continue;
		}

		// Set amount equal to the absolute value of the amount.
		amount = Math.abs(transaction.amount);

		// If the transaction doesn't have a category
		if (!transaction.category) {

			// If the un categorized property doesn't exist on totals.
			if (!totals.debits.unCategorized) {

				// Set the un categorized property equal to this transaction's amount
				totals.debits.unCategorized = amount;
			}
			// Un categorized already exists on totals.
			else {

				// Add the current transaction amount to the un categorized amount.
				totals.debits.unCategorized = totals.debits.unCategorized + amount;
			}
		}
		// The transaction has a category.
		else {

			// If this transaction's category doesn't exist on totals.
			if (!totals.debits[transaction.category]) {

				// Set the category equal to this transaction's amount.
				totals.debits[transaction.category] = amount;

			}
			// The category already exists on totals.
			else {

				// Add the current transaction amount to the category.
				totals.debits[transaction.category] = totals.debits[transaction.category] + amount;
			}
		}
	}

	// Return totals.
	return totals;
}