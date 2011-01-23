/**
 * author:  Fabio Miranda Costa
 * github:  fabiomcosta
 * twitter: @fabiomiranda
 * website: http://meiocodigo.com
 * license: MIT-style license
 */

(function(global, document){
	var slice = Array.prototype.slice;
	var arrayFrom = function(collection, array){
		array.push.apply(array, slice.call(collection, 0));
		return array;
	};
	try {
		slice.call(document.documentElement.childNodes, 0);
	} catch(e) {
		arrayFrom = function(collection, array){
			for (var i = 0, l = collection.length; i < l; i++){
				array.push(collection[i]);
			}
			return array;
		};
	}
	
	var $u = function(selector, context, append){
		var elements = append || [];
		if (!context) context = $u.context;
		
		selector.replace(/([\w-]*)(?:([#.])?([^#.]*))*/, function(all, tag, simbol, name){
			if (!simbol){
				arrayFrom(context.getElementsByTagName(tag || '*'), elements);
			} else if (simbol == '#'){
				var el = context.getElementById(name);
				if (el) elements.push(el);
			} else if (simbol == '.'){
				//var el = context.getElementById(name);
				//if (el) elements.push(el);
			}
			return '';
		});
		
		/*
		if (className && root.getElementsByClassName){
			return root.getElementsByClassName(className);
		}
		tagNames = tagNames.split(',');
		var els, elsArray = [];
		for (var i=0, tagName; tagName = tagNames[i++];){
			els = root.getElementsByTagName(tagName || '*');
			for (var j = 0, el; el = els[j++];){
				if (!className || (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1) elsArray.push(el);
			}
		}
		*/	
		return elements;
	};
	
	$u.context = document;
	
	global['uSelector'] = $u;
	if (!global['$u']) global['$u'] = $u;

})(this, document);
