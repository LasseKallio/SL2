Files:
index.html <- front-end entry point

/views:
shoppinglist.html <- this view should display the whole list. You might use a table and ng-repeat for example.
additem.html <- this view is for adding new list items. Add all the necessary inputs.
details.html <- this view should have a search input and then someway to show ONE result from the database.

/scripts
main.js <- the main router. Enter controllers and views here
/controllers
	controllers.js <- all the controllers
		- ListController should use the query() to list all results. Used by shoppinglist.html
		- AddController should use the save() to save new entries. Used by additem.html
		- ItemController should use the get() to get one entry by using id. Used by details.html

/factories
	factories.js <- all the factories
		- ShoppingItem should use the $resource the generate an API at /api/shoppinglist/:id