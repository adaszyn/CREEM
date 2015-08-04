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
    /**
     * @function
     * @name cancelSelect
     * @memberOf CREEMapp.HeaderCtrl
     * @description Cancels selected element and closes dialog.
     * @param selected
     */
    $scope.cancelSelect= function (selected) {
        selected.temp = undefined;
        ngDialog.closeAll();
    };
    /**
     * @function
     * @name submitSelect
     * @memberOf CREEMapp.HeaderCtrl
     * @description Submits selected element and closes dialog.
     * @param selected
     */
    $scope.submitSelect = function (selected) {
        selected.current = selected.temp;
        ngDialog.closeAll();
    };
    /**
     * @function
     * @name showBuildings
     * @memberOf CREEMapp.HeaderCtrl
     * @description Loading buildingSelect.html for selection of buildings
     */
    $scope.showBuildings = function () {
        ngDialog.open({
            template: 'js/partials/modals/buildingSelect.html',
            className: 'ngdialog-theme-default'
        });
    };

    //==========================================================================================
    $scope.clusters = [
        'LAYOUT', 'TRADIZIONALE', 'ITALPOSTE', 'IND',
        'DIR', 'CMP', 'ALTRO', 'DIRUP'
    ];
    $scope.selectedCluster = {
        temp: undefined,
        current: undefined
    };
    /**
     * @function
     * @name showClusters
     * @memberOf CREEMapp.HeaderCtrl
     * @description Loading clusterSelect.html for selection of clusters
     */
    $scope.showClusters = function () {
        ngDialog.open({
            template: 'js/partials/modals/clusterSelect.html',
            className: 'ngdialog-theme-default'
        });
    };

    //==========================================================================================

    $scope.provinces = [
        'AG', 'CL', 'CT', 'EN',
        'ME', 'PA', 'RG', 'SR', 'TP'
    ];
    $scope.selectedProvince = {
        temp: undefined,
        current: undefined
    };
    /**
     * @function
     * @name showProvinces
     * @memberOf CREEMapp.HeaderCtrl
     * @description Loading provinceSelect.html for selection of provinces
     */
    $scope.showProvinces = function () {
        ngDialog.open({
            template: 'js/partials/modals/provinceSelect.html',
            className: 'ngdialog-theme-default'
        });
    }

    //==========================================================================================

    /**
     * @function
     * @name showDates
     * @memberOf CREEMapp.HeaderCtrl
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
            }
        ];
}]);