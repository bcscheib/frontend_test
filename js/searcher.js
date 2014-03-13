var Searcher = {
	searching: false,
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
		this.docText = this.doc.text();
		this.docHTML = this.doc.html(); 

		this.resultNumContainer = $(this.resultsSelector + ' i');
		this.resultQContainer = $(this.resultsSelector + ' span');
		this.initInput();
	},

	initInput: function(){
		Searcher.input.on('click', function(){ 
			Searcher.checkClearedSearch();
		});
		
		Searcher.input.on('keyup', function(){ // detect typing changes
			if(Searcher.searching == false){
				Searcher.searching = true;
				setTimeout(function(){
					var q = Searcher.input.val();
					if(!q.isBlank()){
						Searcher.searchDoc(q);
						Searcher.highlightWords(q);
					}else{
						Searcher.checkClearedSearch(q);
					}
					Searcher.searching = false;
				}, 600)
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
			p.html(p.text().replace(pattern, function(match){
				return '<span class="highlight">' + match + '</span>';
			}));
		});
	},

	searchDoc: function(q){
		var pattern = new RegExp(q, 'gi');
		var count = this.docText.match(pattern);  
		count = count || [];
		this.resultNumContainer.text(count.length);
		this.resultQContainer.text(q);
		Searcher.input.addClass('found');
		Searcher.resultsDiv.removeClass('hidden');
	}
}