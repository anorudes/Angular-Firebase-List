angular.module('app.controllers')
.controller('ItemCtrl', function($scope, ItemsFactory, $stateParams) {          
    $scope.index = $stateParams.id;
    ItemsFactory.get($stateParams.id).then(function(data) {
      $scope.item = data;
      $scope.title = data.title;
      $scope.descr = data.descr;
      $scope.link = data.link;
      $scope.save = function() {        
        $scope.item.title = $scope.title;
        $scope.item.descr = $scope.descr;
        $scope.item.link = $scope.link;        
        ItemsFactory.save($scope.item);
      }
    });
});



