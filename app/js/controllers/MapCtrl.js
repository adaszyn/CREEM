CREEMapp.controller("MapCtrl", ['$scope','CreemSettings', function ($scope, CreemSettings) {
    CreemSettings.setSettingsMenu({
        buildings: 5,
        provinces: 120,
        clusters: 1
    });
}]);