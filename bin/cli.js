#!/usr/bin/env node
/*jslint sloppy:true*/

var cli  = require('cli'),
    path = require('path'),
    Burt = require('../lib/burt'),
    meta = require('../package.json');

cli.parse({
    file: ['f', 'A source .burt file', 'string'],
    debug: [null, 'Debugging info', 'boolean', false],
    version: ['v', 'Print the version']
});

cli.main(function () {
    var opts = this.options,
        css,
        reynolds;

    if (opts.version) {
        console.log('v' + meta.version);
        return;
    }

    reynolds = new Burt.Reynolds();
    reynolds.addSource(opts.file);
    css = reynolds.getCSS();

    if (opts.debug) {
        console.log('\nversion: ' + meta.version);
        console.log('\n--- options ---');
        console.log(opts);

        console.log('\n--- data ---');
        console.log(reynolds.data);

        // console.log('\n--- source ---');
        // console.log(reynolds.source);

        console.log('\n--- output ---')
    }

    // or use the sugary method
    // css = Burt.getCSS(opts.file);

    console.log(css);
});