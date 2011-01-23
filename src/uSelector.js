/**
 * @author Fabio Miranda Costa <fabio [at] solucione [dot] info>
 * http://meiocodigo.com
 */

(function(global){
	
	var $u = function(id, tagNames, className, root){
		root = root || document;
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
		return elsArray;
	};
	
	global['uSelector'] = $u;

})(this);
