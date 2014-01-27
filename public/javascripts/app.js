var app = angular.module('myApp', ['ngRoute','firebase']);

app.value('fbUrl', 'https://rentacar.firebaseio.com/');

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', 
      {
        templateUrl: 'partials/main.html', 
        controller: 'ListingCtrl'
      })
    .when('/add', 
      {
        templateUrl: 'partials/add.html',
        controller: 'CreateCtrl'
      })
    .when('/listing/:id', 
      {
        templateUrl: 'partials/listing.html',
        controller: 'BookingCtrl'
      })
    .otherwise('/',
      {
        templateUrl: 'partials/main.html', 
        controller: 'ListingCtrl'
      });
}]);

app.factory('Listings', ['$firebase', 'fbUrl', function($firebase, fbUrl){
  return $firebase(new Firebase(fbUrl).child('Listings'));
}]);

app.controller('ListingCtrl', ['$scope', 'Listings', '$location', '$filter', 
  function($scope, Listings, $location, $filter){
  $scope.Listings = Listings;
  $scope.showDetails = function(){
    $location.path()
  }

  $scope.zoomToArea = function(latLng){
    map.setView(latLng, 17);
  }

  $scope.goToListing = function(id){
    $location.path('listing/' + id);
  }
}]);

app.controller('CreateCtrl', ['$scope', 'Listings', '$http', '$location', '$rootScope', 
  function($scope, Listings, $http, $location, $rootScope){
    $scope.newListing = {};
    $scope.marker = '';

    $scope.setLatLng = function(latLng){
      $scope.newListing.latLng = [latLng.lat, latLng.lng];
    }

    $scope.geocode = function(){
      var searchUrl = 'http://maps.googleapis.com/maps/api/geocode/json?address='
      + $scope.searchLocation + '&sensor=false';
      $http.get(searchUrl)
        .success(function(data, status, headers, config){
          var latLng = data.results[0].geometry.location;
          $scope.searchLocation = data.results[0].formatted_address;
          $scope.newListing.address = data.results[0].formatted_address;
          map.setView(latLng, 17);

          if(!$scope.marker){
            $scope.marker = L.marker(latLng, {
              draggable: true
            });
            $scope.marker.addTo(map);
          } else {
            $scope.marker.setLatLng(latLng);
          }
          
          $scope.setLatLng($scope.marker.getLatLng());
                    
          $scope.marker.on('dragend', function(e){
            $scope.setLatLng($scope.marker.getLatLng());
          });

        });
    }

    $scope.addListing = function(){
      if($scope.listingForm.$valid && $scope.newListing.latLng){
        var image = angular.element('#imgPreview').attr('src');
        $scope.newListing.image = image;
        $scope.newListing.userid = $rootScope.loginUser.id;
        Listings.$add($scope.newListing);
        $scope.newListing = {};

        $location.path('/');
      } else {
        alert('Fill in all details!');
      }
    }
}]);

app.controller('BookingCtrl', ['$scope', 'Listings', '$routeParams', 
  function($scope, Listings, $routeParams){
    var id = $routeParams.id;
    $scope.listing = Listings[id];
}]);

app.controller('AuthCtrl', ['$scope', '$firebaseSimpleLogin', 'fbUrl', '$location', '$rootScope', 
 function($scope, $firebaseSimpleLogin, fbUrl, $location, $rootScope){
  var dataRef = new Firebase(fbUrl);
  $scope.loginObj = $firebaseSimpleLogin(dataRef);

  $scope.loginObj.$getCurrentUser().then(function(user){
    $rootScope.loginUser = user;
  });
  
  $scope.loginUser = function(){
    $scope.loginObj.$login('facebook').then(function(user){
      $rootScope.loginUser = $scope.loginObj.user;
      console.log(user);
    });
  }

  $scope.logoutUser = function(){
    $scope.loginObj.$logout();
    $rootScope.loginUser = $scope.loginObj.user;
    $location.path('/');
  }
}]);

app.directive('addMap', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){      
      var targetHeight = $('#' + attrs.id).width();
      $('#' + attrs.id).height(targetHeight);

      map = L.map(attrs.id).setView([1.3667, 103.8], 13);

      L.tileLayer('http://{s}.tile.cloudmade.com/a8c6a21cf9004641b8b047be28dac107/96931/256/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18}).addTo(map);

      $(window).resize(function(){
        var targetHeight = $('#' + attrs.id).width();
        $('#' + attrs.id).height(targetHeight);
      });
    }
  };
});

app.directive('mainMap', ['Listings', function(Listings){
  return{
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs){
      map = L.map(attrs.id).setView([1.3667, 103.8], 12);
      L.tileLayer('http://{s}.tile.cloudmade.com/a8c6a21cf9004641b8b047be28dac107/96931/256/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(map);
      
      Listings.$bind(scope, 'Listings').then(function(unbind){
        angular.forEach(Listings.$getIndex(), function(value, key){
          var latLng = Listings[value].latLng;
          L.marker(latLng).on('click', function(){
            map.setView(latLng, 17);
          }).addTo(map);
        });
      });

      // navigator.geolocation.getCurrentPosition(function(position){
      //   var latLng = [position.coords.latitude, position.coords.longitude];
      //   map.setView(latLng, 16);

        // L.marker(latLng).addTo(map);
      // });

      var height = $(window).height();
      $('#' + attrs.id).height(height - 50);

      $(window).resize(function(){
        var height = $(window).height();
        $('#' + attrs.id).height(height - 50);        
      });
    }
  }
}]);