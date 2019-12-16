/** 
 * This module tests the verify headers module.
 */

// Imports.
const test = require('tape');
const describe = require('riteway').describe;
const Try = require('riteway').Try;
const requireDirectory = require('require-directory');
const providers = requireDirectory(module, '../schema');

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
        given: 'provider of 1',
        should: 'throw correct error message.',
        actual: Try(verifyHeaders, {provider: 1}).toString(),
        expected: 'Error: Provider must be passed as a string to the verify headers function.'
    });
});

// Verify headers error array second parameter.
describe('verifyHeaders() wrong second parameter type.', async assert => {

    // Create an assertion.
    assert({
        given: 'given a string provider and a numeric headers.',
        should: 'throw correct error message.',
        actual: Try(verifyHeaders, {provider: 'test', headers: 3}).toString(),
        expected: 'Error: Headers must be passed as an array to the verify headers function.'
    });
});

// Verify headers non string header error.
describe('verifyHeaders() non string header.', async assert => {

    // Create an assertion.
    assert({
        given: 'provider of discover, numeric headers array, and proper providers.',
        should: 'throw correct error message.',
        actual: Try(verifyHeaders, {provider: 'discover', headers:[1, 2, 3, 4, 5], providers}).toString(),
        expected: 'Error: Only strings can be passed in the header array to the verify headers function.'
    });
});

// Verify headers non existent provider.
describe('verifyHeaders() non existent provider.', async assert => {

    // Create an assertion.
    assert({
        given: 'nonexistent provider, empty headers array, and proper providers.',
        should: 'return false.',
        actual: verifyHeaders({provider:'test', headers:[], providers}),
        expected: false
    });
});

// Verify headers wrong number of headers.
describe('verifyHeaders() wrong number of headers.', async assert => {

    // Create an assertion.
    assert({
        given: 'discover provider, wrong length headers, and proper providers.',
        should: 'return false.',
        actual: verifyHeaders({provider:'discover', headers:['test'], providers}),
        expected: false
    });
});

// Verify headers wrong header.
describe('verifyHeaders() wrong headers.', async assert => {

    // Create an assertion.
    assert({
        given: 'discover provider, wrong headers, and proper providers.',
        should: 'return false.',
        actual: verifyHeaders({provider:'discover', headers:['Trans. Date', 'Post Date', 'Wrong Header', 'Amount', 'Category'], providers}),
        expected: false
    });
});

// Verify headers works properly.
describe('verifyHeaders() works properly.', async assert => {

    // Create an assertion.
    assert({
        given: 'discover and array of correct headers',
        should: 'return false.',
        actual: verifyHeaders({provider: 'discover', headers:['Trans. Date', 'Post Date', 'Description', 'Amount', 'Category'], providers}),
        expected: true
    });
});