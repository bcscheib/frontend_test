var Tabifier = {
	init: function(selector){
		Tabifier.selector = selector;
		Tabifier.setNavClicks();
		Tabifier.setActiveTab(0);
	},
	getNavLinks: function(){
		return $(Tabifier.selector + " .tab-container-nav a");
	},
	setNavClicks: function(){
		var links = Tabifier.getNavLinks();

		links.each(function(i, link){
			link = $(link);
			link.on('click', function(){ 
				Tabifier.setActiveTab(link.attr('data-tab'));
			});
		});
	},
	setActiveTab: function(index){
		Tabifier.activeIndex = index;
		var contentDivs = $(Tabifier.selector + " .tab-content");
		var links = Tabifier.getNavLinks();

		links.each(function(i, link){
			Tabifier.compareTabNum($(link));
		});

		contentDivs.each(function(i, div){
			Tabifier.compareTabNum($(div));
		});
	},
	compareTabNum: function(el){
		el.attr('data-tab') != this.activeIndex ? el.removeClass('active') : el.addClass('active');
	}
}