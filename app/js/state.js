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
            .state('globalView.properties', {
                url: "/properties",
                templateUrl: "js/partials/views/globalView/properties.html"
            })
            .state('globalView.weather', {
                url: "/weather",
                templateUrl: "js/partials/views/globalView/weather.html"
            })
        .state('buildingData', {
            url: "/building_data",
            templateUrl: "js/partials/views/buildingData/main.html"
        })
            .state('buildingData.registry', {
                url: "/registry",
                templateUrl: "js/partials/views/buildingData/registry.html"
            })
            .state('buildingData.propertyPolicies', {
                url: "/property_policies",
                templateUrl: "js/partials/views/buildingData/propertyPolicies.html"
            })
            .state('buildingData.thermoData', {
                url: "/thermo_data",
                templateUrl: "js/partials/views/buildingData/thermoData.html"
            })
            .state('buildingData.cooling', {
                url: "/cooling",
                templateUrl: "js/partials/views/buildingData/cooling.html"
            })
            .state('buildingData.heating', {
                url: "/heating",
                templateUrl: "js/partials/views/buildingData/heating.html"
            })
            .state('buildingData.legalLimits', {
                url: "/legal_limits",
                templateUrl: "js/partials/views/buildingData/legalLimits.html"
            })
            .state('buildingData.transparentComponents', {
                url: "/transparent_components",
                templateUrl: "js/partials/views/buildingData/transparentComponents.html"
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