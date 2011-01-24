uSelector
=========
A micro, super fast, scope limited, javascript selector engine to be used anywhere
----------------------------------------------------------------------------------

uSelector (micro selector), is a node selector for HTML documents that uses css expressions to select nodes.
It's based on Slick, the selector used on the Mootools javascript framework.

### Supported selectors
* tag
* id
* class

### Unsupported selectors
* combinators (ex: "div span", "div > span")
* multiple expressions (expressions with comma, ex: "div, span")
* attribute (ex: "a[title='title']")
* pseudo-classes (ex: "input:checked")

How to use
----------

$u(your-selector) -> returns an array of nodes that match the selector

Examples
--------
	<div>
		<span>text</span>
		<strong class="strong-class">strong-text</strong>
		<div id="id" class="div-class"></div>
	</div>

* $u('strong.strong-class') -> [<strong.strong-class>]
* $u('span') -> [\<span\>]
* $u('#id') -> [<div#id.div-class>]
* $u('div#id') -> [<div#id.div-class>]
* $u('div#id.div-class') -> [<div#id.div-class>]
* $u('em') -> []

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
