var microSpecs = function(context){

describe('Micro Selector', function() {
	
	var $u = uSelector;
	$u.context = context.document;
	
	it('should select elements by id', function(){
		expect($u('#title').length).toEqual(1);
		expect($u('#other').length).toEqual(0);
		expect($u('#divid').length).toEqual(1);
		expect($u('#divid2').length).toEqual(1);
		expect($u('#divid', $u('#divid2')[0]).length).toEqual(0);
	});

	it('should select elements by tagName', function(){
		var h2Collection = $u('h2');
		expect(h2Collection instanceof Array).toEqual(true);
		expect(h2Collection.length).toEqual(19);
		expect($u('ul').length).toEqual(22);
		expect($u('div', $u('#divid')[0]).length).toEqual(4);
	});

	it('should select elements by className', function(){
		var classVcardCollection = $u('.vcard');
		expect(classVcardCollection instanceof Array).toEqual(true);
		expect(classVcardCollection.length).toEqual(5);
		expect($u('.pattern').length).toEqual(40);
		expect($u('.example').length).toEqual(43);
		expect($u('.inner', $u('.wrapper')[0]).length).toEqual(1);
	});
	
	it('should select elements by tagName and id', function(){
		expect($u('h1#title').length).toEqual(1);
		expect($u('div#title').length).toEqual(0);
	});
	
	it('should select elements by tagName and className', function(){
		expect($u('div.wrapper').length).toEqual(4);
		expect($u('b.wrapper').length).toEqual(1);
	});
	
	it('should select elements with untrimed selectors', function(){
		expect($u(' #title ').length).toEqual(1);
		expect($u(' ul ').length).toEqual(22);
		expect($u(' .example ').length).toEqual(43);
		expect($u(' h1#title ').length).toEqual(1);
		expect($u(' abbr.some#abbr-id.classes.here').length).toEqual(1);
	});
	
	it('should select elements with the added pseudo classes', function(){
		$u.pseudos['contains-cheese'] = function(node){
			return node.innerHTML.indexOf('cheese') > -1;
		};
		expect($u('div:contains-cheese').length).toEqual(1);
		expect($u('div:non-existent-pseudo').length).toEqual(0);
	});
	
});

};
