#!/usr/bin/env node

'use strict';

var geojsonStreamMerge = require('./');
var argv = require('minimist')(process.argv.slice(2));

geojsonStreamMerge(argv.input, argv.output, null);

