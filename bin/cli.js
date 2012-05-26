#!/usr/bin/env node
/*jslint sloppy:true*/

var cli = require('cli'),
    path = require('path'),
    burt = require('../lib/burt'),
    meta = require(path.join('../package.json'));

cli.parse({
    file: ['f', 'A source .burt file', 'string'],
    debug: [null, 'Debugging info', 'boolean', false],
    version: ['v', 'Print the version']
});

cli.main(function () {
    var opts = this.options;

    if (opts.version) {
        console.log('v' + meta.version);
        return;
    }

    burt.toCSS(opts);
});