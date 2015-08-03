CREEMapp.controller("SettingsCtrl", ['$scope', 'CreemSettings', function ($scope, CreemSettings) {
    $scope.$on('settingsUpdate', function(){
        $scope.buildings = CreemSettings.getBuildings();
        $scope.provinces = CreemSettings.getProvinces();
        $scope.clusters = CreemSettings.getClusters();
        $scope.dateRange= CreemSettings.getDateRange();
        $scope.buildingsConsumption = CreemSettings.getBuildingsConsumption().quantity;
    });
}]);