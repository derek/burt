Burt
========================

Burt is a proof-of-concept for a "less is more" simple CSS pre-processor.  Unlike other pre-processors that pride themselves by reinventing CSS, Burt thinks CSS is mostly fine as-is and just needs a few additional features.

**How do I use it?**

Once installed, you can either use the CLI tool which will convert a `.burt` file to CSS, or a node.js API for programatic access.

**What's a .burt file?**

It's a CSS file, but with a few additional sprinkles of happy in it.  Your file will be a mixture of CSS and some custom Burt syntax.  The Burt syntax will be parsed out to generate template data, and the leftover CSS portion will then become the Mustache template.  Feed the template into Handlebars, compile with the data, and viola! CSS

**Can I include a `.burt` file directly in my HTML page?**

That seems like a bad idea.

Install
-------

    npm -g i burt

Usage
-----

Burt can be used two ways: CLI or API

**Command Line**

    burt -f source.burt > output.css

**API**
	
	// Import the module
	Burt = require('burt'),
    
	// The simple way
    css = Burt.getCSS('path/to/source.burt');

    // Or, use Reynolds for more features 
    reynolds = new Burt.Reynolds();
    reynolds.addSource('path/to/source.burt');
    css = reynolds.getCSS();

Features
========

Variables
---------
**myFile.burt**

    @vars {
        white: '#ffffff'
    }

    #container {
        width: 200px;
        color: {{white}};
    }

**output**

    #container {
        width: 200px;
        color: #ffffff;
    }

Mixins
------

**myFile.burt**

	@mixin mixA {
		height: 400px;
		border: solid 2px;
	}

	@mixin mixB {
		display: inline-block;
	}

	#foo {
		width: 200px;
		{{mixA}}
	}

	#bar {
		{{mixA}}
		{{mixB}}
	}

**output**

	#foo {
		width: 200px;
		height: 400px;
		border: solid 2px;
	}

	#bar {
		height: 400px;
		border: solid 2px;
		display: inline-block;
	}

Why "Burt"
-----

We're combining mustache templates and stylesheets, and when it comes to styled mustaches, it doesn't get any better than...

![Burt Reynolds](http://i.imgur.com/PevJB.jpg)