/** 
 * This module tests the insert google sheet module.
 */

// Imports.
const test = require('tape');

// Compile test.
test('insert google sheet module complies', t => {

	try {

		// Require in the module.
		require('../lib/insertGoogleSheet');

		// Pass the test because there is no error requiring in the project.
		t.pass('No error requiring in insert google sheet module.');
	}
	catch (e) {

		// Fail the test with the error.
		t.fail(e);
	}

	// End the test.
	t.end();
});

// TODO: Write more tests.