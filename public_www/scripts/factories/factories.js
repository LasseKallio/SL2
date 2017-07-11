var app = angular.module("Factories",["ngResource"]);

app.factory("ShoppingItem", function($resource, TokenFactory) {
	
return $resource('/api/shoppinglist/:id', 
                        {id: '@id'}, 
                        {'query': {method: 'GET'}});



});
	



app.factory("TokenFactory", function() {

	var TokenFactory = {};
	return {};

	
});

app.factory("LoginFactory", function($http) {

		var LoginFactory = {};
	return {};
	

		
}); 
app.factory("UiFactory", function() {

	var UiFactory = {};
	return {};
});
