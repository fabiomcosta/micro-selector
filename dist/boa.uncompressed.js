(function(global, boa){
	if (!boa || !boa.options){
		global._boa_ = {
			options: boa || {}
		};
	}
})(this, this._boa_);


(function(global, document){

global._boa_.onDOMReady = function(fn){
	if (ready){
		fn();
	} else {
		handlers.push(fn);
	}
};

var testElement = document.createElement('div'),
	shouldAddReadyStateChange = 'onreadystatechange' in document,
	ready = false,
	isFramed = true,
	checks = [],
	handlers = [],
	timer;

// Thanks to Rich Dougherty <http://www.richdougherty.com/>
try {
	isFramed = window.frameElement != null;
} catch(e){}

var doScrollCheck = !!(testElement.doScroll && !isFramed),
	shouldPoll = !!(doScrollCheck || !shouldAddReadyStateChange);

var addListener = function(el, type, fn){
	if (el.addEventListener){
		el.addEventListener(type, fn, false);
	} else {
		el.attachEvent('on' + type, fn);
	}
};

var removeListener = function(el, type, fn){
	if (el.removeEventListener){
		el.removeEventListener(type, fn, false);
	} else {
		el.detachEvent('on' + type, fn);
	}
};

var domready = function(){
	if (ready) return;
	ready = true;
	removeListener(document, 'DOMContentLoaded', domready);
	removeListener(document, 'readystatechange', check);
	for (var i = 0, l = handlers.length; i < l; i++) handlers[i]();
};

var check = function(){
	for (var i = checks.length; i--;) if (checks[i]()){
		domready();
		return true;
	}
	return false;
};

var poll = function(){
	clearTimeout(timer);
	if (!check()) timer = setTimeout(poll, 10);
};

// doScroll technique by Diego Perini http://javascript.nwbox.com/IEContentLoaded/
if (doScrollCheck){
	checks.push(function(){
		try {
			testElement.doScroll();
			return true;
		} catch (e){}
		return false;
	});
}

if (document.readyState){
	checks.push(function(){
		var state = document.readyState;
		return (state == 'loaded' || state == 'complete');
	});
}

addListener(document, 'DOMContentLoaded', domready);

if (shouldAddReadyStateChange){
	addListener(document, 'readystatechange', check);
}

if (shouldPoll){
	poll();
}

var onload = window.onload;
window.onload = function(e){
	domready();
	onload && onload(e);
};

})(this, document);(function(document, boa){
	
	boa.utils = {
		stripTags: function(tags, text, replacement){
			if (typeof tags != 'string'){
				tags = tags.join('|');
			}
			return text.replace(new RegExp('<('+ tags +')[^>]*>([\\s\\S]*?)<\\/\\1>', 'g'), replacement || '');
		},
		extend: function(obj1, obj2){
			for (key in obj2){
				obj1[key] = obj2[key];
			}
			return obj1;
		},
		findById: function(id){
			return (typeof id == 'string') ? document.getElementById(id) : id;
		}
	};
	
	boa.utils.extend(boa, {
		init: function(options){
			if (this.inited) return;
			this.inited = true;
			
			this.setOptions(options || {});
			this.insertLinks();
		},
		
		setOptions: function(options){
			this.utils.extend(this.options, options);
		},
		
		insertLinks: function(context){
			context = this.utils.findById(context || this.options.context);
			if (!context) return;
			
			if (this.options.words){
				context.innerHTML = context.innerHTML.replace(
					new RegExp('('+ this.options.words +')', 'g'),
					'<a href="#" title="$1">$1</a>'
				);
			}
		}
	});
	
	boa.onDOMReady(function(){
		var options = boa.options;
		boa.options = {
			context: document.getElementsByTagName('body')[0]
		};
		boa.init(options);
	});

})(document, this._boa_);