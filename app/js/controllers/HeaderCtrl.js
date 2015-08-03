CREEMapp.controller("HeaderCtrl", ['$scope', 'ngDialog', 'RESTaddress', '$http', 'ngTableParams', '$filter','CreemSettings', function($scope, ngDialog, RESTaddress, $http, ngTableParams, $filter, CreemSettings){
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
            if (!isCached) {
                $http.get(RESTaddress + "immobili/")
                    .then(function (response) {
                        isCached = true;
                        buildings = response.data;
                        var orderedData = params.filter() ? $filter('filter')(buildings, params.filter()) : buildings;
                        $scope.buildings = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        params.total(orderedData.length);
                        $defer.resolve($scope.buildings);
                    });
            }
            else {
                var orderedData = params.filter() ? $filter('filter')(buildings, params.filter()) : buildings;
                orderedData = params.sorting() ? $filter('orderBy')(orderedData, params.orderBy()) : orderedData;
                $scope.buildings = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length);
                $defer.resolve($scope.buildings);
            }

        }
    });
    $scope.cancelBuildingSelect= function () {
        $scope.selectedBuilding.temp = undefined;
        ngDialog.closeAll();
    };
    $scope.submitBuildingSelect = function () {
        $scope.selectedBuilding.current = $scope.selectedBuilding.temp;
        ngDialog.closeAll();
    };
    $scope.showBuildings = function () {
        ngDialog.open({
            template: 'js/partials/modals/buildingSelect.html',
            className: 'ngdialog-theme-default'
        });
    };
}]);