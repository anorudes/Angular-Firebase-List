angular.module('app.controllers')
.controller('ItemsCtrl', function($scope, ItemsFactory, $state) {    

  $scope.items = ItemsFactory.getAll();    
  
  $scope.newItem = ItemsFactory.new();
  $scope.itemsFilter = { title: "" }

  $scope.addItem = function() {        
    ItemsFactory.add($scope.newItem);
    $scope.newItem = ItemsFactory.new();
    $scope.itemsFilter.title = "";
  };

  $scope.deleteItem = function(i) { 
    ItemsFactory.delete(this.item);
    $state.go('list');
  };

});
