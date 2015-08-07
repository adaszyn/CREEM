CREEMapp.controller("FormCtrl", ['$scope','CreemSettings','$http', function ($scope, CreemSettings, $http) {
    CreemSettings.setSettingsMenu({
        buildings: 1
    });
    $http.get('http://127.0.0.1:8080/epi?filterBy=POD&filterParams=IT001E00006682')
        .then(function (response) {
            if (response.status === 200) {
                $scope.data = response.data;
            }
        })
}]);