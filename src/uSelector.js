/**
 * author:  Fabio Miranda Costa
 * github:  fabiomcosta
 * twitter: @fabiomiranda
 * website: http://meiocodigo.com
 * license: MIT-style license
 */

(function(global, document){
	
	var elements, doc, parsed, classes;
	
	var supports_getElementsByClassName = !!document.getElementsByClassName;
	var supports_querySelectorAll = !!document.querySelectorAll;
	
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
	
	var matchSelector = function(node){
		if (parsed.tag){
			var nodeName = node.nodeName.toUpperCase();
			if (parsed.tag == '*'){
				if (nodeName < '@') return false; // Fix for comment nodes and closed nodes
			} else {
				if (nodeName != parsed.tag) return false;
			}
		}
		if (parsed.id && node.getAttribute('id') != parsed.id) return false;
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
			
			var el = doc.getElementById(parsed.id);
			if (el) merge([el]);
			
		} else if (parsed.classList){
			
			if (supports_getElementsByClassName){
				merge(doc.getElementsByClassName(parsed.classList.join(' ')));
			} else {
				arrayFilterAndMerge(doc.getElementsByTagName('*'));
			}
			
		} else if (parsed.tag){
			
			merge(doc.getElementsByTagName(parsed.tag || '*'));
			
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
	
	var $u = function(selector, context, append){
		elements = append || [];
		doc = context || $u.context;
		if (supports_querySelectorAll){
			try{
				arrayFrom(doc.querySelectorAll(selector));
			} catch (e){}
		} else {
			selector = selector.replace(/^\s+|\s+$/g, '');
			parse(selector);
			find();
		}
		return elements;
	};
	
	$u.context = document;
	
	global['uSelector'] = $u;
	if (!global['$u']) global['$u'] = $u;

})(this, document);
