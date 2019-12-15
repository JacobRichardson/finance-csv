/** 
 * This module tests the db moudle.
 */

// Imports.
const test = require('tape');

// Compile test.
test('db complies', async t => {

    try {

        // Require in the db.
        const db = require('../lib/db');

        // Close the connection.
        db.close();

        // Pass the test because there is no error requiring in the db.
        t.pass('No error requiring in db.');

    } catch (e) {

        // Fail the test with the error.
        t.fail(e);
    }

    // End the test.
    t.end();
});