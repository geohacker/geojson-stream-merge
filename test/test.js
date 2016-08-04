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
  geojsonStreamMerge(__dirname + "/testInput", null,function(err,data) {
    assert.equals(data, __dirname + "/testInput-merged.geojson", "ok, valid file name");
    assert.end();
  })

});

tape('check if the output is as per expected', function(assert) {
  geojsonStreamMerge(__dirname + "/testInput", __dirname + "/output.geojson",function(err,data) {
    var output = fs.readFileSync(__dirname + '/output.geojson', 'utf8');
    var testOutput = fs.readFileSync(__dirname + '/testOutput.geojson', 'utf8');
    assert.equals(output, testOutput, "ok, valid output");
    assert.end();
  })

});

tape('is geojson valid', function(assert) {
  var output = fs.readFileSync(__dirname + '/output.geojson', 'utf8');
  assert.equals(geojsonAssert(output), undefined, "ok, valid geojson");
  assert.end();
});

tape('teardown', function(assert) {
  fs.unlinkSync(__dirname + "/output.geojson");
  fs.unlinkSync(__dirname + "/testInput-merged.geojson");
  assert.end();
});
