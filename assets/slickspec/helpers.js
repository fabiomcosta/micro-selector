var SlickSpec = {
	
	addEvent: function(obj, event, handler) {
		if (obj.addEventListener) {
			obj.addEventListener(event, handler, false);
		} else if (obj.attachEvent) {
			obj.attachEvent('on' + event, handler);
		} else {
			handler.call(obj, {type: event});
		}
	}
	
};


(function(){
	
	// moo browser object
	
	var ua = navigator.userAgent.toLowerCase(),
		platform = navigator.platform.toLowerCase(),
		UA = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, 'unknown', 0];

	var browser = SlickSpec.Browser = {
		name: (UA[1] == 'version') ? UA[3] : UA[1],
		version: parseFloat((UA[1] == 'opera' && UA[4]) ? UA[4] : UA[2]),
		platform: {
			name: ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0]
		}
	};
	
	SlickSpec.Browser[browser.name] = true;
	SlickSpec.Browser[browser.name + parseInt(browser.version, 10)] = true;
	SlickSpec.Browser.platform[browser.platform.name] = true;
	
})();


(function(){

	// fix for jasmine, transforms an arraylike object into a real array before testing the toContain

	var toString = Object.prototype.toString;
	var isEnumerable = function(item){
		return (item != null && typeof item.length == 'number' && toString.call(item) != '[object Function]' );
	};
	var arrayFrom = function(arr){
		return Array.prototype.slice.call(arr);
	};
	try {
		arrayFrom(document.documentElement.childNodes);
	} catch(e){
		var oldArrayFrom = arrayFrom;
		arrayFrom = function(item){
			if (typeof item != 'string' && isEnumerable(item) && !(item instanceof Array)){
				var i = item.length, array = new Array(i);
				while (i--) array[i] = item[i];
				return array;
			}
			return oldArrayFrom(item);
		};
	}

	// turns an arraylike object into a real array
	var oldJasmineContains = jasmine.Env.prototype.contains_;
	jasmine.Env.prototype.contains_ = function(haystack, needle) {
		haystack = arrayFrom(haystack);
		return oldJasmineContains.call(this, haystack, needle);
	};
	
})();


(function(global){

	global.context = this;
	global.mocks = {};

	global.runSpecs = function(){
		if (global.runnerOnLoad) global.runnerOnLoad();
		else throw new Error('The scripts were loaded on an incorrect order.');
	};

	var Mock = function(mockName, testBuilder){
		if (mockName && !testBuilder){
			throw new Error("Invalid mockName, Mock syntax: `new Mock(/mockName/, function(specs, window){})`");
		}
	
		if (Object.prototype.toString.call(mockName) != '[object RegExp]'){
			mockName = new RegExp(mockName, 'i');
		}
	
		this.mockName = mockName;
		this.testBuilder = testBuilder;
		Mock.mocks.push(this);
	};

	Mock.mocks = [];
	
	Mock.templateCounter = 0;
	
	Mock.prototype.run = function(){
		var globalContextOld = global.context, self = this;
		for (var mockName in global.mocks) {
			if (this.mockName.test(mockName)) {
				global.context = global.mocks[mockName];
				describe(mockName, function(){
					self.testBuilder(global.context);
				});
			}
		}
		global.context = globalContextOld;
	};

	Mock.register = function(name, window){
		global.mocks[name] = window;
		if (!--Mock.templateCounter) Mock.register.done();
	};

	Mock.register.done = function(){
		for (var i=0; i < Mock.mocks.length; i++){
			try {
				Mock.mocks[i].run();
			} catch(e) {
				console && console.log(e);
			}
		}
		global.runSpecs();
	};

	Mock.Request = function(mockName, url){
		if (!this instanceof Mock.Request) throw new Error('Mock.Request is not callable directly. Must use `new Mock.Request`');
	
		this.mockName = mockName;
		this.url = url + '?nocache=' + (+new Date);
		var self = this;
		this.rq = new SimpleRequest();
		Mock.templateCounter++;
		this.rq.send(this.url, function(html, xml){
			Mock.register(self.mockName, Mock.newFakeWinFromDoc(xml));
		});
	};

	Mock.CreateTemplate = function(name, url){
		var template = document.createElement('iframe');
		SlickSpec.addEvent(template, 'load', function(){
			Mock.register(name, template.contentWindow);
		});
		Mock.templateCounter++;
		template.style.display = 'none';
		template.setAttribute('iframeboder', 0);
		template.src = url + '?nocache=' + (+new Date);
		document.getElementsByTagName('body')[0].appendChild(template);
	};

	Mock.newFakeWinFromDoc = function(document){
		var fakeWin = {fake: true};
		fakeWin.document = document;
		fakeWin.SELECT = function(context, expression){
			return global.SELECT.call(fakeWin, context, expression);
		};
		return fakeWin;
	};

	SlickSpec.Mock = Mock;
	this.global = global;

})(this);
