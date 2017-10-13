'use strict';

var fs = require('fs');
var split = require('split');
const readline = require('readline');

function geojsonStreamMerge(inputFile, outputFile) {
    const promise = new Promise((resolve, reject) => {
        if (!inputFile) {
            console.log('\nUsage: node index.js --input <path to line delimited GeoJSON FeatureCollections>\n');

            return reject(new Error('--input argument needed'));
        }
        if (!outputFile) {
            outputFile = inputFile.split('.')[0] + '-merged.geojson';
        }
        //if output file exists, overwrite file instead of appending to it.
        if (fs.existsSync(outputFile)) {
            fs.unlinkSync(outputFile);
        }
        var inputStream = fs.createReadStream(inputFile, {encoding: 'utf8'}).pipe(split());

        var start = '{ "type": "FeatureCollection", "features": [';

        fs.appendFileSync(outputFile, start, {encoding: 'utf8'});
        var comma = '';
        var line = 0;
        inputStream.on('data', (chunk) => {
            line = line + 1;
            readline.cursorTo(process.stderr, 0);
            process.stderr.write('Processing line: ' + String(line));
            if (chunk) {
                var json = JSON.parse(chunk);
                if (json.features) {
                    json.features.forEach((feature) => {
                        fs.appendFileSync(outputFile, comma + JSON.stringify(feature), {encoding: 'utf8'});
                        if (!comma) {
                            comma = ',';
                        }
                    });
                } else {
                    fs.appendFileSync(outputFile, comma + JSON.stringify(json), {encoding: 'utf8'});
                    if (!comma) {
                        comma = ',';
                    }
                }
            }
        });

        inputStream.on('end', () => {
            var end = ']}';
            fs.appendFileSync(outputFile, end, {encoding: 'utf8'});
            console.log('\nMerged features in %s', outputFile);
            resolve(outputFile);
        });
    });
    return promise;
}

module.exports = geojsonStreamMerge;
