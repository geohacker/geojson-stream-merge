'use strict';

var fs = require('fs');
var split = require('split');
var argv = require('minimist')(process.argv.slice(2));

if (!argv.hasOwnProperty('file')) {
    console.log('Usage: node index.js --file <path to line delimeted GeoJSON FeatureCollections>');
} else {
    var inputFile = argv.file;
    var inputStream = fs.createReadStream(inputFile, {encoding: 'utf8'}).pipe(split());

    var featureCollection = {
        "type": "FeatureCollection",
        "features": []
    };

    inputStream.on('data', function (chunk) {
        Array.prototype.push.apply(featureCollection.features, JSON.parse(chunk).features);
    });

    inputStream.on('end', function() {
        console.log(JSON.stringify(featureCollection));
    });
}