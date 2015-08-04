CREEMapp.factory("CreemSettings", ['$rootScope', function ($rootScope) {
    var settingsModel = {
      buildings: {
          displayed: 0
      },
      provinces: {
          displayed: 0,
          selected: []
      },
      clusters: {
          displayed: 0,
          selected: []
      },
      buildingsConsumption: {
          displayed: 0,
          selected: []
      },
      dateRange: {
          visible: false,
          from: undefined,
          to: undefined
      }
    };
    var settingsController = {
          setSettingsMenu : function (conf) {
              settingsModel.buildings.displayed = conf.buildings | 0;
              settingsModel.provinces.displayed= conf.provinces | 0;
              settingsModel.clusters.displayed = conf.clusters | 0;
              settingsModel.buildingsConsumption.displayed = conf.buildingsConsumption | 0;
              if (conf.dateRange !== undefined) {
                  settingsModel.dateRange.from = conf.dateRange.from;
                  settingsModel.dateRange.to= conf.dateRange.to;
                  settingsModel.dateRange.visible = true;
              }
              $rootScope.$broadcast('settingsUpdate');
          },
         getBuildings: function () { return settingsModel.buildings; },
         getProvinces: function () { return settingsModel.provinces; },
         getClusters: function () { return settingsModel.clusters; },
         getBuildingsConsumption: function () { return settingsModel.buildingsConsumption; },
         getDateRange: function () { return settingsModel.dateRange; }
    };
    return settingsController;
}]);