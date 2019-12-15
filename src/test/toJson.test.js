/** 
 * This module tests the to json module.
 */

// Imports.
const test = require('tape');
const describe = require('riteway').describe;
const Try = require('riteway').Try;

// Compile test.
test('to json complies', t => {

    try {

        // Require in the module.
        require('../lib/toJson');

        // Pass the test because there is no error requiring in the project.
        t.pass('No error requiring in to json.');

    } catch (e) {

        // Fail the test with the error.
        t.fail(e);
    }

    // End the test.
    t.end();
});

// Require in the module not that it complies.
const toJson = require('../lib/toJson');

// Test the process csv function.
describe('toJson() non-array parameter', async assert => {

    // Variable for the test data.
    const testData = {};

    // Create an assertion.
    assert({
        given: testData,
        should: 'Throw correct error message.',
        actual: Try(toJson, testData).toString(),
        expected: 'Error: An array must be passed to the to json function.'
    });
});

// Test the process csv function.
describe('toJson() 1d array parameter', async assert => {

    // Variable for the test data.
    const testData = [];

    // Create an assertion.
    assert({
        given: testData,
        should: 'Throw correct error message.',
        actual: Try(toJson, testData).toString(),
        expected: 'Error: A 2D array must be provided to the to json function.'
    });
});

// Test the process csv function.
describe('toJson() 1d array of objects parameter', async assert => {

    // Variable for the test data.
    const testData = [{}];

    // Create an assertion.
    assert({
        given: testData,
        should: 'Throw correct error message.',
        actual: Try(toJson, testData).toString(),
        expected: 'Error: A 2D array must be provided to the to json function.'
    });
});

// Test the process csv function.
describe('toJson() 2d array parameter', async assert => {

    // Variable for the test data.
    const testData = [
        []
    ];

    // Create an assertion.
    assert({
        given: testData,
        should: 'Return an empty array.',
        actual: toJson(testData),
        expected: []
    });
});


// Test the process csv function.
describe('toJson()', async assert => {

    // Variable for the test data.
    const testData = [
        ['header1', 'header2', 'header3'],
        ['data1', 'data2', 'data3'],
        ['data4', 'data5', 'data6']
    ];

    // Retrieve the result from to json with the test data.
    const result = toJson(testData);

    // Create an assertion.
    assert({
        given: testData,
        should: 'Create a 2D array of the csv.',
        actual: result,
        expected: [

            {
                'header1': 'data1',
                'header2': 'data2',
                'header3': 'data3'
            }, {
                'header1': 'data4',
                'header2': 'data5',
                'header3': 'data6'
            }
        ]
    });
});