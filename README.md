# geojson-stream-merge

Creates a single valid `FeatureCollection` from a file of line delimited feature collections.

## Usage


#### CLI
1. `npm install geojson-stream-merge`
2. `geojson-stream-merge  --input test/test.json --output test/output.json`


#### API

```
var gsm = require('geojson-stream-merge');

gsm(<path-to-input-file>, <path-to-output-file>, function (error, data) {
    console.log('done');
});
```
