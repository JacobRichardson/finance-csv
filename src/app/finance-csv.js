/** 
 * This is the Finance Csv class.
 */

// Imports. 
const requireDirectory = require('require-directory');

/** 
 * Finance Csv Class.
 */
class FinanceCsv {

	/**
	 * Creates an instance of FinanceCsv.
	 * @param {Object} opts The opts object.
	 * @param {Function} [opts.processCsv] The process csv dependency.
	 * @param {Function} [opts.toJson] The to json dependency.
	 * @param {Function} [opts.verifyHeaders] The verify headers dependency.
	 * @param {Object} [opts.providers] The providers schema dependency.
	 * @param {Function} [opts.toTransactions] The to transaction dependency.
	 * @param {Function} [opts.bulkInsert] The bulk insert dependency.
	 * @memberof FinanceCsv
	 */
	constructor({ processCsv, toJson, verifyHeaders, providers, toTransactions, calculateTotals, bulkInsert, googleSheet, toSheetData, insertGoogleSheet }) {

		// Set dependencies as a new object.
		this.dependencies = {};

		/** 
		 * Attach all the dependencies that were passed in or set them to default.
		 */
		this.dependencies.processCsv = processCsv || require('../lib/processCsv');
		this.dependencies.toJson = toJson || require('../lib/toJson');
		this.dependencies.verifyHeaders = verifyHeaders || require('../lib/verifyHeaders');
		this.dependencies.providers = providers || requireDirectory(module, '../schema');
		this.dependencies.toTransactions = toTransactions || require('../lib/toTransactions');
		this.dependencies.calculateTotals = calculateTotals || require('../lib/calculateTotals');
		this.dependencies.bulkInsert = bulkInsert || require('../lib/bulkInsert');
		this.dependencies.googleSheet = googleSheet || require('google-sheet').GoogleSheets;
		this.dependencies.toSheetData = toSheetData || require('../lib/toSheetData');
		this.dependencies.insertGoogleSheet = insertGoogleSheet || require('../lib/insertGoogleSheet');
	}

	/**
	 * Processes raw csv data using the process
	 * csv dependency.
	 * @param {String} csv The csv data.
	 * @returns {Array<Array<String>>} A 2d array of the processed csv data.
	 * @memberof FinanceCsv
	 */
	processCsv(csv) {

		// Set result equal to the processed csv.
		const result = this.dependencies.processCsv(csv);

		// Return the result.
		return result;
	}

	/**
	 * Verifies the headers are correct for a given provider,
	 * the headers array, and a given providers schema.
	 * @param {Object} opts The opts object.
	 * @param {String} opts.provider The actual provider.
	 * @param {Array<String>} opts.headers An array of string headers.
	 * @param {Object} [opts.providers] The providers schema.
	 * @returns {Boolean} Wether or not the headers are correct.
	 * @memberof FinanceCsv
	 */
	verifyHeaders({ provider, headers, providers }) {

		// Set opts equal to the provider, headers, and the provider to the default.
		const opts = {
			provider
			, headers
			, providers: providers || this.dependencies.providers
		};

		// Set result equal to the result of verify headers with the opts.
		const result = this.dependencies.verifyHeaders(opts);

		// Return result.
		return result;
	}

	/**
	 * Converts processed csv data into json.
	 * @param {Array<Array<String>>} data A 2d array of the csv data.
	 * @returns {Array<Object>} The resulting keyed json.
	 * @memberof FinanceCsv
	 */
	toJson(data) {

		// Set result equal to the to json of the data.
		const result = this.dependencies.toJson(data);

		// Return the result.
		return result;
	}

	/**
	 * Converts processed json into transaction objects.
	 * @param {Object} opts The opts object.
	 * @param {String} opts.provider The actual provider.
	 * @param {Array<Object>} opts.headers An array processed json data.
	 * @param {Object} [opts.providers] The providers schema.
	 * @param {Function} [opts.toTransactions] An optional custom to transactions function.
	 * @returns {Array<Object>} An array of transaction objects.
	 * @memberof FinanceCsv
	 */
	toTransactions({ provider, data, providers, toTransactions }) {

		// Set opts equal to the provider, headers, and the provider to the default.
		const opts = {
			provider
			, data
			, providers: providers || this.dependencies.providers
		};

		// Set the to transaction function to the function passed it or itself.
		this.dependencies.toTransactions = toTransactions || this.dependencies.toTransactions

		// Set result equal to the result of to transaction with the opts.
		const result = this.dependencies.toTransactions(opts);

		// Return the result.
		return result;
	}

	/** 
	 * Calculates the totals of the transaction data.
	 * @param {Object} opts The opts object.
	 * @param {Array<Object>} opts.transactions An array of transaction objects.
	 * @param {Function} [opts.calculateTotals] An optional custom calculate totals function.
	 * @return {Object} The total for each category in debits and
	 * the total amount of credits.
	 *  @memberof FinanceCsv
	 */
	calculateTotals({ transactions, calculateTotals }) {

		// Set the calculate totals function to to the function passed it or itself.
		this.dependencies.calculateTotals = calculateTotals || this.dependencies.calculateTotals

		// Set result equal to the calculate totals of the transactions.
		const result = this.dependencies.calculateTotals(transactions);

		// Return result.
		return result;
	}

	/**
	 * This module converts the totals object into usable sheet
	 * data to insert into the google sheet.
	 * @param {Object} opts The opts object.
	 * @param {Object} opts.totals The totals object which contains
	 * all the totals of the different categories.
	 *  @param {String} opts.provider The actual provider.
	 * @param {Object} [opts.providers] The providers schema.
	 * @returns {Object} The sheet data.
	 * @memberof FinanceCsv
	 */
	toSheetData({ totals, provider, providers }) {

		// Create the to sheet data opts.
		const toSheetDataOpts = {
			totals
			, provider
			, providers: providers || this.dependencies.providers
		}

		// Retrieve the results.
		const results = this.dependencies.toSheetData(toSheetDataOpts);

		// Return the results.
		return results;
	}

	/**
	 * Inserts sheet data into the sheet.
	 * @param {Object} opts The opts object.
	 * @param {Object} opts.sheetId The id of the sheet where the data
	 * is going to be inserted.
	 * @param {Object} opts.data The data object which contains the
	 * cell pair as the key and the value as the value of that property.
	 * @param {Object} [opts.googleSheet] The google sheet dependency.
	 * @returns {Boolean} Wether the insert was successful or not.
	 * @memberof FinanceCsv
	 */
	async insertGoogleSheet ({ sheetId, data, googleSheet }) {

		// Create the insert google sheet opts.
		const insertGoogleSheetOpts = {
			sheetId
			, data
			, googleSheet: googleSheet || this.dependencies.googleSheet
		}

		// Retrieve the result from inserting the data.
		await this.dependencies.insertGoogleSheet(insertGoogleSheetOpts);

		// Return true for now?
		return true;
	}

	/** 
	 * Handles the entire process of handling the csv data.
	 * @param {Object} opts The opts object.
	 * @param {String} opts.csv The raw csv data.
	 * @param {String} opts.provider The provider of the csv data.
	 * @param {String} opts.sheetId The sheet id the totals are being inserted into.
	 * @param {Boolean} [opts.providers] The providers.
	 * @param {Boolean} [opts.preformVerifyHeaders] Wether or not to verify the headers.
	 * @param {Boolean} [opts.preformInsertDb] Wether or not to preform an insert
	 * @param {Boolean} [opts.preformCalculateTotals] Wether or not to calculate
	 * the totals of the transactions.
	 * @param {Boolean} [ops.preformInsertGoogleSheet] Wether or not to perform an insert
	 * into the google sheet.
	 * @return {Object} The total for each category in debits and
	 * the total amount of credits.
	 * @throws {Error} An error.
	 *  @memberof FinanceCsv
	 */
	async main ({ csv, provider, sheetId, providers, preformVerifyHeaders, preformInsertDb, preformCalculateTotals, preformInsertGoogleSheet }) {

		// Process the csv using the process csv dependency.
		const processedCsv = this.dependencies.processCsv(csv);

		// If verify headers is true.
		if (preformVerifyHeaders) {

			// Verify the headers are correct using the verify headers dependency.
			const hasValidHeaders = this.dependencies.verifyHeaders(processedCsv[0]);

			// If the headers are not valid.
			if (!hasValidHeaders) {

				// Throw an error.
				throw new Error('The headers were requested to be verified and they are incorrect.');
			}
		}

		// Process the csv into json using the to json dependency.
		const processedJson = this.dependencies.toJson(processedCsv);

		// Process the json into transaction objects using the to transaction dependency.
		const transactions = this.dependencies.toTransactions({
			data: processedJson
			, provider
			, providers: providers || this.dependencies.providers
		});

		// If preform insert is true.
		if (preformInsertDb) {

			// Pass the transactions to be inserted.
			await this.dependencies.bulkInsert(transactions);
		}

		// Variable for the totals.
		let totals;

		// If preform calculations is truthy.
		if (preformCalculateTotals) {

			// Process the transaction to calculate the totals.
			totals = this.dependencies.calculateTotals(transactions);
		}

		// If preform insert google sheet is truthy.
		if (preformInsertGoogleSheet) {

			// Retrieve the sheet data using totals and the provider.
			const sheetData = this.dependencies.toSheetData({
				totals
				, provider
				, providers: providers || this.dependencies.providers
			});

			// Create the insert google sheet opts.
			const insertGoogleSheetOpts = {
				sheetId
				, data: sheetData
				, googleSheet: this.dependencies.googleSheet
			}

			// Insert the information into the google sheet.
			await this.dependencies.insertGoogleSheet(insertGoogleSheetOpts);
		}

		// TODO: Decide return value.

		// Return the totals.
		return totals;
	}
}

// Export the class.
module.exports = FinanceCsv;