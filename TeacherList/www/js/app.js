// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('tabs',{
          url:'/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'



      })
      .state('tabs.home',{
          url:'/home',
          views:{
            'home-tab' : {
                templateUrl: 'templates/home.html'
            }

          }


      })
      .state('tabs.list',{
          url:'/list',
          views:{
            'list-tab' : {
                templateUrl: 'templates/list.html',
                controller:'ListCtrl'
            }

          }


      })
      .state('tabs.detail',{
          url:'/list/:aId',
          views:{
            'list-tab' : {
                templateUrl: 'templates/detail.html',
                controller:'ListCtrl'
            }

          }


      })
      $urlRouterProvider.otherwise('/tab/home');
})






//dosyadan okuma//
.controller('ListCtrl', ['$scope','$http','$state',function($scope, $http,$state){
  $http.get('js/data.json').success(function(data){
    $scope.teachers = data;
    $scope.whichteachers=$state.params.aId;
    $scope.data = {showDelete:false, showreorder:false};

    //teacher silme//
    $scope.onItemDelete= function(item) { //teacher silme//
        $scope.teachers.splice($scope.teachers.indexOf(item), 1);

    }
    //refresh etme//
    $scope.doRefresh = function(){
        $http.get('js/data.json').success(function(data){
          $scope.teachers = data;
          $scope.$broadcast('scroll.refreshComplete');

});
    }

    
    $scope.moveItem = function(item, fromIndex, toIndex) //Teacher yer değiştirme//

    {

        $scope.teachers.splice(fromIndex, 1);
        $scope.teachers.splice(toIndex, 0, item);    


    };

  });

}]);