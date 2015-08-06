/**
 * @function
 * @name HeaderCtrl
 * @class CREEMapp.HeaderCtrl
 * @requires scope, ngDialog, RESTaddress, $http, ngTableParams, $filter
 */
CREEMapp.controller("HeaderCtrl", ['$scope', 'ngDialog', 'RESTaddress', '$http', 'ngTableParams', '$filter', function($scope, ngDialog, RESTaddress, $http, ngTableParams, $filter){
    var buildings = [],
        isCached = false;
    $scope.selectedBuilding = {
        temp: undefined,
        current: undefined
    };

    $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10,
        filter: {
        }
    }, {
        total: 10,
        getData: function($defer, params) {
            $http.get(RESTaddress + "immobili/", { cache: true})
                .then(function (response) {
                    buildings = response.data;
                    var orderedData = params.filter() ? $filter('filter')(buildings, params.filter()) : buildings;
                    orderedData = params.sorting() ? $filter('orderBy')(orderedData, params.orderBy()) : orderedData;
                    $scope.buildings = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(orderedData.length);
                    $defer.resolve($scope.buildings);
                });
        }
    });


}]);