angular.module('SlushFunApp')
  .controller('SearchResultsCtrl', ['$scope', 'deliveryDataService', '$state', 'localStorageService',
    function($scope, $deliveryDataService, $state, localStorageService){
      $scope.inSearchResults = true;
      $scope.storeDetails = {};
      localStorageService.add('localStorageKey','Yo teach!');
      $scope.$on('$stateChangeStart',
        function(evt, toState, toParams, fromState, fromParams) {
          if (toState.name === "deliveries.nearMe"){
            $scope.inSearchResults = true;
          } else {
            $scope.inSearchResults = false;
          }
        });

      $scope.$on('$stateChangeStart',
        function(evt, toState, toParams, fromState, fromParams) {
          if (toState.name === "deliveries.nearMe.details" &&
              fromState.name === "deliveries.nearMe"){
            $scope.storeDetails = $scope.getStoreDetails(toParams.storeId);
            //promise from SearchResultsCtrl
            $scope.storeDetails
              .then(function(result){
                $scope.storeDetails = result.data;
              }, function(error){
                console.log(error);
//        //TODO error handling
              });


          }
        });

      $scope.deliveryCharge = function(merchant) {
        if ($scope.deliveryMax === undefined)
          return true;
        return merchant.ordering.delivery_charge <= $scope.deliveryMax
      };

      $scope.orderMax = function(merchant) {
        if ($scope.minOrderMax === undefined || $scope.minOrderMax.trim() === "")
          return true;
        return merchant.ordering.minimum <= $scope.minOrderMax
      };

      $scope.setStoreSearchResultIndex = function (index) {
        $scope.searchResultIndex = index;
      };

      $scope.getStoreDetails = function(storeId){
        return $deliveryDataService.getStoreDetails(storeId)
      }

    }
  ]);