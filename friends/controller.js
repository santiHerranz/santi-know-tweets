angular.module('app.friends', [])
.controller('FriendsController', function(TimelineService){
    this.friends = TimelineService.friends();
})