/**
 * @function
 * @name SettingsCtrl
 * @class CREEMapp.SettingsCtrl
 * @requires $scope, CreemSettings, ngDialog, ngTableParams
 */
CREEMapp.controller("SettingsCtrl", ['$scope', '$http', 'CreemSettings', 'ngDialog', 'ngTableParams', 'RESTaddress', '$filter', function ($scope, $http, CreemSettings, ngDialog, ngTableParams, RESTaddress, $filter) {
    var allBuildings = [];
    $scope.config = {
        buildings: CreemSettings.getBuildings(),
    };
    $scope.$on('settingsUpdate', function() {
        $scope.provinces = CreemSettings.getProvinces();
        $scope.clusters = CreemSettings.getClusters();
        $scope.dateRange= CreemSettings.getDateRange();
        $scope.buildingsConsumption = CreemSettings.getBuildingsConsumption();
    });

    $http.get(RESTaddress + "immobili/", { cached: true })
        .then(function (response) {
            if (response.status !== 200) {
                return;
            }
            else {
                allBuildings = response.data;
            }
        });
    /**
     * @field
     * @name tableParams
     * @memberOf CREEMapp.SettingsCtrl
     * @description Contains parameters for ngTableDirective
     */
    $scope.selectedBuildings = [];

    $scope.changeSelection = function (building) {
        var idx = $scope.selectedBuildings.indexOf(building);
        if (idx > -1) {
            $scope.selectedBuildings.splice(idx, 1);
        }
        else {
            $scope.selectedBuildings.push(building);
        }
    };

    $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10,
        filter: {
        }
    }, {
        total: 10,
        getData: function($defer, params) {
            var orderedData = params.filter() ? $filter('filter')(allBuildings, params.filter()) : allBuildings;
            orderedData = params.sorting() ? $filter('orderBy')(orderedData, params.orderBy()) : orderedData;
            $scope.availableBuildings = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
            params.total(orderedData.length);
            $defer.resolve($scope.availableBuildings);

        }
    });
    $scope.selectBuildings = function () {
        ngDialog.open({
            template: 'js/partials/modals/buildingSelect.html',
            className: 'ngdialog-theme-default'
        });
    };
    $scope.removeBuilding = function (building) {
        var idx = $scope.selectedBuildings.indexOf(building);
        if (idx >= 0) {
            $scope.selectedBuildings.splice(idx, 1);
        }
    }
}]);