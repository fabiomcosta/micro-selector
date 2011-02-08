/**
 * author:  Fabio Miranda Costa
 * github:  fabiomcosta
 * twitter: @fabiomiranda
 * website: http://meiocodigo.com
 * license: MIT-style license
 */

(function(global, document){
	
	var elements, parsed, classes, context, currentDocument;
	
	var supports_querySelectorAll = !!document.querySelectorAll;
	
	var $u = function(selector, _context, append){
		elements = append || [];
		context = _context || $u.context;
		currentDocument = context.ownerDocument || context;
		if (supports_querySelectorAll){
			try{
				arrayFrom(context.querySelectorAll(selector));
			} catch (e){}
		} else {
			selector = selector.replace(/^\s+|\s+$/g, '');
			parse(selector);
			find();
		}
		return elements;
	};
	
	var matchSelector = function(node){
		if (parsed.tag){
			var nodeName = node.nodeName.toUpperCase();
			if (parsed.tag == '*'){
				if (nodeName < '@') return false; // Fix for comment nodes and closed nodes
			} else {
				if (nodeName != parsed.tag) return false;
			}
		}
		
		if (parsed.id && node.getAttribute('id') != parsed.id){
			return false;
		}
		
		if ((classes = parsed.classList)){
			var className = (' ' + node.className + ' ');
			for (var i = classes.length; i--;){
				if (className.indexOf(' ' + classes[i] + ' ') < 0) return false;
			}
		}
		return true;
	};
	
	var find = function(){
		
		var parsedId = parsed.id, merge = ((parsedId && parsed.tag || parsed.classList) || (!parsedId && parsed.classList)) ?
			arrayFilterAndMerge : arrayMerge;
		
		if (parsedId){
			
			var el = currentDocument.getElementById(parsedId);
			if (el && (currentDocument === context || contains(el))){
				merge([el]);
			}
			
		} else {
			
			merge(context.getElementsByTagName(parsed.tag || '*'));
			
		}
	
	};
	
	var parse = function(selector){
		parsed = {};
		while ((selector = selector.replace(/([#.])?([^#.]*)/, parser)));
	};
	
	var parser = function(all, simbol, name){
		if (!simbol){
			parsed.tag = name.toUpperCase();
		} else if (simbol == '#'){
			parsed.id = name;
		} else if (simbol == '.'){
			if (parsed.classList){
				parsed.classList.push(name);
			} else {
				parsed.classList = [name];
			}	
		}
		return '';
	};
	
	$u.context = document;
	
	var slice = Array.prototype.slice;
	var arrayFrom = function(collection){
		elements = slice.call(collection, 0);
	};
	var arrayMerge = function(collection){
		for (var i = 0, node; node = collection[i++];){
			elements.push(node);
		}
	};
	try {
		slice.call(document.documentElement.childNodes, 0);
	} catch(e) {
		arrayFrom = arrayMerge;
	}
	
	var arrayFilterAndMerge = function(found){
		for (var i = 0, node; node = found[i++];){
			if (matchSelector(node)) elements.push(node);
		}
	};
	
	var root = document.documentElement;
	var contains = function(node){
		if (node){
			do {
				if (node === context) return true;
			} while ((node = node.parentNode));
		}
		return false;
	};

	global['uSelector'] = $u;
	if (!global['$u']) global['$u'] = $u;

})(this, document);
