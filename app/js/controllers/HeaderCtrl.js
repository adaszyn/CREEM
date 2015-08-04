CREEMapp.controller("HeaderCtrl", ['$scope', 'ngDialog', 'RESTaddress', '$http', 'ngTableParams', '$filter', function($scope, ngDialog, RESTaddress, $http, ngTableParams, $filter){
    var buildings = [];
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

    //==========================================================================================
    $scope.clusters = [
        'LAYOUT', 'TRADIZIONALE', 'ITALPOSTE', 'IND',
        'DIR', 'CMP', 'ALTRO', 'DIRUP'
    ];
    $scope.selectedCluster = {
        temp: undefined,
        current: undefined
    };

    $scope.cancelClusterSelect= function () {
        $scope.selectedCluster.temp = undefined;
        ngDialog.closeAll();
    };
    $scope.submitClusterSelect = function () {
        $scope.selectedCluster.current = $scope.selectedCluster.temp;
        ngDialog.closeAll();
    };
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

    $scope.cancelProvinceSelect= function () {
        $scope.selectedProvince.temp = undefined;
        ngDialog.closeAll();
    };
    $scope.submitProvinceSelect = function () {
        $scope.selectedProvince.current = $scope.selectedProvince.temp;
        ngDialog.closeAll();
    };
    $scope.showProvinces = function () {
        ngDialog.open({
            template: 'js/partials/modals/provinceSelect.html',
            className: 'ngdialog-theme-default'
        });
    }

    //==========================================================================================

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
    $scope.events =
        [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];
}]);