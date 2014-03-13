var Rotator = {
	currIndex: -1, // show hasn't started :)
	init: function(selector){
		console.log("init");
		Rotator.selector = selector;
		Rotator.slides = $(Rotator.selector + " li");
		Rotator.setActiveSlide();
		setInterval(this.setActiveSlide, 3000);
	},
	setActiveSlide: function(){
		Rotator.currIndex = Rotator.isLastSlide() ? 0 : (Rotator.currIndex + 1);
		console.log(Rotator.currIndex);
		Rotator.slides.each(function(i, s){ 
			console.log("slide", s);
			s = $(s); 
			i != Rotator.currIndex ? s.removeClass('active') : s.addClass('active');
		});
	},
	isLastSlide: function(){
		return Rotator.currIndex == (Rotator.slides.length - 1);
	}
}