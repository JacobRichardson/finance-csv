/** 
 * This module tests the process csv module.
 */

// Imports.
const test = require('tape');
const describe = require('riteway').describe;

// Compile test.
test('process csv complies', t => {

    try {

        // Require in the module.
        require('../lib/processCsv');

        // Pass the test because there is no error requiring in the project.
        t.pass('No error requiring in process csv.');

    } catch (e) {

        // Fail the test with the error.
        t.fail(e);
    }

    // End the test.
    t.end();
});

// Require in the module not that it complies.
const processCsv = require('../lib/processCsv');

// Test the process csv function.
describe('processCsv()', async assert => {

    // Variable for the test data.
    const testData = `header1,header2,header3\ndata1,data2,data3`;

    // Create an assertion.
    assert({
        given: testData,
        should: 'Create a 2D array of the csv.',
        actual: processCsv(testData),
        expected: [
            ['header1', 'header2', 'header3'],
            ['data1', 'data2', 'data3']
        ]
    });
});