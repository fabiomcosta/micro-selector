var microSpecs = function(context){

describe('Micro Selector', function() {
	
	var $u = uSelector;
	$u.context = context.document;
	
	describe('id selector', function(){
		it('should select some id', function(){
			expect($u('#title').length).toEqual(1);
			expect($u('#other').length).toEqual(0);
		});
	});

	xdescribe('tag selector', function(){

	});

	xdescribe('class selector', function(){

	});
	
	xdescribe('mixed selectors', function(){

	});

});

};
