/**
 * @function
 * @name HistoricalConsumptionCtrl
 * @class CREEMapp.HistoricalConsumptionCtrl
 * @requires $scope, CreemSettings
 */
CREEMapp.controller("HistoricalConsumptionCtrl", ['$scope','CreemSettings', '$http', function ($scope, CreemSettings, $http) {
    CreemSettings.setSettingsMenu({
        buildings: 1
    });

    var chart;
    $scope.buildings = CreemSettings.buildings.selected;

    $scope.createChart = function() {
        chart = AmCharts.makeChart("chartdiv", {
            type: "stock",
            "theme": "light",
            pathToImages: "http://www.amcharts.com/lib/3/images/",
            categoryAxesSettings: {
                minPeriod: "60mm",
                maxSeries: 168,
                dateFormats: [{period: 'fff', format: 'JJ:NN:SS'},
                    {period: 'ss', format: 'JJ:NN:SS'},
                    {period: 'mm', format: 'JJ:NN'},
                    {period: 'hh', format: 'JJ:NN'},
                    {period: 'DD', format: 'EEE, MMM DD'},
                    {period: 'WW', format: 'MMM DD'},
                    {period: 'MM', format: 'MMM'},
                    {period: 'YYYY', format: 'YYYY'}]
            },
            panels: [{
                showCategoryAxis: false,
                title: "Consumo Cumulativo Energia (kWh)",
                percentHeight: 20,

                stockGraphs: [{
                    id: "g1",
                    valueField: "value",
                    type: "smoothedLine",
                    lineThickness: 2,
                    comparable: true,
                    compareField: "value",
                    balloonText: "[[title]]:<b>[[value]]</b>",
                    compareGraphBalloonText: "[[title]]:<b>[[value]]</b>"
                }],
                stockLegend: {
                    valueTextRegular: " ",
                    markerType: "none",
                    periodValueTextComparing: "[[percents.value.close]]%",
                    periodValueTextRegular: "[[value.close]]"
                }
            }, {
                    title: "Consumo Orario (kWh)",
                    percentHeight: 80,
                    stockGraphs: [{
                        valueField: "volume",
                        type: "column",
                        cornerRadiusTop: 2,
                        fillAlphas: 1,
                        comparable: true,
                        compareField: "volume",
                        balloonText: "[[title]]:<b>[[volume]]</b>",
                        compareGraphBalloonText: "[[title]]:<b>[[volume]]</b>"
                    }],

                    stockLegend: {
                        valueTextRegular: " ",
                        markerType: "none",
                        periodValueTextComparing: "[[percents.volume.close]]%",
                        periodValueTextRegular: "[[volume.close]]"
                    }
                }
            ],
            periodSelector: {
                position: "left",
                periods: [ {
                    period: "MM",
                    selected: true,
                    count: 1,
                    label: "1 month"
                }, {
                    period: "YYYY",
                    count: 1,
                    label: "1 year"
                }, {
                    period: "YTD",
                    label: "YTD"
                }, {
                    period: "MAX",
                    label: "MAX"
                } ]
            },
            dataSetSelector: {
                position: "left"
            },
            chartScrollbarSettings: {
                graph: "g1",
                usePeriod: "60mm",
                position: "bottom"
            },
            chartCursorSettings: {
                valueBalloonsEnabled: true
            },
            panelsSettings: {
                usePrefixes: true
            },
            "titles": [
                {
                    "id": "Title-1",
                    "size": 15,
                    "text": "Profilo Consumo Medio Giornaliero (Turno Lavorativo)"
                }],
            "export": {
                "enabled": true,
                "libs": {
                    "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                }
            }
        });
        for (var i=0;i<$scope.chartData.length;i++) {
            chart.dataSets.push({
                title: "Data set "+(i+1),
                fieldMappings: [ {
                    fromField: "value",
                    toField: "value"
                },{
                    fromField: "volume",
                    toField: "volume"
                } ],
                dataProvider: $scope.chartData[i],
                categoryField: "date"
            })
        }
        chart.validateNow();
    }

    $scope.updateData = function (response) {
        var tot = 0;
        var chartData = [];
        for (var i = 0; i < response.length; i++) {
            var consumi = [response[i]['01_am'], response[i]['02_am'], response[i]['03_am'], response[i]['04_am'], response[i]['05_am'], response[i]['06_am'],
                response[i]['07_am'], response[i]['08_am'], response[i]['09_am'], response[i]['10_am'], response[i]['11_am'], response[i]['12_pm'],
                response[i]['01_pm'], response[i]['02_pm'], response[i]['03_pm'], response[i]['04_pm'], response[i]['05_pm'], response[i]['06_pm'],
                response[i]['07_pm'], response[i]['08_pm'], response[i]['09_pm'], response[i]['10_pm'], response[i]['11_pm'], response[i]['12_am']];
            for (var j = 0; j < 24; j++) {
                var newDate = new Date(response[i]['data']);
                newDate.setDate(newDate.getDate());
                newDate.setHours(j, 0, 0, 1);
                tot = tot + consumi[j];
                var b = tot;

                chartData.push({
                    date: newDate,
                    value: b,
                    volume: consumi[j]
                });

            }
        }
        return chartData;
    };

    $scope.getChartData = function () {
        if ($scope.buildings[0] === undefined) return;
        $scope.chartData = [];
        var len = $scope.buildings.length;
        var j=0;
        for (var i=0;i<len;i++) {
            $http.get("http://localhost:8080/multiorarie?filterBy=POD&filterParams=" + $scope.buildings[i].pod)
                .then(function (response) {
                    if (response.status != 200) return;
                    $scope.chartData.push($scope.updateData(response.data));
                    j++;
                    if (j === len) $scope.createChart();
                })
        }
    };

    $scope.submit = function() {
        $scope.getChartData();
    }

    $scope.getChartData();
}]);