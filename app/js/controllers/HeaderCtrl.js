CREEMapp.controller("HeaderCtrl", ['$scope', 'ngDialog', function($scope, ngDialog){
    $scope.showBuildings = function () {
        ngDialog.open({
            template: 'js/partials/modals/buildingSelect.html',
            className: 'ngdialog-theme-default',
        });
    }
}]);