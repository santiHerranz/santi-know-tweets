angular.module('app', ['ngMaterial','firebase']);

angular.module('app')
.controller('AppController', function($rootScope, $mdDialog, TimelineService){
	var vm = this;
    vm.tweets = TimelineService.all();
    
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
.factory('TimelineService', function($firebaseArray, $rootScope){

    var tweetsRef = new Firebase("https://knowtweets.firebaseio.com" + '/tweets');
    
	var result = {
		all: all,
        send: send
	};
	function all(){

		return $firebaseArray(tweetsRef);
	};

    
    function send(username, text){
		var tweet = {
			author: username,
			title: text
		};
        $firebaseArray(tweetsRef).$add(tweet).then(function(ref){
			$rootScope.$broadcast('timeline:tweetSent', null);
		})
	}
	
	return result;
}); 