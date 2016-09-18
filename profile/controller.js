
angular.module('app.profile', [])
.controller('ProfileController', function($stateParams, TimelineService){
	var vm = this;

    vm.friends = TimelineService.friends();
    
    if($stateParams.username == null) {
        vm.user = {
                    name: "Admin",
                    username: "admin",
                    face: '',
                    bio: ''
                };

    } else {
        vm.user = {
                    name: $stateParams.username,
                    username: $stateParams.username,
                    face: '',
                    bio: ''
                };
    }

            


    

})