uSelector
=========
A micro, super fast, scope limited, javascript selector engine to be used anywhere
----------------------------------------------------------------------------------

uSelector (micro selector), is a node selector for HTML documents that uses css expressions to select nodes.
It's based on [Slick](https://github.com/mootools/slick), the selector used on the [Mootools](http://mootools.net) javascript framework.

### Supported selectors
* tag
* id
* class
* custom pseudo-classes

### Unsupported selectors
* combinators (ex: "div span", "div > span")
* multiple expressions (expressions with comma, ex: "div, span")
* attribute (ex: "a[title='title']")

### Suported with the uSelectorPseudoClasses module
* :empty
* :first-child
* :last-child
* :only-child
* :first-of-type
* :last-of-type
* :only-of-type
* :disabled
* :checked
* :selected

note: To build with these pseudo-selectors included do `make build all=true`

Browser Support
---------------

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png)
--- | --- | --- | --- | --- |
IE 6+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

How to use
----------

`$u('your-selector')` -> returns an array of nodes that match the selector

Create your own pseudo-class
--------------------------------

	$u.pseudo['your-custom-pseudo'] = function(node){
		return boolean;
	};

It should return true if the passed node fits the behavior of your pseudo. see the ["src/uSelectorPseudoClasses.js"](https://github.com/fabiomcosta/micro-selector/blob/master/src/uSelectorPseudoClasses.js)

Examples
--------

	<div>
		<span>text</span>
		<strong class="strong-class">strong-text</strong>
		<div id="id" class="div-class"></div>
	</div>

* `$u('strong.strong-class') -> [<strong.strong-class>]`
* `$u('span') -> [<span>]`
* `$u('#id') -> [<div#id.div-class>]`
* `$u('div#id') -> [<div#id.div-class>]`
* `$u('div#id.div-class') -> [<div#id.div-class>]`
* `$u('em') -> []`

Run Tests
---------

Enter the tests/ folder on your browser.
You'll need PHP on your server to run them.

License
-------

The MIT License (http://www.opensource.org/licenses/mit-license.php)

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
