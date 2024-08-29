angular.module('hostService', [])
    .factory('HostDetail', ['$http', function($http) {
        return {
            get: function() {
                return $http.get('/api/hostdetail');
            }
        }
    }]);
