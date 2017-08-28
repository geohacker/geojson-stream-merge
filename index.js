'use strict';

var argv = require('minimist')(process.argv.slice(2));
console.log(argv);
switch (argv._[0]) {
    case ('merge'):
        require('./geojsonStreamMerge')(argv.input, argv.output, (err) => {
            if (err) {
                console.error(err.toString());
                process.exit(1);
            }
        });
        break;
    case ('clip'):
        require('./ClipGeojson')(argv.bbox, argv.clip, argv.out, (err) => {
            if (err) {
                console.error(err.toString());
                process.exit(1);
            }
        });
        break;
}