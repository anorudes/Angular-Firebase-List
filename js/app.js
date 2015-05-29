'use strict';

angular.module('app.controllers', []);
angular.module('app.services', []);
angular.module('app.directives', []);

angular.module('app', ['ui.router', 'ngAnimate', 'ngFx', 'firebase', 'app.controllers', 'app.services', 'app.directives']).constant('FIREBASE_URL', 'https://blinding-heat-9891.firebaseio.com/').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
  $stateProvider.state('main', {
    url: '/main',
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  }).state('list', {
    url: '/list',
    templateUrl: 'views/list.html',
    controller: 'ItemsCtrl'
  }).state('list.item', {
    url: '/item/:id',
    templateUrl: 'views/item.html',
    controller: 'ItemCtrl'
  }).state('list.item-edit', {
    url: '/item/:id/edit',
    templateUrl: 'views/itemEdit.html',
    controller: 'ItemCtrl'
  });
}]);

angular.module('app.controllers').controller('ItemCtrl', ['$scope', 'ItemsFactory', '$stateParams', function ($scope, ItemsFactory, $stateParams) {
  $scope.index = $stateParams.id;
  ItemsFactory.get($stateParams.id).then(function (data) {
    $scope.item = data;
    $scope.title = data.title;
    $scope.descr = data.descr;
    $scope.link = data.link;
    $scope.save = function () {
      $scope.item.title = $scope.title;
      $scope.item.descr = $scope.descr;
      $scope.item.link = $scope.link;
      ItemsFactory.save($scope.item);
    };
  });
}]);

angular.module('app.controllers').controller('ItemsCtrl', ['$scope', 'ItemsFactory', '$state', function ($scope, ItemsFactory, $state) {

  $scope.items = ItemsFactory.getAll();

  $scope.newItem = ItemsFactory['new']();
  $scope.itemsFilter = { title: '' };

  $scope.addItem = function () {
    ItemsFactory.add($scope.newItem);
    $scope.newItem = ItemsFactory['new']();
    $scope.itemsFilter.title = '';
  };

  $scope.deleteItem = function (i) {
    ItemsFactory['delete'](this.item);
    $state.go('list');
  };
}]);

angular.module('app.controllers').controller('MainCtrl', ['$scope', 'ItemsFactory', function ($scope, ItemsFactory) {}]);
angular.module('app.services').factory('ItemsFactory', ['$firebaseArray', 'FIREBASE_URL', '$q', function ($firebaseArray, FIREBASE_URL, $q) {
  var sync = new Firebase(FIREBASE_URL + 'Items/');
  var items = $firebaseArray(sync);

  return {
    getAll: function getAll() {
      return items;
    },
    save: function save(item) {
      items.$save(item);
    },
    add: function add(newItem) {
      if (!newItem.title) {
        return false;
      }items.$add(newItem);
    },
    'new': function _new() {
      return {
        title: '',
        link: '',
        descr: ''
      };
    },
    'delete': function _delete(item) {
      items.$remove(item);
    },
    get: function get(index) {
      return this.getAll().$loaded().then(function () {
        return items[index];
      });
    }
  };
}]);

angular.module('app.directives').directive('cardFull', function () {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="card">\n                     <span class="title">\n                       {{ item.title }}\n                      </span>\n                    <span class="text">\n                       {{ item.descr }}\n                    </span>\n                    <br /><br />                    \n                    <a style="cursor: pointer" ui-sref="list.item-edit({id: index})">Редактировать</a>\n                    </div>'
  };
}).directive('card', function () {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="card" ui-sref=".item({id: $index})">\n                  <div class="card-content">\n                     <span class="card-title activator grey-text text-darken-4">{{ item.title }}<i class="mdi-navigation-more-vert right"></i></span>\n                     <p><a href="#">{{ item.link }}</a></p>\n                     <a href="" ng-click="deleteItem($index)">Delete</a>\n                  </div>\n                  <div class="card-reveal">\n                      <span class="card-title grey-text text-darken-4">{{ item.title }} <i class="mdi-navigation-close right"></i></span>\n                      <p>{{ item.descr }}</p>\n                      </div>\n\n                  </div>'
  };
});
//# sourceMappingURL=app.js.map