angular.module('app.services', [])
.factory('TimelineService', function($firebaseArray, $rootScope){

    var baseRef = new Firebase("https://knowtweets.firebaseio.com");

    var tweetsRef = baseRef.child('tweets');
    var usersRef = baseRef.child('users');

    initData();

   
    
	var result = {
		all: all,
		friends: friends,
        send: send
	};
	function all(){
		return $firebaseArray(tweetsRef);
	};
	function friends(){
		return $firebaseArray(usersRef);
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


	function initData(){

        var family = [{
                name: 'Santi Herranz',
                username: 'santiherranz',
                face: 'https://yt3.ggpht.com/-ei94_0Q8mlg/AAAAAAAAAAI/AAAAAAAAAAA/sXWio_4KnLA/s900-c-k-no-rj-c0xffffff/photo.jpg',
                bio: 'Software developer'
            },{
                name: 'Mar Mir',
                username: 'marmir',
                face: '',
                bio: 'Health Care professional'
            },{
                name: 'Martina Herranz Mir',
                username: 'martinaherranz',
                face: '',
                bio: '6e'
            },{
                name: 'Victor Herranz Mir',
                username: 'victorherranz',
                face: '',
                bio: '4e'
            }]; 


        family.forEach(function(element) {
            $firebaseArray(usersRef).$ref().orderByChild("username").equalTo(element.username).once("value", function(dataSnapshot){
                if(dataSnapshot.exists()){
                    console.log("Allready exists.");
                } else {
                    console.log("Not found.");
                    $firebaseArray(usersRef).$add(element).then(function(ref){
                    //ADDED
                    });          
                }
        });
        }, this);         
	};    
	
	return result;
})