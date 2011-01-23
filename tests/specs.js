var microSpecs = function(context){

describe('Micro Selector', function() {
	
	var $u = uSelector;
	$u.context = context.document;
	
	describe('id selector', function(){
		it('should select elements by id', function(){
			expect($u('#title').length).toEqual(1);
			expect($u('#other').length).toEqual(0);
		});
	});

	describe('tag selector', function(){
		it('should select elements by tag name', function(){
			expect($u('h2').length).toEqual(19);
			expect($u('ul').length).toEqual(22);
		});
	});

	xdescribe('class selector', function(){

	});
	
	xdescribe('mixed selectors', function(){

	});

});

};
