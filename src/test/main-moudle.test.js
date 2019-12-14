/**
 * This module tests the main module.
 */

// Imports.
const test = require('tape');

// Compile test.
test('Main module complies.', async (t) => {

	try {

		// Require in the module.
		require('../app/main-module');

		// Pass the test because there were no errors and the module complied.
		t.pass('The module complied.');

	} catch (e) {

		// Fail the test with the error.
		t.fail(e);
	}

	// End the test.
	t.end();
});