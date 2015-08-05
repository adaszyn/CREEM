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

    $scope.buildings = CreemSettings.buildings.selected;

    var chart;

    $scope.createChart = function() {
        chart = AmCharts.makeChart( "chartdiv", {
            type: "stock",
            "theme": "light",

            dataSets: [ {
                title: "first data set",
                fieldMappings: [ {
                    fromField: "value",
                    toField: "value"
                }, {
                    fromField: "volume",
                    toField: "volume"
                } ],
                dataProvider: $scope.chartData,
                categoryField: "date"
            },

                {
                    title: "second data set",
                    fieldMappings: [ {
                        fromField: "value",
                        toField: "value"
                    }, {
                        fromField: "volume",
                        toField: "volume"
                    } ],
                    dataProvider: $scope.chartData,
                    categoryField: "date"
                },

                {
                    title: "third data set",
                    fieldMappings: [ {
                        fromField: "value",
                        toField: "value"
                    }, {
                        fromField: "volume",
                        toField: "volume"
                    } ],
                    dataProvider: $scope.chartData,
                    categoryField: "date"
                },

                {
                    title: "fourth data set",
                    fieldMappings: [ {
                        fromField: "value",
                        toField: "value"
                    }, {
                        fromField: "volume",
                        toField: "volume"
                    } ],
                    dataProvider: $scope.chartData,
                    categoryField: "date"
                }
            ],

            panels: [ {

                showCategoryAxis: false,
                title: "Value",
                percentHeight: 70,

                stockGraphs: [ {
                    id: "g1",

                    valueField: "value",
                    comparable: true,
                    compareField: "value",
                    balloonText: "[[title]]:<b>[[value]]</b>",
                    compareGraphBalloonText: "[[title]]:<b>[[value]]</b>"
                } ],

                stockLegend: {
                    periodValueTextComparing: "[[percents.value.close]]%",
                    periodValueTextRegular: "[[value.close]]"
                }
            },

                {
                    title: "Volume",
                    percentHeight: 30,
                    stockGraphs: [ {
                        valueField: "volume",
                        type: "column",
                        showBalloon: false,
                        fillAlphas: 1
                    } ],


                    stockLegend: {
                        periodValueTextRegular: "[[value.close]]"
                    }
                }
            ],

            chartScrollbarSettings: {
                graph: "g1"
            },

            chartCursorSettings: {
                valueBalloonsEnabled: true,
                fullWidth: true,
                cursorAlpha: 0.1,
                valueLineBalloonEnabled: true,
                valueLineEnabled: true,
                valueLineAlpha: 0.5
            },

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
            "export": {
                "enabled": true
            }
        } );
    };

    $scope.updateData = function (response) {
        var tot = 0;
        var chartData = [];
        for (var i = 0; i < response.length; i++) {
            var consumi = [response[i]['01_am'], response[i]['02_am'], response[i]['03_am'], response[i]['04_am'], response[i]['05_am'], response[i]['06_am'],
                response[i]['07_am'], response[i]['08_am'], response[i]['09_am'], response[i]['10_am'], response[i]['11_am'], response[i]['12_pm'],
                response[i]['01_pm'], response[i]['02_pm'], response[i]['03_pm'], response[i]['04_pm'], response[i]['05_pm'], response[i]['06_pm'],
                response[i]['07_pm'], response[i]['08_pm'], response[i]['09_pm'], response[i]['10_pm'], response[i]['11_pm'], response[i]['12_am']];
            for (var j = 0; j < 24; j++) {
                var newDate = new Date(response[j]['data']);
                newDate.setDate(newDate.getDate() + i);
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
                    console.log($scope.chartData);
                    if (j === len) $scope.createChart();
                })
        }
    };

    $scope.getChartData();
}]);