myApp.config(function($routeProvider){

	 $routeProvider
	 		.when('/', {
	 			redirectTo: '/login'
	 		})
	        .when('/login',{
	            templateUrl: './../static/partials/login.html',
	        })
	        .when('/main',{
	            templateUrl: './../static/partials/topic.html',
	            controller: 'topicsController as tc'
	        })
	         .when('/show/:tid',{
	            templateUrl: './../static/partials/show.html',
	            controller: 'topicsController as tc'
	        })
	          .when('/create',{
	            templateUrl: './../static/partials/create.html',
	            controller: 'topicsController as tc'
	        })
	        .otherwise({
	          redirectTo: '/'
	        });
})