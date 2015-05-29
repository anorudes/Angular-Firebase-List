angular.module('app.services')
.factory("ItemsFactory", function($firebaseArray, FIREBASE_URL, $q) {  
  var sync = new Firebase(FIREBASE_URL+'Items/');
  var items = $firebaseArray(sync); 

  return {    
    getAll: function() {      
      return items;
    },
    save: function(item) {               
      items.$save(item);  
    },
    add: function(newItem) {  
        if (!newItem.title) 
          return false;        
        items.$add(newItem);
    },
    new: function() {
      return {
        title: "",
        link: "",
        descr: ""
      }
    },
    delete: function(item) {
      items.$remove(item);
    },
    get: function(index) {      
      return this.getAll().$loaded().then(function() { return items[index] });
    }
  }
});
