'use strict';

var tape = require('tape');
var fs = require('fs');
var geojsonAssert = require('geojson-assert');
var geojsonStreamMerge = require('../index.js');
var path = require('path');
var join = path.join;

tape('error when --input argument is not present', (assert) => {
    geojsonStreamMerge(null, null)
    .catch((err) => {
        assert.ifError(!err);
        assert.end();
    });
});

tape('Check output file name when output file name argument is empty', (assert) => {
    geojsonStreamMerge(join(__dirname, '/testInput'), null)
    .then((data) => {
        assert.equals(data, join(__dirname, '/testInput-merged.geojson'), 'ok, valid file name');
        assert.end();
    })
    .catch((err) => {
        assert.ifError(err);
        assert.end();
    });

});

tape('check if the output is as per expected', (assert) => {
    geojsonStreamMerge(join(__dirname, '/testInput'), join(__dirname, '/output.geojson'))
    .then(() => {
        var output = fs.readFileSync(join(__dirname, '/output.geojson'), 'utf8');
        var testOutput = fs.readFileSync(join(__dirname, '/testOutput.geojson'), 'utf8');
        assert.equals(output, testOutput, 'ok, valid output');
        assert.end();

    })
    .catch((err) => {
        assert.ifError(err);
        assert.end();
    });
});

tape('check output when the input file contains line-delimited features instead of line-delimited feature collections', (assert) => {
    geojsonStreamMerge(join(__dirname, '/testInputFeatures.json'), join(__dirname, '/output.geojson'))
    .then(() => {
        var output = fs.readFileSync(join(__dirname, '/output.geojson'), 'utf8');
        var testOutput = fs.readFileSync(join(__dirname, '/testOutput.geojson'), 'utf8');
        assert.equals(output, testOutput, 'ok, valid output');
        assert.end();
    })
    .catch((err) => {
        assert.ifError(err);
        assert.end();
    });
});

tape('is geojson valid', (assert) => {
    var output = fs.readFileSync(join(__dirname, '/output.geojson'), 'utf8');
    assert.equals(geojsonAssert(output), undefined, 'ok, valid geojson');
    assert.end();
});

tape('teardown', (assert) => {
    fs.unlinkSync(join(__dirname, '/output.geojson'));
    fs.unlinkSync(join(__dirname, '/testInput-merged.geojson'));
    assert.end();
});
