(function(global){

var Mock = SlickSpec.Mock;
var Browser = SlickSpec.Browser;

var registerSpecs = function(){
	new Mock(/html/i, microSpecs);
};

var createMocks = function(){
	Mock.CreateTemplate('Generic HTML4 (transitional)',			'mocks/template-transitional.html');
	Mock.CreateTemplate('Generic HTML4 (quirks)',				'mocks/template-quirks.html');
	Mock.CreateTemplate('Generic HTML4 (chromeframe)',			'mocks/template-chromeframe.html');
	Mock.CreateTemplate('Generic HTML5',						'mocks/template-html5.html');

	Mock.CreateTemplate('Generic XHTML (strict)',				'mocks/template-strict.xhtml');
	Mock.CreateTemplate('Generic XHTML (transitional)',			'mocks/template-transitional.xhtml');

	if (Browser.ie && Browser.version >= 8){
		Mock.CreateTemplate('Generic XHTML (IE8 as IE7)',		'mocks/template-transitional-ie7.xhtml');
	}
};

global.onload = function(){
	createMocks();
	registerSpecs();
};

global.runnerOnLoad = function(){
	jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
	jasmine.getEnv().execute();
};

})(this);
