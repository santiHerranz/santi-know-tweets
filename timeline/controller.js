angular.module('app.timeline', [])
.controller('TimelineController', function(TimelineService){
    this.tweets = TimelineService.all();
})