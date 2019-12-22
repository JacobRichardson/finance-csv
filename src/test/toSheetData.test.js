/** 
 * This module tests the to sheet data module.
 */

// Imports.
const test = require('tape');

// Compile test.
test('to sheet data module complies', t => {

	try {

		// Require in the module.
		require('../lib/toSheetData');

		// Pass the test because there is no error requiring in the project.
		t.pass('No error requiring in to sheet data module.');

	}
	catch (e) {

		// Fail the test with the error.
		t.fail(e);
	}

	// End the test.
	t.end();
});

// TODO: Write more tests.