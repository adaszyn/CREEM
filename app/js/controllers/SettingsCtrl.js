/**
 * @function
 * @name SettingsCtrl
 * @class CREEMapp.SettingsCtrl
 * @requires $scope, CreemSettings, ngDialog, ngTableParams
 */
CREEMapp.controller("SettingsCtrl", ['$scope', '$http', 'CreemSettings', 'ngDialog', 'ngTableParams', 'RESTaddress', '$filter', function ($scope, $http, CreemSettings, ngDialog, ngTableParams, RESTaddress, $filter) {
    $scope.buildings = CreemSettings.buildings;
    $scope.provinces = CreemSettings.provinces;
    $scope.clusters = CreemSettings.clusters;
    $scope.buildingsConsumption = CreemSettings.buildingsConsumption;
    $scope.dateRange = CreemSettings.dateRange;

    $http.get(RESTaddress + "immobili/", { cached: true })
        .then(function (response) {
            if (response.status !== 200) {
                return;
            }
            else {
                $scope.buildings.available = response.data;
            }
        });

    /**
     * @function
     * @name changeSelection
     * @memberOf CREEMapp.SettingsCtrl
     * @description Selecting/Unselecting a building
     * @param building
     */
    $scope.changeBuildingsSelection = function (building) {
        var idx = $scope.buildings.selected.indexOf(building);
        if (idx > -1) {
            $scope.buildings.selected.splice(idx, 1);
        }
        else {
            $scope.buildings.selected.push(building);
        }
    };
    /**
     * @function
     * @name changeBuildingConsumptions
     * @memberOf CREEMapp.SettingsCtrl
     * @description Selecting/Unselecting a building consumption
     * @param building
     */
    $scope.changeBuildingConsumptionSelection = function (building) {
        var idx = $scope.buildingsConsumption.selected.indexOf(building);
        if (idx > -1) {
            $scope.buildingsConsumption.selected.splice(idx, 1);
        }
        else {
            $scope.buildingsConsumption.selected.push(building);
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
            var orderedData = params.filter() ? $filter('filter')($scope.buildings.available, params.filter()) : $scope.buildings.available;
            orderedData = params.sorting() ? $filter('orderBy')(orderedData, params.orderBy()) : orderedData;
            $scope.listedBuildings = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
            params.total(orderedData.length);
            $defer.resolve($scope.listedBuildings);

        }
    });
    /**
     * @function
     * @name selectBuildings
     * @memberOf CREEMapp.SettingsCtrl
     * @description Loading buildingSelect.html for selection of buildings
     */
    $scope.selectBuildings = function () {
        ngDialog.open({
            template: 'js/partials/modals/buildingSelect.html',
            className: 'ngdialog-theme-default'
        });
    };
    /**
     * @function
     * @name removeBuilding
     * @memberOf CREEMapp.SettingsCtrl
     * @description Removing building from the selectedBuildings
     */
    $scope.removeBuilding = function (building) {
        var idx = $scope.buildings.selected.indexOf(building);
        if (idx >= 0) {
            $scope.buildings.selected.splice(idx, 1);
        }
    };
    /**
     * @function
     * @name selectBuildingConsumptions
     * @memberOf CREEMapp.SettingsCtrl
     * @description Loading buildingConsumptionSelect.html for selection of building consumptions
     */
    $scope.selectBuildingConsumptions = function () {
        ngDialog.open({
            template: 'js/partials/modals/buildingConsumptionSelect.html',
            className: 'ngdialog-theme-default'
        });
    };
    /**
     * @function
     * @name removeBuildingConsumptions
     * @memberOf CREEMapp.SettingsCtrl
     * @description Removing building from the selectedBuildingConsumptions
     */
    $scope.removeBuildingConsumption = function (building) {
        var idx = $scope.selectedBuildingConsumptions.indexOf(building);
        if (idx >= 0) {
            $scope.selectedBuildingConsumptions.splice(idx, 1);
        }
    };

    /**
     * @function
     * @name showDates
     * @memberOf CREEMapp.SettingsCtrl
     * @description Loading dataSelect.html for selection of provinces
     */
    $scope.showDateRangeModal = function () {
        ngDialog.open({
            template: 'js/partials/modals/dateSelect.html',
            className: 'ngdialog-theme-creem'
        });
    };

    $scope.dateRangeConfig = {
        fromOpened: false,
        toOpened: false,
        dateOptions: {
            formatYear: 'yy',
            startingDay: 1
        },
        alerts: [

        ]
    };
    $scope.mindate = new Date();

}]);