CREEMapp.factory("CreemSettings", ['$rootScope', function ($rootScope) {
    var settingsObject;
    settingsObject = {
        buildings: {
            displayed: 0,
            selected: [],
            available: []
        },
        provinces: {
            displayed: 0,
            available: [
                {name: 'AG', checked: false}, {name: 'CL', checked: false},
                {name: 'CT', checked: false}, {name: 'EN', checked: false},
                {name: 'ME', checked: false}, {name: 'PA', checked: false},
                {name: 'RG', checked: false}, {name: 'SR', checked: false},
                {name: 'TP', checked: false}
            ]
        },
        clusters: {
            displayed: 0,
            available: [
                {name: 'LAYOUT', checked: false}, {name: 'TRADIZIONALE', checked: false},
                {name: 'ITALPOSTE', checked: false}, {name: 'IND', checked: false},
                {name: 'DIR', checked: false}, {name: 'CMP', checked: false},
                {name: 'ALTRO', checked: false}, {name: 'DIRUP', checked: false}
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
        },
        setSettingsMenu: function (conf) {
            this.buildings.displayed = conf.buildings | 0;
            this.provinces.displayed = conf.provinces | 0;
            this.clusters.displayed = conf.clusters | 0;
            this.buildingsConsumption.displayed = conf.buildingsConsumption | 0;
            if (conf.dateRange !== undefined) {
                this.dateRange.from = conf.dateRange.from;
                this.dateRange.to = conf.dateRange.to;
                this.dateRange.visible = true;
            }
            $rootScope.$broadcast('settingsUpdate');
        }
    };
    return settingsObject;
}]);