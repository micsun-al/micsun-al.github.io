// WORKAROUND FOR IOS PRIVATE BROWSING MODE
if(1){
	try{
		if(typeof localStorage === 'object') {
			localStorage.setItem('localStorage', 1);
			localStorage.removeItem('localStorage');
		}
	}catch (e){
		var tempLocalStorage = {};
		Storage.prototype._setItem = Storage.prototype.setItem;
		Storage.prototype.setItem = function(key, value){
			tempLocalStorage[key] = value;
		};
		Storage.prototype.getItem = function(key, value){
			return tempLocalStorage[key] || null;
		};
		alert('Your web browser is not allowing game progress to be saved.  The most likely cause is the use of private/incognito mode.');
	}
}
if(!Array.prototype.forEach){
	Array.prototype.forEach = function(fn, scope){
		var i, ln;
		for(i = 0, ln = this.length; i < ln; ++i) {
			fn.call(scope, this[i], i, this);
		}
	}
}
if(!Array.prototype.getUnique){
	Array.prototype.getUnique = function(){
		var u = {}, a = [], i, ln;
		for(i = 0, ln = this.length; i < ln; ++i){
			if(u.hasOwnProperty(this[i])){
				continue;
			}
			a.push(this[i]);
			u[this[i]] = 1;
		}
		return a;
	}
}
if(typeof console === 'undefined'){
	console = { log: function() { } };
}