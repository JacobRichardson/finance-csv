/** 
 * This module tests the to transactions module.
 */

// Imports.
const test = require('tape');
const describe = require('riteway').describe;
const Try = require('riteway').Try;
const requireDirectory = require('require-directory');
const providers = requireDirectory(module, '../schema');

// Compile test.
test('to transactions complies', t => {

	try {

		// Require in the module.
		require('../lib/toJson');

		// Pass the test because there is no error requiring in the module.
		t.pass('No error requiring in to transactions.');

	} catch (e) {

		// Fail the test with the error.
		t.fail(e);
	}

	// End the test.
	t.end();
});

// Require in the module now that it complies.
const toTransactions = require('../lib/toTransactions');

// Verify no to transaction function error.
describe('toTransactions() with a provider with no toTransaction function.', async assert => {

	// Create an assertion.
	assert({
		given: 'a provider, an array, and provider with no toTransaction function'
		, should: 'throw correct error message.'
		, actual: Try(toTransactions, { provider: 'test', data: [], providers: { 'test': {} } }).toString()
		, expected: 'Error: The toTransaction function must exist on the provider.'
	});
});

// Verify works properly.
describe('toTransactions() with correct information.', async assert => {

	// Create the test data (example discover json).
	const testData = {
		'Trans. Date': '06/21/2050'
		, 'Post Date': '06/21/2050'
		, 'Description': 'Expensive Starship'
		, 'Amount': '10000000.00'
		, 'Category': 'Travel/Entertainment'
	};

	// Set the provider to the discover provider.
	const discoverProvider = {
		'discover': providers.discover
	};

	// Expected result.
	const expectedResult = {
		date: testData['Trans. Date']
		, description: testData['Description']
		, amount: testData['Amount'] * -1
		, category: testData['Category']
	}

	// Create an assertion.
	assert({
		given: 'a provider, an array of test data, and proper providers'
		, should: 'throw correct error message.'
		, actual: toTransactions({ provider: 'discover', data: [testData], providers: discoverProvider })
		, expected: [expectedResult]
	});
});