var microSpecs = function(context){

describe('Micro Selector', function() {
	
	var $u = uSelector;
	$u.context = context.document;
	
	beforeEach(function(){
		this.addMatchers({
			toFind: function(n){
				var found = $u(this.actual).length;
				this.message = function() {
					return [
						"Expected " + this.actual + " to find " + n + " but found " + found,
						"Expected " + this.actual + " not to find " + n
					];
				};
				return found == n;
			}
		});
	});
	
	it('should select elements by id', function(){
		expect('#title').toFind(1);
		expect('#other').toFind(0);
		expect('#divid').toFind(1);
		expect('#divid2').toFind(1);
		expect($u('#divid', $u('#divid2')[0]).length).toEqual(0);
	});

	it('should select elements by tagName', function(){
		var h2Collection = $u('h2');
		expect(h2Collection instanceof Array).toEqual(true);
		expect(h2Collection.length).toEqual(19);
		expect('ul').toFind(22);
		expect($u('div', $u('#divid')[0]).length).toEqual(4);
	});

	it('should select elements by className', function(){
		var classVcardCollection = $u('.vcard');
		expect(classVcardCollection instanceof Array).toEqual(true);
		expect(classVcardCollection.length).toEqual(5);
		expect('.pattern').toFind(40);
		expect('.example').toFind(43);
		expect($u('.inner', $u('.wrapper')[0]).length).toEqual(1);
	});
	
	it('should select elements by tagName and id', function(){
		expect('h1#title').toFind(1);
		expect('div#title').toFind(0);
	});
	
	it('should select elements by tagName and className', function(){
		expect('div.wrapper').toFind(4);
		expect('b.wrapper').toFind(1);
	});
	
	it('should select elements with untrimed selectors', function(){
		expect(' #title ').toFind(1);
		expect(' ul ').toFind(22);
		expect(' .example ').toFind(43);
		expect(' h1#title ').toFind(1);
		expect(' abbr.some#abbr-id.classes.here').toFind(1);
	});
	
	it('should select elements with the added pseudo classes', function(){
		$u.pseudos['contains-cheese'] = function(node){
			return node.innerHTML.indexOf('cheese') > -1;
		};
		expect('div:contains-cheese').toFind(1);
		expect('div:non-existent-pseudo').toFind(0);
	});
	
	describe('Extra pseudo classes contained on the uSelectorPseudoClasses', function(){
		
		it('should find elements by the defined pseudo-classes', function(){
			expect('a:empty').toFind(30);
			
			expect('p:first-child').toFind(54);
			expect('p:last-child').toFind(19);
			expect('p:only-child').toFind(3);

			expect('p:first-of-type').toFind(57);
			expect('p:last-of-type').toFind(57);
			expect('p:only-of-type').toFind(15);
			
			expect(':disabled').toFind(0);
			expect(':checked').toFind(0);
			expect(':selected').toFind(0);
		});
		
	});
	
});

};
