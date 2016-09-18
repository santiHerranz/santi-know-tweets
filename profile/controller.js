
angular.module('app.profile', [])
.controller('ProfileController', function(TimelineService){
	var vm = this;
	
	vm.user = {
        name: 'Santi Herranz',
        username: 'santiherranz',
        //face: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/219/01d/3194a20.jpg',
        face: 'https://yt3.ggpht.com/-ei94_0Q8mlg/AAAAAAAAAAI/AAAAAAAAAAA/sXWio_4KnLA/s900-c-k-no-rj-c0xffffff/photo.jpg',
        bio: 'Software developer'
    };
})