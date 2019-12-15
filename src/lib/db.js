/** 
 * This module is responsible for connecting
 * to the database.
 */

// Imports.
const config = require('../../config')
const mongoose = require('mongoose');

// Make mongo use promises.
mongoose.Promise = Promise;

// Set connection string equal to the connection string in env or the config connection string the .
const connectString = process.env.DATABASE_CONNECTION || config.database.connectionString;

// Connect to the database with the connection string.
mongoose.connect(connectString);

// Export the the transaction model.
module.exports.transaction = require('../models/transaction');

// Export a close function.
module.exports.close = () => mongoose.connection.close();