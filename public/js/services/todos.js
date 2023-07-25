angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			getById : function(id) {
				return $http.get('/api/todos/' + id);
			},
			getFormatted : function(format) {
				return $http.get('/api/todos/formatted/' + format);
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			addTodo : function(text) {
				return $http.post('/api/todos/create', text);
			},
			createRandomTodos : function() {
				return $http.post('/api/todos/random');
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);