# geojson-stream-merge

Creates a single valid `FeatureCollection` from a file of line delimited feature collections.

## Usage


#### CLI

1. `git clone https://github.com/geohacker/geojson-stream-merge.git`
2. `cd geojson-stream-merge`
3. `npm install`
4. `node geojsonStreamMerge.js --input test/test.json --output test/output.json`


#### API

```
var gsm = require('geojson-stream-merge');

gsm(<path-to-input-file>, <path-to-output-file>);
```
