/**
 * author:  Fabio Miranda Costa
 * github:  fabiomcosta
 * twitter: @fabiomiranda
 * website: http://meiocodigo.com
 * license: MIT-style license
 */

(function(global, document){
	
	var slice = Array.prototype.slice;
	var arrayFrom = function(collection){
		return slice.call(collection, 0);
	};
	try {
		slice.call(document.documentElement.childNodes, 0);
	} catch(e) {
		arrayFrom = function(collection){
			var array = [];
			for (var i = 0, l = collection.length; i < l; i++){
				array.push(collection[i]);
			}
			return array;
		};
	}
	
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
		if (parsed.className){
			for (var i = classes.length; i--;){
				if ((' ' + node.className + ' ').indexOf(' ' + parsed.classList[i] + ' ') > -1) return false;
			}
		}
		return true;
	};
	
	var elements, doc, parsed;
	
	var parse = function(selector){
		parsed = {classList: []};
		while ((selector = selector.replace(/([#.])?([^#.]*)/, parser)));
	};
	
	var parser = function(all, simbol, name){
		if (!simbol){
			parsed.tag = name.toUpperCase();
		} else if (simbol == '#'){
			parsed.id = name;
		} else if (simbol == '.'){
			parsed.classList.push(name);
		}
		return '';
	};
	
	var filterAndMerge = function(elements, found){
		for (var i = 0, node; node = found[i++];){
			if (matchSelector(node)) elements.push(node);
		}
	};
	
	var find = function(){
		if (parsed.id){
			var el = doc.getElementById(parsed.id);
			if (el) filterAndMerge(elements, [el]);
		} else if (parsed.classList.length){
			filterAndMerge(elements, doc.getElementsByClassName(parsed.classList.join(' ')));
		} else if (parsed.tag){
			filterAndMerge(elements, doc.getElementsByTagName(parsed.tag || '*'));
		}
	};
	
	var $u = function(selector, context, append){
		elements = append || [];
		doc = context || $u.context;
		selector = selector.replace(/^\s+|\s+$/g, '');
		parse(selector);
		find();
		return elements;
	};
	
	$u.context = document;
	
	global['uSelector'] = $u;
	if (!global['$u']) global['$u'] = $u;

})(this, document);
