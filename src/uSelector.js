/**
 * author:  Fabio Miranda Costa
 * github:  fabiomcosta
 * twitter: @fabiomiranda
 * website: http://meiocodigo.com
 * license: MIT-style license
 */

(function(global, document){
	
	var elements, parsed, classes, context, currentDocument;
	
	var supports_getElementsByClassName = !!document.getElementsByClassName;
	var supports_querySelectorAll = !!document.querySelectorAll;
	
	var $u = function(selector, _context, append){
		context = _context || $u.context;
		currentDocument = context.ownerDocument || context;
		arrayFrom(append);
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
		var merge = (!(parsed.id && parsed.tag && parsed.classList) &&
			(parsed.id ^ parsed.tag ^ !!parsed.classList)) ?
			((elements.length) ? arrayMerge : arrayFrom) : arrayFilterAndMerge;
			
		if (parsed.id){
			
			var el = currentDocument.getElementById(parsed.id);
			if (el && (currentDocument === context || contains(el))){
				merge([el]);
			}

		} else if (parsed.classList){
			
			if (supports_getElementsByClassName){
				merge(context.getElementsByClassName(parsed.classList.join(' ')));
			} else {
				arrayFilterAndMerge(context.getElementsByTagName('*'));
			}
			
		} else if (parsed.tag){
			
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
		elements = (!collection) ? [] : slice.call(collection, 0);
	};
	var arrayMerge = function(collection){
		if (!collection){
			elements = [];
			return;
		}
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
		if (node) do {
			if (node === context) return true;
		} while ((node = node.parentNode));
		return false;
	};

	global['uSelector'] = $u;
	if (!global['$u']) global['$u'] = $u;

})(this, document);
