(function(){
	
	var pseudos = {
		empty: function(node){
			var child = node.firstChild;
			return !(child && child.nodeType == 1) && !(node.innerText || node.textContent || '').length;
		},
		'first-child': function(node){
			while ((node = node.previousSibling)) if (node.nodeType == 1) return false;
			return true;
		},
		'last-child': function(node){
			while ((node = node.nextSibling)) if (node.nodeType == 1) return false;
			return true;
		},
		'only-child': function(node){
			return this.pseudos['first-child'](node) && this.pseudos['last-child'](node);
		},
		'first-of-type': function(node){
			var nodeName = node.nodeName;
			while ((node = node.previousSibling)) if (node.nodeName == nodeName) return false;
			return true;
		},
		'last-of-type': function(node){
			var nodeName = node.nodeName;
			while ((node = node.nextSibling)) if (node.nodeName == nodeName) return false;
			return true;
		},
		'only-of-type': function(node){
			return this.pseudos['first-of-type'](node) && this.pseudos['last-of-type'](node);
		},
		disabled: function(node){
			return node.disabled;
		},
		checked: function(node){
			return node.checked || node.selected;
		},
		selected: function(node){
			return node.selected;
		}
	};
	
	for (var pseudo in pseudos){
		$u.pseudos[pseudo] = pseudos[pseudo];
	}

})();


