angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope', '$http', 'Todos', 'HostDetail', function($scope, $http, Todos, HostDetail) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

               // GET =====================================================================
               // docker host detail
               // use the service to get host details, for now it is just the hostname	
               HostDetail.get().success(function(data) {
                   $scope.hostName = data.hostname;
               });
		
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// CREATE RANDOM TODOS ==================================================================
		$scope.createRandomTodos = function() {
			$scope.loading = true;

			// call the createRandomTodos function from our service (returns a promise object)
			Todos.createRandomTodos()

				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});

			Todos.get()
				.success(function(data) {
					$scope.todos = data;
					$scope.loading = false;
				});
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
	}]);
