/** 
 * This module tests the verify headers module.
 */

// Imports.
const test = require('tape');
const describe = require('riteway').describe;
const Try = require('riteway').Try;

// Compile test.
test('verify headers complies', t => {

    try {

        // Require in the module.
        require('../lib/toJson');

        // Pass the test because there is no error requiring in the module.
        t.pass('No error requiring in verify headers.');

    } catch (e) {

        // Fail the test with the error.
        t.fail(e);
    }

    // End the test.
    t.end();
});

// Require in the module now that it complies.
const verifyHeaders = require('../lib/verifyHeaders');

// Verify headers error string first parameter.
describe('verifyHeaders() wrong first parameter type.', async assert => {

    // Create an assertion.
    assert({
        given: 1,
        should: 'throw correct error message.',
        actual: Try(verifyHeaders, 1).toString(),
        expected: 'Error: Provider must be passed as a string to the verify headers function.'
    });
});

// Verify headers error array second parameter.
describe('verifyHeaders() wrong second parameter type.', async assert => {

    // Create an assertion.
    assert({
        given: 3,
        should: 'throw correct error message.',
        actual: Try(verifyHeaders, 'test', 3).toString(),
        expected: 'Error: Headers must be passed as an array to the verify headers function.'
    });
});

// Verify headers non string header error.
describe('verifyHeaders() non string header.', async assert => {

    // Create an assertion.
    assert({
        given: 'discover and array of with non strings',
        should: 'throw correct error message.',
        actual: Try(verifyHeaders, 'discover', [1, 2, 3, 4, 5]).toString(),
        expected: 'Error: Only strings can be passed in the header array to the verify headers function.'
    });
});

// Verify headers non existent provider.
describe('verifyHeaders() non existent provider.', async assert => {

    // Create an assertion.
    assert({
        given: 'test and empty array',
        should: 'return false.',
        actual: verifyHeaders('test', []),
        expected: false
    });
});

// Verify headers wrong number of headers.
describe('verifyHeaders() wrong number of headers.', async assert => {

    // Create an assertion.
    assert({
        given: 'discover and a headers array of incorrect length',
        should: 'return false.',
        actual: verifyHeaders('discover', ['header1']),
        expected: false
    });
});

// Verify headers wrong header.
describe('verifyHeaders() wrong headers.', async assert => {

    // Create an assertion.
    assert({
        given: 'discover and a headers array of with a wrong header',
        should: 'return false.',
        actual: verifyHeaders('discover', ['Trans. Date', 'Post Date', 'Wrong Header', 'Amount', 'Category']),
        expected: false
    });
});

// Verify headers works properly.
describe('verifyHeaders() works properly.', async assert => {

    // Create an assertion.
    assert({
        given: 'discover and array of correct headers',
        should: 'return false.',
        actual: verifyHeaders('discover', ['Trans. Date', 'Post Date', 'Description', 'Amount', 'Category']),
        expected: true
    });
});