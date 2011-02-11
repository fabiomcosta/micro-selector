/**
 * author:  Fabio Miranda Costa
 * github:  fabiomcosta
 * twitter: @fabiomiranda
 * website: http://meiocodigo.com
 * license: MIT-style license
 */

(function(global, document){
	
	var _elements, _parsed, _parsedClasses, _parsedPseudos, _pseudos = {}, _context, _currentDocument;
	
	var supports_querySelectorAll = !!document.querySelectorAll;
	
	var $u = function(selector, context, append){
		_elements = append || [];
		_context = context || $u.context;
		if (supports_querySelectorAll){
			try{
				arrayFrom(_context.querySelectorAll(selector));
				return _elements;
			} catch (e){}
		}

		_currentDocument = _context.ownerDocument || _context;
		parse(selector.replace(/^\s+|\s+$/g, ''));
		find();
		
		return _elements;
	};
	
	var matchSelector = function(node){
		if (_parsed.tag){
			var nodeName = node.nodeName.toUpperCase();
			if (_parsed.tag == '*'){
				if (nodeName < '@') return false; // Fix for comment nodes and closed nodes
			} else {
				if (nodeName != _parsed.tag) return false;
			}
		}
		
		if (_parsed.id && node.getAttribute('id') != _parsed.id){
			return false;
		}
		
		if ((_parsedClasses = _parsed.classes)){
			var className = (' ' + node.className + ' ');
			for (var i = _parsedClasses.length; i--;){
				if (className.indexOf(' ' + _parsedClasses[i] + ' ') < 0) return false;
			}
		}
		
		if ((_parsedPseudos = _parsed.pseudos)){
			for (var i = _parsedPseudos.length; i--;){
				var pseudoClass = _pseudos[_parsedPseudos[i]];
				if (!pseudoClass || !pseudoClass(node)) return false;
			}
		}
		
		return true;
	};
	
	var find = function(){
		
		var parsedId = _parsed.id,
			merge = ((parsedId && _parsed.tag || _parsed.classes || _parsed.pseudos)
				|| (!parsedId && (_parsed.classes || _parsed.pseudos))) ?
				arrayFilterAndMerge : arrayMerge;
		
		if (parsedId){
			
			var el = _currentDocument.getElementById(parsedId);
			if (el && (_currentDocument === _context || contains(el))){
				merge([el]);
			}
			
		} else {
			
			merge(_context.getElementsByTagName(_parsed.tag || '*'));
			
		}
	
	};
	
	var parse = function(selector){
		_parsed = {};
		while ((selector = selector.replace(/([#.:])?([^#.:]*)/, parser))){};
	};
	
	var parser = function(all, simbol, name){
		if (!simbol){
			_parsed.tag = name.toUpperCase();
		} else if (simbol == '#'){
			_parsed.id = name;
		} else if (simbol == '.'){
			if (_parsed.classes){
				_parsed.classes.push(name);
			} else {
				_parsed.classes = [name];
			}
		} else if (simbol == ':'){
			if (_parsed.pseudos){
				_parsed.pseudos.push(name);
			} else {
				_parsed.pseudos = [name];
			}
		}
		return '';
	};
	
	var slice = Array.prototype.slice;
	var arrayFrom = function(collection){
		_elements = slice.call(collection, 0);
	};
	var arrayMerge = function(collection){
		for (var i = 0, node; node = collection[i++];){
			_elements.push(node);
		}
	};
	try {
		slice.call(document.documentElement.childNodes, 0);
	} catch(e) {
		arrayFrom = arrayMerge;
	}
	
	var arrayFilterAndMerge = function(found){
		for (var i = 0, node; node = found[i++];){
			if (matchSelector(node)) _elements.push(node);
		}
	};
	
	var contains = function(node){
		do {
			if (node === _context) return true;
		} while ((node = node.parentNode));
		return false;
	};
	
	$u['pseudos'] = _pseudos;
	$u['context'] = document;
	global['uSelector'] = $u;
	if (!global['$u']) global['$u'] = $u;

})(this, document);
