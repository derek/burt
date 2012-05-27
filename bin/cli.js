#!/usr/bin/env node
/*jslint sloppy:true*/

var cli = require('cli'),
    path = require('path'),
    Burt = require('../lib/burt'),
    meta = require(path.join('../package.json'));

cli.parse({
    file: ['f', 'A source .burt file', 'string'],
    debug: [null, 'Debugging info', 'boolean', false],
    version: ['v', 'Print the version']
});

cli.main(function () {
    var opts = this.options,
        css;

    if (opts.version) {
        console.log('v' + meta.version);
        return;
    }

    if (0) {
        css = Burt.getCSS(opts.file);
    }
    else {

        var reynolds = new Burt.Reynolds(opts.file);
        css = reynolds.getCSS();

        // console.log(reynolds.data);
        // console.log(reynolds.template);
    }
    console.log(css);
});