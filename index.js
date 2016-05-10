'use strict';

var fs = require('fs');
var split = require('split');

function geojsonStreamMerge(inputFile, outputFile) {
    if (!inputFile) {
        console.log('Usage: node index.js --input <path to line delimited GeoJSON FeatureCollections>');
    }
    if (!outputFile) {
        outputFile = inputFile.split('.')[0] + '-merged.geojson';
    }
    var inputStream = fs.createReadStream(inputFile, {encoding: 'utf8'}).pipe(split());

    var start = '{ "type": "FeatureCollection", "features": [';

    fs.appendFileSync(outputFile, start, {encoding: 'utf8'});
    var comma = '';
    var line = 0;
    inputStream.on('data', function (chunk) {
        line = line + 1;
        process.stderr.cursorTo(0);
        process.stderr.write('Processing line: ' + String(line));
        if (chunk) {
            var features = JSON.parse(chunk).features;
            features.forEach(function (feature) {
                fs.appendFileSync(outputFile, comma + JSON.stringify(feature), {encoding: 'utf8'});
                if (!comma) {
                    comma = ',';
                }
            });
        }
    });

    inputStream.on('end', function () {
        var end = "]}";
        fs.appendFileSync(outputFile, end, {encoding: 'utf8'});
        console.log('\nMerged features in %s', outputFile);
    });
}

module.exports = geojsonStreamMerge;
