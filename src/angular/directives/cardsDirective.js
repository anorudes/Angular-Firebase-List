angular.module('app.directives')
.directive('cardFull', function() {
    return {
       restrict: 'E',
       replace: true,
       template:   `<div class="card">
                     <span class="title">
                       {{ item.title }}
                      </span>
                    <span class="text">
                       {{ item.descr }}
                    </span>
                    <br /><br />                    
                    <a style="cursor: pointer" ui-sref="list.item-edit({id: index})">Редактировать</a>
                    </div>`
    };
})
.directive('card', function() {
    return {
       restrict: 'E',
       replace: true,
       template: `<div class="card" ui-sref=".item({id: $index})">
                  <div class="card-content">
                     <span class="card-title activator grey-text text-darken-4">{{ item.title }}<i class="mdi-navigation-more-vert right"></i></span>
                     <p><a href="#">{{ item.link }}</a></p>
                     <a href="" ng-click="deleteItem($index)">Delete</a>
                  </div>
                  <div class="card-reveal">
                      <span class="card-title grey-text text-darken-4">{{ item.title }} <i class="mdi-navigation-close right"></i></span>
                      <p>{{ item.descr }}</p>
                      </div>

                  </div>`
    };
});
