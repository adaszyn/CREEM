/**
 * Created by wojtek on 7/30/15.
 * @name OptimizerController
 * @class CREEMapp.OptimizerController
 * @requires $scope, $http
 * @description Controller for the optimizer view.
 */
CREEMapp.controller("OptimizerCtrl", ['$scope', '$http', function($scope, $http) {
    $scope.buildingData = [];

    var chart = AmCharts.makeChart("chartdiv", {
        type: "xy",
        theme: "light",
        marginRight: 20,
        marginTop: 17,
        dataProvider: $scope.buildingData,
        pathToImages: "http://www.amcharts.com/lib/images/",
        valueAxes: [{
            position: "bottom",
            axisAlpha: 0,
            title:"densita energia anno",
            valueFormatString: "#0.#",
            gridThickness: 1,
            tickThickness: 1,
            gridColor: "grey",
            tickColor: "grey",
            lineThickness: 0,
            minimum: -2000
        }, {
            minMaxMultiplier: 1.2,
            axisAlpha: 0,
            position: "left",
            title: "energia totale anno",
            gridThickness: 1,
            tickThickness: 1,
            gridColor: "grey",
            tickColor: "grey",
            lineThickness: 0,
            valueFormatString:"#,##0k,.",
            minimum: -1000000
        }],
        startDuration: 1.5,
        graphs: [{
            balloonText: "POD: <b>[[label]]</b><br> x:<b>[[x]]</b><br> y:<b>[[y]]</b><br>value:<b>[[value]]</b>",
            bullet: "bubble",
            lineAlpha: 0,
            valueField: "value",
            xField: "x",
            yField: "y",
            fillAlphas: 0,
            bulletBorderAlpha: 0.2,
            maxBulletSize: 80

        }],
        marginLeft: 86,
        marginBottom: 35,
        chartScrollbar: {},
        chartCursor: {},
        balloon:{
            fixedPosition:true
        },
        export: {
            enabled: true
        }
    });

    $scope.getBuildingChart = function () {
        $http.get("http://localhost:8080/buildings")
            .then(function (response) {
                if (response.status != 200) return;
                response.data.forEach(function (element) {
                    chart.dataProvider.push({
                        x: element.densita_energia_anno,
                        y: element.energia_totale_anno,
                        value: element.potenza_picco,
                        label: element.pod
                    });
                });
                chart.validateData();
            })
    };

    $scope.getBuildingChart();
}]);