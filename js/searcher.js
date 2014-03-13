var Searcher = {
	init: function(options){
		if(options === undefined)
			options = {};

		this.resultsSelector = options.results_selector || '#results';
		this.inputSelector = options.input_selector || '#search_input';
		this.docSelector = options.doc_selector || '#search_text';
		
		this.resultsDiv = $(this.resultsSelector);
		this.input = $(this.inputSelector);
		this.doc = $(this.docSelector);

		// preserve doc text
		this.docText, this.docHTML = this.doc.text(), this.doc.html(); 

		this.resultNumContainer = $(options.results_selector + ' i');
		this.resultQContainer = $(options.results_selector + ' span');
		this.initInput();
	},

	initInput: function(){
		Searcher.input.on('click', function(){ 
			Searcher.checkClearedSearch();
		});
		
		Searcher.input.on('keyup', function(){ // detect typing changes
			var q = Searcher.input.val();
			if(!q.isBlank()){
				Searcher.input.addClass('found');
				Searcher.resultsDiv.removeClass('hidden');
				Searcher.searchDoc(q);
				Searcher.highlightWords(q);
			}else{
				Searcher.checkClearedSearch(q);
			}
		});
	},

	checkClearedSearch: function(){ // detect clearing the input html5 search field
		if(Searcher.input.val().isBlank()){
			Searcher.doc.html(Searcher.docHTML);
			Searcher.input.removeClass('found');
			Searcher.resultsDiv.addClass('hidden');
		}
	},

	highlightWords: function(q){
		var ps = $('#search_text p');
		ps.each(function(i, p){
			p = $(p);
			var pattern = new RegExp(q, 'gi');
			p.html(p.text().replace(pattern, '<span class="highlight">' + q + '</span>'));
		});
	},

	searchDoc: function(q){
		var pattern = new RegExp(q, 'gi');
		var count = this.docText.match(pattern);  
		count = count || [];
		this.resultNumContainer.text(count.length);
		this.resultQContainer.text(q);
	}
}