'use strict';

var fs = require('fs');
var split = require('split');
var argv = require('minimist')(process.argv.slice(2));

if (!argv.hasOwnProperty('file')) {
    console.log('Usage: node index.js --file <path to line delimited GeoJSON FeatureCollections>');
} else {
    mergeStream(argv.file, argv.output);
}

function mergeStream(inputFile, outputFile) {
    if (!outputFile) {
        outputFile = argv.file.split('.')[0] + '-merged.json';
    }
    var inputStream = fs.createReadStream(inputFile, {encoding: 'utf8'}).pipe(split());

    var start = '{\'type\': \'FeatureCollection\', \'features\': [';
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
        var end = ']}';
        fs.appendFileSync(outputFile, end, {encoding: 'utf8'});
        console.log('\ndone');
    });
}
