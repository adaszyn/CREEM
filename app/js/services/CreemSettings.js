CREEMapp.factory("CreemSettings", ['$rootScope', function ($rootScope) {
    var settingsModel = {
      buildings: {
          displayed: 0,
          selected: []
      },
      provinces: {
          displayed: 0,
          available: [
              {name:'AG', checked:false}, {name:'CL', checked:false},
              {name:'CT', checked:false}, {name:'EN', checked:false},
              {name:'ME', checked:false}, {name:'PA', checked:false},
              {name:'RG', checked:false}, {name:'SR', checked:false},
              {name:'TP', checked:false}
          ]
      },
      clusters: {
          displayed: 0,
          available: [
              {name:'LAYOUT', checked:false}, {name:'TRADIZIONALE', checked:false},
              {name:'ITALPOSTE', checked:false}, {name:'IND', checked:false},
              {name:'DIR', checked:false}, {name:'CMP', checked:false},
              {name:'ALTRO', checked:false}, {name:'DIRUP', checked:false}
          ]
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