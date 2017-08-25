var fs = require('fs');
var turf = require('turf');
var minimist = require('minimist');

function ClipGeojson(bbox, clip, outFile, callback) {
    if (!bbox) {
        console.log('\nUsage: node index.js --bbox <path to bounding box GeoJSON FeatureCollections> --clip <path to the line delimited GeoJson that needs to be clipped>\n');

        return callback(new Error('--bbox argument needed'));
    }
    if (!outFile) {
        outFile = String(clip.split('.')[0]) + 'merged.geojson';
    }
    //if output file exists, overwrite file instead of appending to it.
    if (fs.existsSync(outFile)) {
        fs.unlinkSync(outFile);
    }
    if (!clip) {
        console.log('\nUsage: node index.js --bbox <path to bounding box GeoJSON FeatureCollections> --clip <path to the line delimited GeoJson that needs to be clipped>\n');
        
        return callback(new Error('--clip argument needed'));
    }
    var start = '{ "type": "FeatureCollection", "features": [';    
    fs.appendFileSync(outFile, start, {encoding: 'utf8'});
    var comma = '';
    var line = 0;
    fs.createReadStream(clip, {encoding: 'utf8'})
        .on('data', function(point) {
            console.log(point);
            if (!point) return;
            
            line = line + 1;
            process.stderr.cursorTo(0);
            process.stderr.write('Processing line: ' + String(line));

            if (turf.inside(point, bbox)) {
                var json = JSON.parse(point);
                fs.appendFileSync(outFile, comma + JSON.stringify(json), {encoding: 'utf8'});
                    if (!comma) {
                        comma = ',';
                    }
            }
            })
        .on('end', function () {
                var end = "]}";
                fs.appendFileSync(outFile, end, {encoding: 'utf8'});
                console.log('\nMerged features in %s', outFile);
                if (callback) {
                    callback(null, outFile);
                }
        });
};

var argv = require('minimist')(process.argv.slice(2));

console.log(argv)

ClipGeojson(argv.bbox, argv.clip, argv.outFile, function(err, done) { console.log('callback called', err, done); })