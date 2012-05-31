/*jslint sloppy:true*/

var fs = require('fs'),
    handlebars = require('handlebars');

// The Reynolds object, which is what does the work for Burt.  
var Reynolds = function (file) {
    this.data     = {};
    this.source   = '';
    this.template = '';

    if (file) {
        this.addSource(file);
    }
};

// Add a file to be converted
Reynolds.prototype.addSource = function (file) {
    this.source += fs.readFileSync(file, 'utf8') + '\n';
};

// Parse the source files
Reynolds.prototype.parse = function () {
    var burt = this,
        source = burt.source,
        re = /@([a-zA-Z0-9{\-:;,'#\s]+\})/g, // Blocks of text we want to parse out. 
        matches;

    // Find each burt block
    source.match(re).forEach(function (match) {

        // Vars
        matches = match.match(/@vars \{([\s\S,a-zA-Z0-9:;]+)\}/);
        if (matches) {
            matches[1].split('\n').forEach(function (line) {
                if (line.match(':')) {
                    var matches = line.split(":"),
                        name = matches[0].trim(),
                        value = matches[1].trim().replace(/^'/, '').replace(/[',]+$/, '');

                    if (name && value) {
                        burt.data[name] = value;
                    }
                }
            });
        }

        // Mixins
        matches = match.match(/@mixin ([a-zA-Z0-9]+) \{([\s\Sa-z:;]+)\}/);
        if (matches) {
            burt.data[matches[1]] = matches[2].trim();
        }

    });

    // Prepare & assign the template
    burt.template = source.replace(re, '').replace(/[\s\r\n]+/, '');
};

// Mashes the mustache template & data object to generate the CSS
Reynolds.prototype.getCSS = function () {
    this.parse();
    return handlebars.compile(this.template)(this.data);
};

// Sugar that takes a file path and returns the generated CSS
var getCSS = function (file) {
    var burt = new Reynolds();
    burt.addSource(file);
    return burt.getCSS();
};

exports.Reynolds = Reynolds;
exports.getCSS = getCSS;