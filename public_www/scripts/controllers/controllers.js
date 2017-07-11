var app = angular.module("Controllers", ["Factories"]);

app.controller("ListController", function($scope,ShoppingItem) {
		var list = ShoppingItem.query(function() {
			$scope.shoppinglist = list[0];			
		});	
});

app.controller("AddController", function($scope,ShoppingItem) {

		$scope.addbutton = function() {
			console.log("add");
			var newitem = new ShoppingItem();
			newitem.id = $scope.id;
			newitem.name = $scope.name;
			newitem.count = $scope.count;
			newitem.price = $scope.price;
			newitem.$save();
			$scope.id = "";
			$scope.name = "";
			$scope.count = "";
			$scope.price = "";
		}	
});

app.controller("ItemController", function($scope,ShoppingItem) {
			$scope.search = function(){
				console.log("Search");
				ShoppingItem.get({id:$scope.id}, function(shoppingitem) {
						console.log(shoppingitem);
						$scope.details = shoppingitem;
				});
			}
});

app.controller("LoginController", function($scope,LoginFactory,TokenFactory,UiFactory) {


			
});

app.controller("IndexController", function($scope,UiFactory) {

});

