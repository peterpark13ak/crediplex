'use strict';
const serverless = require('serverless-http');
const app = require('./src/api/api');

module.exports.handler = serverless(app);