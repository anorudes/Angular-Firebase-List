angular.module('app.controllers', []);
angular.module('app.services', []);
angular.module('app.directives', []);

angular.module('app', ['ui.router', 'ngAnimate', 'ngFx', 'firebase', 'app.controllers', 'app.services', 'app.directives'])
.constant('FIREBASE_URL', 'https://blinding-heat-9891.firebaseio.com/')

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/main");
  $stateProvider
    .state('main', {
      url: "/main",
      templateUrl: "views/main.html",
      controller: 'MainCtrl'
    })
    .state('list', {
      url: "/list",
      templateUrl: "views/list.html",
      controller: 'ItemsCtrl'
    })
    .state('list.item', {
      url: "/item/:id",
      templateUrl: "views/item.html",
      controller: 'ItemCtrl'
    })
    .state('list.item-edit', {
      url: "/item/:id/edit",
      templateUrl: "views/itemEdit.html",
      controller: 'ItemCtrl'
    })    
});
