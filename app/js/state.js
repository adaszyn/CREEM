CREEMapp.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/global_view");
    //
    // Now set up the states
    $stateProvider
        .state('globalView', {
            url: "/global_view",
            templateUrl: "js/partials/views/globalView/main.html"
        })
        .state('globalView.map', {
            url: "/map",
            templateUrl: "js/partials/views/globalView/map.html"
        })
        .state('buildingData', {
            url: "/building_data",
            templateUrl: "js/partials/views/buildingData.html"
        })
        .state('consumptionAnalysis', {
            url: "/consumptio_analysis",
            templateUrl: "js/partials/views/consumptionAnalysis.html"
        })
        .state('diagnosis', {
            url: "/diagnosis",
            templateUrl: "js/partials/views/diagnosis.html"
        })
        .state('optimizer', {
            url: "/optimizer",
            templateUrl: "js/partials/views/optimizer.html"
        })
        .state('budget', {
            url: "/budget",
            templateUrl: "js/partials/views/budget.html"
        })

});