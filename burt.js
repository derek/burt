#!/usr/bin/env node
/*jslint sloppy:true*/

var fs = require('fs'),
    handlebars = require('handlebars'),
    file = process.argv[2];

fs.readFile(file, 'utf8', function (err, text) {
    if (err) {
        console.log(err);
    } else {
        var templateData = {},
            name,
            value,
            template,
            output,
            css,
            matches;

        text.match(/@([a-zA-Z0-9{\-:;,'#\s]+\})/g).forEach(function (match) {
            matches = match.match(/@vars \{([\s\S,a-z:;]+)\}/);
            if (matches) {
                matches[1].split('\n').forEach(function (line) {
                    name = line.match(/([a-z]+)/g);
                    value = line.match(/'([a-zA-Z0-9#]+)'/);
                    if (name && value) {
                        templateData[name[0]] = value[1];
                    }
                });
            }

            matches = match.match(/@mixin ([a-zA-Z]+) \{([\s\Sa-z:;]+)\}/);
            if (matches) {
                templateData[matches[1]] = matches[2].trim();
            }
        });

        template = handlebars.compile(text);
        output = template(templateData);

        css = output.replace(/@([a-zA-Z0-9{\-:;,'#\s]+\})/g, '').replace(/[\s\r\n]+/, '');

        console.log(css);
    }
});