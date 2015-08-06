CREEMapp.directive("settingsDirective",['$rootScope','CreemSettings', function ($rootScope, CreemSettings) {
    return {
       restrict: 'A',
       templateUrl: "js/partials/directives/settings.html",
       controller: 'SettingsCtrl'
    }
}]);