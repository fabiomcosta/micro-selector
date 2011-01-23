(function(){
	
	window.scripts_to_get = window.scripts_to_get || parent.scripts_to_get || window.location.search.match(/\bscript=(.*?\.js)/gi) || [];
	
	for (var i=0, scriptsrc; scriptsrc = scripts_to_get[i]; i++){

		scripts_to_get[i] = scriptsrc = decodeURIComponent(scriptsrc.replace(/^(&?script=)+/, ''));
		scriptsrc.replace(/^(?!=http|\/)/, '../');

		var written;
		
		if (document.write){
			try {
				document.write('<scr'+'ipt src="'+ scriptsrc +'" type="text/javascript"><\/script>');
				written = true;
			} catch(e){
				written = false;
			}
		}
		
		if (!written && document.documentElement.nodeName.toLowerCase() == 'html'){
			var script = document.createElement('script');
			script.setAttribute('src', scriptsrc);
			script.setAttribute('type', 'text/javascript');
			document.documentElement.appendChild(script);
		}

		if (/\bbootstrap\b/.test(scriptsrc)) scripts_to_get.splice(i, 1);

	}
	
	this.frameworkName = (scripts_to_get[0] || '').replace(/^.*\//, '');
	
})();
