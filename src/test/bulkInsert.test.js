/** 
 * This module tests the bulk insert module.
 */

// Imports.
const test = require('tape');

// Compile test.
test('bulk insert complies', t => {

	try {

		// Require in the module.
		require('../lib/bulkInsert');

		// Pass the test because there is no error requiring in the project.
		t.pass('No error requiring in bulk insert.');

	} catch (e) {

		// Fail the test with the error.
		t.fail(e);
	}

	// End the test.
	t.end();
});