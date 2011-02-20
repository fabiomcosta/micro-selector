/**
 * author:  Fabio Miranda Costa
 * github:  fabiomcosta
 * twitter: @fabiomiranda
 * website: http://meiocodigo.com
 * license: MIT-style license
 */

(function(global, document){

	var elements,
		parsed,
		parsedClasses,
		parsedPseudos,
		pseudos = {},
		context,
		currentDocument,
		reTrim = /^\s+|\s+$/g;

	var supports_querySelectorAll = !!document.querySelectorAll;

	var $u = function(selector, _context, append){
		elements = append || [];
		context = _context || $u.context;
		if (supports_querySelectorAll){
			try{
				arrayFrom(context.querySelectorAll(selector));
				return elements;
			} catch (e){}
		}

		currentDocument = context.ownerDocument || context;
		parse(selector.replace(reTrim, ''));
		find();

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

		if ((parsedClasses = parsed.classes)){
			var className = (' ' + node.className + ' ');
			for (var i = parsedClasses.length; i--;){
				if (className.indexOf(' ' + parsedClasses[i] + ' ') < 0) return false;
			}
		}

		if ((parsedPseudos = parsed.pseudos)){
			for (var i = parsedPseudos.length; i--;){
				var pseudoClass = pseudos[parsedPseudos[i]];
				if (!(pseudoClass && pseudoClass.call($u, node))) return false;
			}
		}

		return true;
	};

	var find = function(){

		var parsedId = parsed.id,
			merge = ((parsedId && parsed.tag || parsed.classes || parsed.pseudos)
				|| (!parsedId && (parsed.classes || parsed.pseudos))) ?
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
		while ((selector = selector.replace(/([#.:])?([^#.:]*)/, parser))){};
	};

	var parser = function(all, simbol, name){
		if (!simbol){
			parsed.tag = name.toUpperCase();
		} else if (simbol == '#'){
			parsed.id = name;
		} else if (simbol == '.'){
			if (parsed.classes){
				parsed.classes.push(name);
			} else {
				parsed.classes = [name];
			}
		} else if (simbol == ':'){
			if (parsed.pseudos){
				parsed.pseudos.push(name);
			} else {
				parsed.pseudos = [name];
			}
		}
		return '';
	};

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

	var contains = function(node){
		do {
			if (node === context) return true;
		} while ((node = node.parentNode));
		return false;
	};

	$u['pseudos'] = pseudos;
	$u['context'] = document;
	global['uSelector'] = $u;
	if (!global['$u']) global['$u'] = $u;

})(this, document);
