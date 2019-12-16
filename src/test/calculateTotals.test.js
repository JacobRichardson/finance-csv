/** 
 * This module tests the calculate totals module.
 */

// Imports.
const test = require('tape');
const describe = require('riteway').describe;

// Compile test.
test('calculate totals complies', t => {

	try {

		// Require in the module.
		require('../lib/toJson');

		// Pass the test because there is no error requiring in the module.
		t.pass('No error requiring in calculate totals.');

	} catch (e) {

		// Fail the test with the error.
		t.fail(e);
	}

	// End the test.
	t.end();
});

// Require in the module now that it complies.
const calculateTotals = require('../lib/calculateTotals');

// Verify the module works properly.
describe('calculateTotals() works properly.', async assert => {

	// Create the test data (example discover json).
	const testData = [

		{
			date: '06/21/2050'
			, description: 'INTERNET PAYMENT - THANK YOU'
			, category: 'Payments and Credits'
			, amount: 100
		}
		, {
			date: '06/22/2050'
			, description: 'Starship'
			, category: 'Travel and Entertainment'
			, amount: -10000000
		}
		, {
			date: '06/23/2050'
			, description: 'INTERNET PAYMENT - THANK YOU'
			, category: 'Payments and Credits'
			, amount: 1000
		}
		, {
			date: '06/24/2050'
			, description: 'Movies'
			, category: 'Travel and Entertainment'
			, amount: -50
		}
		, {
			date: '06/25/2050'
			, description: 'Clothes'
			, category: 'Merchandise'
			, amount: -100
		}
	]

	// Expected result.
	const expectedResult = {
		debits: {
			'Travel and Entertainment': 10000050
			, 'Merchandise': 100
		}
		, credits: 1100
	}

	// Create an assertion.
	assert({
		given: 'transactions.'
		, should: 'totals them properly.'
		, actual: calculateTotals(testData)
		, expected: expectedResult
	});
});