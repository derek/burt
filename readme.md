Burt
========================

Burt is a simple CSS pre-processor that does a few nifty things.

**Another CSS pre-processor?**

CSS preprocessors are all the rage, but it seems to me like they are doing too much. I don't want a new scripting language that generates CSS, I want to code CSS.  CSS as a markup language is (mostly) fine as-is, but it's just missing a few features and Burt helps it get there without going overboard.

While other pre-processors pride themselves on adding dozens and dozens of new features, Burt prides itself on adding fewer features.  At the moment, the feature count is two.  Yes, that's it.  Variables & Mixins.  Maybe more in the future.

**How do I use it?**

Install this node.js-based CLI tool which will convert a `.burt` file(s) to CSS.

**What's a .burt file?**

It's a CSS file, but with a few additional sprinkles of happy in it.  Your file will be a mixture of CSS and some custom Burt syntax.  The Burt syntax will be parsed out to generate template data, and the leftover CSS portion will then become the Mustache template.  Feed the template into Handlebars, compile with the data, and viola! CSS

**Can I include a `.burt` directly in my HTML page?**

That's a bad idea.  Burt is intended to be part of a build process.

Install
-------

    npm -g i burt

Usage
-----

    burt -f source.burt > output.css

Variables
---------
**input: myFile.burt**

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

**input: myFile.burt**

	@mixin mixB {
		display: inline-block;
	}

	@mixin mixA {
		height: 400px;
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
	}

	#bar {
		height: 400px;
		display: inline-block;
	}

Why "Burt"
-----

We're combining mustache templates and stylesheets, and when it comes to styled mustaches, it doesn't get any better than...

![Burt Reynolds](http://www.nndb.com/people/888/000023819/burt-reynolds-sm.jpg)