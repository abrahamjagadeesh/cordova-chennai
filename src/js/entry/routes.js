chennai.config(['$routeProvider',
 function ($routeProvider) {
		$routeProvider.
		when('/home', {
			templateUrl: 'template/home.html'
		}).
		otherwise({
			redirectTo: '/home'
		});
 }]);