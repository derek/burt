/*jslint sloppy:true*/

var fs = require('fs'),
    handlebars = require('handlebars');

exports.toCSS = function (opts) {
    var file = opts.file,
        templateData = {},
        optDebug = opts.debug,
        burtSource,
        css,
        matches,
        name,
        output,
        template,
        value;

    burtSource = fs.readFileSync(file, 'utf8');

    burtSource.match(/@([a-zA-Z0-9{\-:;,'#\s]+\})/g).forEach(function (match) {
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

    template = handlebars.compile(burtSource);

    css = template(templateData).replace(/@([a-zA-Z0-9{\-:;,'#\s]+\})/g, '').replace(/[\s\r\n]+/, '');

    if (optDebug) {
        console.log('\n/* begin template data');
        console.log(templateData);
        console.log('end template data */\n');
    }

    if (optDebug) {
        console.log('\n/* begin CSS */');
    }

    console.log(css);
    
    if (optDebug) {
        console.log('/* end CSS */\n');
    }
};