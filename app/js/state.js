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
                templateUrl: "js/partials/views/globalView/map.html",
                controller: 'MapCtrl'
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
            .state('buildingData.mattSurfaces', {
                url: "/matt_surfaces",
                templateUrl: "js/partials/views/buildingData/mattSurfaces.html"
            })
            .state('buildingData.transparentComponents', {
                url: "/transparent_components",
                templateUrl: "js/partials/views/buildingData/transparentComponents.html"
            })
        .state('consumptionAnalysis', {
            url: "/consumption_analysis",
            templateUrl: "js/partials/views/consumptionAnalysis/main.html"
        })
            .state('consumptionAnalysis.dataFromField', {
                url: "/data_from_field",
                templateUrl: "js/partials/views/consumptionAnalysis/dataFromField.html"
            })
            .state('consumptionAnalysis.importConsumption', {
                url: "/import_consumption",
                templateUrl: "js/partials/views/consumptionAnalysis/importConsumption.html"
            })
            .state('consumptionAnalysis.dailyProfile', {
                url: "/daily_profile",
                templateUrl: "js/partials/views/consumptionAnalysis/dailyProfile.html"
            })
            .state('consumptionAnalysis.weeklyProfile', {
                url: "/weekly_profile",
                templateUrl: "js/partials/views/consumptionAnalysis/weeklyProfile.html"
            })
            .state('consumptionAnalysis.historicalConsumption', {
                url: "/historical_consumption",
                templateUrl: "js/partials/views/consumptionAnalysis/historicalConsumption.html"
            })
        .state('diagnosis', {
            url: "/diagnosis",
            templateUrl: "js/partials/views/diagnosis/main.html"
        })
            .state('diagnosis.energyPerformance', {
                url: "/energy_performance",
                templateUrl: "js/partials/views/diagnosis/energyPerformance.html"
            })
        .state('budget', {
            url: "/budget",
            templateUrl: "js/partials/views/budget/main.html"
        })
            .state('budget.consumptionPrediction', {
                url: "/consumption_prediction",
                templateUrl: "js/partials/views/budget/consumptionPrediction.html"
            })
            .state('budget.lastYear', {
                url: "/last_year",
                templateUrl: "js/partials/views/budget/lastYear.html"
            })
            .state('budget.globalData', {
                url: "/global_data",
                templateUrl: "js/partials/views/budget/globalData.html"
            })
            .state('budget.importBudget', {
                url: "/import_budget",
                templateUrl: "js/partials/views/budget/importBudget.html"
            })
            .state('budget.importAccountings', {
                url: "/import_accountings",
                templateUrl: "js/partials/views/budget/importAccountings.html"
            })
        .state('optimizer', {
            url: "/optimizer",
            templateUrl: "js/partials/views/optimizer/main.html"
        })

});