var tape = require('tape');
var fs = require('fs');
var geojsonAssert = require('geojson-assert');
var geojsonStreamMerge = require('../index.js');

tape('error when --input argument is not present', function(assert) {
  geojsonStreamMerge(null, null,function(err,data) {
    assert.ifError(!err);
    assert.end();
  })

});

tape('Check output file name when output file name argument is empty', function(assert) {
  geojsonStreamMerge("test.geojson", null,function(err,data) {
    assert.equals(data, "test-merged.geojson", "ok, valid file name");
    assert.end();
  })

});

tape('check if the output is as per expected', function(assert) {
  geojsonStreamMerge("test.geojson", "output.geojson",function(err,data) {
    var output = fs.readFileSync('output.geojson', 'utf8');
    var testOutput = fs.readFileSync('testOutput.geojson', 'utf8');
    assert.equals(output, testOutput, "ok, valid output");
    assert.end();
  })

});

tape('check if the output is vaildated', function(assert) {
    var output = fs.readFileSync('output.geojson', 'utf8');
    geojsonAssert(output);
    assert.end();
});