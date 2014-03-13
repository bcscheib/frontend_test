function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

(function (){
	var BenQueryObject = {
		elements: null,
		length: 0,
		init: function(elements){
			this.elements = elements;
			this.length = elements.length;
			return clone(this);
		},
		get: function(index){
			return this.elements[index] || null;
		},
		html: function(html){
			var returnObj = this;
			var el = this.elements[0];
			if(el !== undefined){
				if(html !== undefined){
					el.innerHTML = html;
				}else{
					returnObj = el.innerHTML;
				}
			}
			return returnObj; // return object or html depending on get/set
		},
		text: function(text){
			var returnObj = this;
			var el = this.elements[0];
			if(el !== undefined){
				if(text !== undefined){
					console.log("was string to set");
					el.innerText = text;
				}else{
					returnObj = el.textContent;
				}
			}
			return returnObj; // return object or html depending on get/set
		},
		val: function(text){
			var returnObj = null;
			var el = this.elements[0];
			try{
				returnObj = el.value;
			}catch(Error){}
			return returnObj; // return object or html depending on get/set
		},
		attr: function(attrName){
			var el = this.elements[0];
		    var attr;
			if(el !== undefined)
				attr = el.getAttribute(attrName);
			return attr;
		},
		addClass: function(klass){
			for(var i = 0; i < this.elements.length; i++){
				var el= this.elements[i];
				if(el.className.indexOf(klass) == -1)
					el.className = el.className + " " + klass;
			}
			return this;
		},
		removeClass: function(klass){
			for(var i = 0; i < this.elements.length; i++){
				var el= this.elements[i];
				el.className = el.className.replace(klass, '');
			}
			return this;
		},
		each: function(iteratorFunction){
			for(var i = 0; i < this.elements.length; i++){
				var obj = this.elements[i]; 
				iteratorFunction(i, obj);
			}
		},
		on: function(eventType, callback){
			for(var i = 0; i < this.elements.length; i++){
				var obj = this.elements[i]; // jquery returns a regular html object here
				obj.addEventListener(eventType, callback);
			}
		}
	}
	var BenQuery = {
		find: function(selector){
			var elements;
			if(typeof(selector) == 'object'){
				elements = selector.length != 1 ? [selector] : selector;
			}else{
				elements = document.querySelectorAll(selector);
			} 
			return BenQueryObject.init(elements);//elements.length == 1 ? elements[0] : elements;
		}
	}

	window.$ = function(selector){
		return BenQuery.find(selector)
	};
})();

String.prototype.isBlank = function() {
    return (this === null || /^\s*$/.test(this));
}