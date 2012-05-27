/*jslint sloppy:true*/

var fs = require('fs'),
    handlebars = require('handlebars');

var getCSS = function (file) {
    var burt = new Reynolds();
    burt.addSource(file);
    return burt.getCSS();
};

var Reynolds = function (file) {
    this.source = '';
    this.data = {};
    this.template = '';

    if (file) {
        this.addSource(file);
    }
};

Reynolds.prototype.addSource = function (file) {
    this.source += fs.readFileSync(file, 'utf8');
};

Reynolds.prototype.parse = function () {
    var burt = this,
        source = burt.source,
        re = /@([a-zA-Z0-9{\-:;,'#\s]+\})/g,
        matches;

    source.match(re).forEach(function (match) {
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

        matches = match.match(/@mixin ([a-zA-Z0-9]+) \{([\s\Sa-z:;]+)\}/);
        if (matches) {
            burt.data[matches[1]] = matches[2].trim();
        }
    });

    burt.template = source.replace(re, '').replace(/[\s\r\n]+/, '');
};

Reynolds.prototype.getCSS = function () {
    this.parse();

    var template = this.template,
        data = this.data;

    return handlebars.compile(template)(data);
};

exports.Reynolds = Reynolds;
exports.getCSS = getCSS;