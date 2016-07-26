var tape = require('tape');
var fs = require('fs');
//This statement refers to the function on https://github.com/geohacker/geojson-stream-merge/blob/master/index.js#L6 because it has been exported on https://github.com/geohacker/geojson-stream-merge/blob/master/index.js#L45
//__dirname is useful to get the path of the current file no matter where you run your test script from.
var geojsonstreammerge = require('../index.js');

//Each call to tape is a test. You can create fake tests to initialise our test.

//Here is an example test to check if the script errors on not receiving an input argument.
//https://github.com/geohacker/geojson-stream-merge/blob/master/index.js#L7-L9

tape('error when --input argument is not present', function(assert) {
  //check if a call to geojson-stream-merge() errors out with https://github.com/geohacker/geojson-stream-merge/blob/tests/index.js#L10 when the inputFile argument is not given.
  geojsonstreammerge(null, null,function(err,data) {
  	assert.ifError(!err);
  	assert.end();
  })
  
});

tape('Check output file name when output file name argument is empty', function(assert) {
  geojsonstreammerge("test.geojson", null,function(err,data) {
  	assert.equals(data, "test-merged.geojson", "Awesome! Test Case passes");
  	assert.end();
  })
  
});

tape('check if the output is as per expected', function(assert) {
  geojsonstreammerge("test.geojson", "output.geojson",function(err,data) {
  	var output = fs. readFileSync('output.geojson', 'utf8');
    var testOutput = fs. readFileSync('testOutput.geojson', 'utf8');
  	assert.equals(output, testOutput, "Awesome! Test Case passes");
  	assert.end();
  })
  
});