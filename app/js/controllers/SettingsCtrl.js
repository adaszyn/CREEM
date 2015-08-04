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
        $scope.buildings = CreemSettings.getBuildings();
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
    /**
     * @function
     * @name checkElement
     * @memberOf CREEMapp.SettingsCtrl
     * @description Changes the selection of element
     * @param element
     */
    $scope.checkElement = function (element) {
        if (element.checked) {
            element.checked = false;
        }
        else {
            element.checked = true;
        }
    };
    /**
     * @function
     * @name isChecked
     * @memberOf CREEMapp.SettingsCtrl
     * @description return true if element is checked
     * @param selected
     * @returns bool
     */
    $scope.isChecked = function (selected) {
        return selected.checked;
    }
    /**
     * @function
     * @name showBuildings
     * @memberOf CREEMapp.SettingsCtrl
     * @description Loading buildingSelect.html for selection of buildings
     */
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
    };

    /**
     * @function
     * @name showDates
     * @memberOf CREEMapp.SettingsCtrl
     * @description Loading dataSelect.html for selection of provinces
     */
    $scope.showDates = function () {
        ngDialog.open({
            template: 'js/partials/modals/dataSelect.html',
            className: 'ngdialog-theme-default'
        });
    }

    $scope.today = function() {
        $scope.dateFrom = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };
    $scope.open = function($event) {
        $scope.opened = true;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);

    $scope.events = [{
        date: tomorrow,
        status: 'full'
    }, {
        date: afterTomorrow,
        status: 'partially'
    }];
}]);