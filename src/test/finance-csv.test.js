/** 
 * This module tests the finance csv class.
 */

// Imports.
const test = require('tape');

// Compile test.
test('finance csv class complies', t => {

	try {

		// Require in the module.
		require('../lib/toJson');

		// Pass the test because there is no error requiring in the project.
		t.pass('No error requiring in finance csv class.');

	} catch (e) {

		// Fail the test with the error.
		t.fail(e);
	}

	// End the test.
	t.end();
});

// TODO: Write more tests.