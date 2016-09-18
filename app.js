

angular.module('app', [ 'ngMaterial', 
						'ui.router',
						'firebase', 
						'app.timeline', 
						'app.friends', 
						'app.profile',
						'app.services'
						]);

angular.module('app')

.config(function($stateProvider, $urlRouterProvider){
	
		$urlRouterProvider.otherwise('/timeline');

		$stateProvider.state('timeline', {
			url: '/timeline',
			templateUrl: 'timeline/index.html',
			controller: 'TimelineController as vm'
		});

		$stateProvider.state('friends', {
			url: '/friends',
			templateUrl: 'friends/index.html',
			controller: 'FriendsController as vm'
		});

		$stateProvider.state('profile', {
			url: '/profile',
			templateUrl: 'profile/index.html',
			controller: 'ProfileController as vm'
		});


})

.controller('AppController', function($scope, $state, $rootScope, $mdDialog){
	var vm = this;
	vm.selectedIndex = 0;
	
	$scope.$watch('vm.selectedIndex', function(newVal, oldVal){
		switch(newVal){
			case 0:
				$state.go('timeline');
				break;
			case 1:
				$state.go('friends');
				break;
			case 2:
				$state.go('profile');
				break;
			default: 
				$state.go('timeline');
				break;
		}
	});

    
    vm.newTweet = function($event){
        var parent = angular.element(document.body);
		$mdDialog.show({
			parent: parent,
			targetEvent: $event,
			clickOutsideToClose: true,
			templateUrl: './tweet.html',
			controller: 'TweetController as vm'
		});
	}	        
    
    $rootScope.$on('timeline:tweetSent', function(event, data){
        $mdDialog.hide();
	})
    
})
.controller('TweetController', function(TimelineService){
	var vm = this;	
	vm.username = 'Admin';
    vm.text = '';
	
	vm.send = function(){
		TimelineService.send(vm.username, vm.text);
	}
})
; 