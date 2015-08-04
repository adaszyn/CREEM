/**
 * @function
 * @name SettingsCtrl
 * @class CREEMapp.SettingsCtrl
 * @requires $scope, CreemSettings, ngDialog, ngTableParams
 */
CREEMapp.controller("SettingsCtrl", ['$scope', '$http', 'CreemSettings', 'ngDialog', 'ngTableParams', 'RESTaddress', '$filter', function ($scope, $http, CreemSettings, ngDialog, ngTableParams, RESTaddress, $filter) {
    $scope.$on('settingsUpdate', function() {
        $scope.buildings = CreemSettings.getBuildings();
        $scope.provinces = CreemSettings.getProvinces();
        $scope.clusters = CreemSettings.getClusters();
        $scope.dateRange= CreemSettings.getDateRange();
        $scope.buildingsConsumption = CreemSettings.getBuildingsConsumption();
    });
    /**
     * @field
     * @name tableParams
     * @memberOf CREEMapp.SettingsCtrl
     * @description Contains parameters for ngTableDirective
     */
    $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10,
        filter: {
        }
    }, {
        total: 10,
        getData: function($defer, params) {
            $http.get(RESTaddress + "immobili/", { cached: true })
                .then(function (response) {
                    if ( response.status !== 200 ) {
                        $defer.reject([]);
                        return;
                    }
                    buildings = response.data;
                    var orderedData = params.filter() ? $filter('filter')(buildings, params.filter()) : buildings;
                    $scope.buildings = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(orderedData.length);
                    $defer.resolve($scope.buildings);
                });

        }
    });
    $scope.selectBuildings = function () {
        ngDialog.open({
            template: 'js/partials/modals/buildingSelect.html',
            className: 'ngdialog-theme-default'
        });
    }
}]);