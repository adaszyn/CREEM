var chartData = [];
var icon=[];
var singleday = new Date();
var actualDateTo = new Date();
var actualDateFrom = new Date();
var spansec;
var datarows = "";
var nreqs;
var i;
var num_giorni=0;
var timercall;
var url_history="";

function GetDataHistory() {
	i=0;
	nreqs=0;
	var datefrom = document.getElementById("from").value;
	var dateto = document.getElementById("to").value;

	actualDateTo = new Date(dateto); // convert to actual date
	actualDateFrom = new Date(datefrom); // convert to actual date
	num_giorni = Math.ceil((actualDateTo - actualDateFrom) / (1000 * 60 * 60 * 24))+1;
	
	call_wunder();
	timercall = setInterval(function(){call_wunder()}, 7000);
	timerload = setInterval(function(){loading()}, 1000);	
}

function GetGraphWeather() {	
	generateChartData();
}
 
// generate some random data, quite different range
function generateChartData() {
var mode = document.getElementById("period").value;
chartData=[];
icon=[];
switch (mode) {
	case 'today':
		var oggi = new Date();
		
		$.ajax({
			url : "http://api.wunderground.com/api/4266ed5feb628453/hourly/q/IT/" + document.getElementById("localita").value + ".json",
			dataType : "jsonp",
			success : function(parsed_json) {				
						parsed_json['hourly_forecast'].forEach(function(observation, index, parsed_json) {								
							var time = observation['FCTTIME']['mon_padded'] + "-" + observation['FCTTIME']['mday_padded'] 
									+ " " + observation['FCTTIME']['hour'] + ":" + observation['FCTTIME']['min'];
							var tempp = observation['temp']['metric'];
							var humm = observation['humidity'];
							var presss = observation['mslp']['metric'];
							var windd = observation['wspd']['metric'];
							var popp = observation['pop'];
							var m_day = parseInt(observation['FCTTIME']['mday_padded']); 
							var day =  parseInt(oggi.getDate());
							var iconn = observation['icon'];
							if (m_day==day) {
								var reggie = /(\d{2})-(\d{2}) (\d{2}):(\d{2})/;
								
								var dateArray = reggie.exec(time); 
								
								var d = new Date();
								var n = d.getFullYear();
								var newDate = new Date(n, dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], 0, 0);
								
								
							
								chartData.push({
									date: newDate,
									temp: tempp,
									hum: humm,
									press: presss,
									wind: windd,
									pop: popp
								});
								icon.push(iconn);
							}
							
						});
						
						Graph_Daily_history();
			},
			error:function() {
				alert("ERROR!!!");
			}
		});
		break;
	case 'forecast':
		chartData=[];
		$.ajax({
			url : "http://api.wunderground.com/api/4266ed5feb628453/forecast10day/q/IT/"+ document.getElementById("localita").value + ".json",
			dataType : "jsonp",
			success : function(parsed_json) {						
						parsed_json['forecast']['simpleforecast']['forecastday'].forEach(function(observation) {								
							var div = document.getElementById("resultData");
							var temp_highh = observation['high']['celsius'];
							var temp_loww = observation['low']['celsius'];
							var iconn = observation['icon'];
							var icon_urll = observation['icon_url'];
							var popp = observation['pop'];
							var humm = observation['avehumidity'];
							var maxwindd = observation['maxwind']['mph'];
							
							var newDate = new Date(
								(+observation['date']['year']),
								(+observation['date']['month'])-1, // Careful, month starts at 0!
								(+observation['date']['day']),
								(+observation['date']['hour']),
								(+observation['date']['min']),
								0,
								0
							);
							
					
						
							chartData.push({
								date: newDate,
								temp_high: temp_highh,
								temp_low: temp_loww,
								icon: iconn,
								icon_url: icon_urll,
								hum: humm,
								maxwind: maxwindd,
								pop: popp
							});
							icon.push(iconn);
						});
						Graph_Forecast();
					},
			error:function() {
				alert("ERROR!!!");
			}
		});
		break;
	case 'history':
		GetDataHistory();
		break;
}
}

function Graph_Daily_history() {

	var chart = new AmCharts.AmStockChart();
        
	//var chart = new AmCharts.AmStockChart();
     chart.pathToImages = "http://www.amcharts.com/lib/images/";

    // DATASETS //////////////////////////////////////////
    var dataSet1 = new AmCharts.DataSet();
    dataSet1.fieldMappings = [{
		fromField: "hum",
		toField: "hum"
	}, {
		fromField: "wind",
		toField: "wind"
	},
	{
		fromField: "temp",
		toField: "temp"
	},
	{
		fromField: "press",
		toField: "press"
	},
	{
		fromField: "pop",
		toField: "pop"
	}];
    dataSet1.dataProvider = chartData;
    dataSet1.categoryField = "date";
   
    // set data sets to the chart
    chart.dataSets = [dataSet1];

    // PANELS ///////////////////////////////////////////                                                  
    // first stock panel
    var stockPanel1 = new AmCharts.StockPanel();
    stockPanel1.showCategoryAxis = false;
    
    // add value axes
    var valueAxis1 = new AmCharts.ValueAxis();
	valueAxis1.minimum=0;
	valueAxis1.maximum=100;
	valueAxis1.unit="%";
	valueAxis1.fontSize= 9;
    stockPanel1.addValueAxis(valueAxis1);
    
    var valueAxis2 = new AmCharts.ValueAxis();
    valueAxis2.position = "right";
	valueAxis2.minimum=valueAxis2.min;
	valueAxis2.maximum=valueAxis1.max;
	valueAxis2.fontSize= 9;
    stockPanel1.addValueAxis(valueAxis2);

    // graph of first stock panel
    var graph1 = new AmCharts.StockGraph();
    graph1.valueField = "hum";
	graph1.type = "smoothedLine";
	graph1.lineThickness = 2;
	graph1.bullet = "bubble";
	graph1.bulletSize = 5;
	graph1.balloonText = "<span style='font-size:11px;'>[[value]] %</span>";
	graph1.lineColor = "#99FF00";
	graph1.title = "Humidity (%)";
    graph1.useDataSetColors = false;
	graph1.showBalloon = true;
    stockPanel1.addStockGraph(graph1);
			
    // create stock legend                
    stockPanel1.stockLegend = new AmCharts.StockLegend();
	stockPanel1.stockLegend.valueTextRegular= " ";

    var graph2 = new AmCharts.StockGraph();
    graph2.valueField = "press";
    graph2.valueAxis = valueAxis2;
	graph2.type = "smoothedLine";
	graph2.lineThickness = 1;
	graph2.bullet = "triangleUp";
	graph2.title ="Pressure (hPa)";
	graph2.bulletSize = 5;
	graph2.balloonText = "<span style='font-size:11px;'>[[value]] hPa</span>";
	graph2.lineColor = "#999999";
	graph2.bulletBorderThickness = 1;
	graph2.showBalloon = true;
	graph2.useDataSetColors = false;
    stockPanel1.addStockGraph(graph2);
	
	var graph3 = new AmCharts.StockGraph();
    graph3.valueField = "pop";
    graph3.showBalloon = true;
    graph3.fillAlphas = 0.3;
	graph3.lineThickness = 2;
	graph3.type = "smoothedLine";
	graph3.bullet = "square";
	graph3.bulletSize = 5;
	graph3.balloonText = "<span style='font-size:11px;'>[[value]] %</span>";
	graph3.lineColor = "#80F0FF";
	graph3.title = "Chance of rain (%)";
	graph3.useDataSetColors = false;
    stockPanel1.addStockGraph(graph3);


	var stockPanelWind = new AmCharts.StockPanel();
	stockPanelWind.showCategoryAxis = false;
	// add value axes
    var valueAxisWind = new AmCharts.ValueAxis();
	valueAxisWind.unit = "Km/h";
	valueAxisWind.fontSize= 9;
    stockPanelWind.addValueAxis(valueAxisWind);
    
  // graph of first stock panel
    var graphWind = new AmCharts.StockGraph();
    graphWind.title = "Speed wind (Km/h)";
    graphWind.valueField = "wind";
	graphWind.showBalloon = true;
	graphWind.lineThickness = 2;
	graphWind.bullet = "triangleUp";
	graphWind.bulletSize = 3;
	graphWind.balloonText = "<span style='font-size:11px;'>[[value]] Kw/h</span>";
    graphWind.lineColor = "#3010C0";
    graphWind.useDataSetColors = false;
    stockPanelWind.addStockGraph(graphWind);

    // create stock legend                
    stockPanelWind.stockLegend = new AmCharts.StockLegend();
	stockPanelWind.stockLegend.valueTextRegular= " ";
	
	var stockPanelTemp = new AmCharts.StockPanel();
	stockPanelTemp.showCategoryAxis = false;
	// add value axes
    var valueAxisTemp = new AmCharts.ValueAxis();
	valueAxisTemp.unit = " °C";
	valueAxisTemp.fontSize= 9;
    stockPanelTemp.addValueAxis(valueAxisTemp);
    
  // graph of first stock panel
    var graphtemp = new AmCharts.StockGraph();
    graphtemp.title = "Temperature (°C)";
    graphtemp.valueField = "temp";
    graphtemp.lineThickness = 2;
    graphtemp.useDataSetColors = false;
	graphtemp.type = "smoothedLine";
	graphtemp.bullet = "triangleUp";
	graphtemp.bulletSize = 3;
	graphtemp.fillAlphas = 0;
	graphtemp.balloonText = " °C";
	graphtemp.balloonFunction = adjustBalloonText;
	graphtemp.lineColor = "#FF0000";
    stockPanelTemp.addStockGraph(graphtemp);

    // create stock legend                
    stockPanelTemp.stockLegend = new AmCharts.StockLegend();
	stockPanelTemp.stockLegend.valueTextRegular= " ";
	
	// set panels to the chart
    chart.panels = [stockPanelTemp,stockPanel1,stockPanelWind];
	
    // OTHER SETTINGS ////////////////////////////////////
    chart.categoryAxesSettings.minPeriod="60mm";
		/*
    var sbsettings = new AmCharts.ChartScrollbarSettings();
    sbsettings.graph = graph1;
    chart.chartScrollbarSettings = sbsettings;
	*/
	chart.chartCursorSettings.valueBalloonsEnabled = true;

    chart.write("chartdiv");

}

function Graph_Forecast() {
	var chart = new AmCharts.AmStockChart();
    chart.pathToImages = "http://www.amcharts.com/lib/images/";

    // DATASETS //////////////////////////////////////////
    var dataSet1 = new AmCharts.DataSet();
    dataSet1.title = "first data set";
    dataSet1.fieldMappings = [{
		fromField: "hum",
		toField: "hum"
	}, {
		fromField: "maxwind",
		toField: "maxwind"
	},
	{
		fromField: "temp_low",
		toField: "temp_low"
	},
	{
		fromField: "temp_high",
		toField: "temp_high"
	},
	{
		fromField: "icon",
		toField: "icon"
	},
	{
		fromField: "icon_url",
		toField: "icon_url"
	},
	{
		fromField: "pop",
		toField: "pop"
	}];
    dataSet1.dataProvider = chartData;
    dataSet1.categoryField = "date";

    // set data sets to the chart
    chart.dataSets = [dataSet1];
    // PANELS ///////////////////////////////////////////  
	var stockPanelIcon = new AmCharts.StockPanel();
	stockPanelIcon.showCategoryAxis = false;
    	
    
	//first stock panel
    var stockPanel1 = new AmCharts.StockPanel();
    stockPanel1.showCategoryAxis = false;
    //stockPanel1.percentHeight = 60;
	
    // add value axes
    var valueAxis1 = new AmCharts.ValueAxis();
	valueAxis1.minimum=0;
	valueAxis1.maximum=100;
	valueAxis1.unit = "%";
	valueAxis1.fontSize= 9;
    stockPanel1.addValueAxis(valueAxis1);
    
	var valueAxis3 = new AmCharts.ValueAxis();
	valueAxis3.minimum=valueAxis3.min;
	valueAxis3.maximum=valueAxis3.max;
	valueAxis3.fontSize= 9;
    stockPanel1.addValueAxis(valueAxis3);

    // graph of first stock panel
    var graph1 = new AmCharts.StockGraph();
    graph1.valueField = "hum";
	graph1.type = "smoothedLine";
	graph1.lineThickness = 2;
	graph1.bullet = "round";
	graph1.bulletSize = 5;
	graph1.balloonText = "<span style='font-size:11px;'>[[value]] %</span>";
	graph1.lineColor = "#99FF00";
	graph1.title = "Humidity (%)";
    graph1.useDataSetColors = false;
	graph1.showBalloon = true;
    stockPanel1.addStockGraph(graph1);
			
    // create stock legend                
    stockPanel1.stockLegend = new AmCharts.StockLegend();
	stockPanel1.stockLegend.valueTextRegular= " ";
	
	var graph3 = new AmCharts.StockGraph();
    graph3.valueField = "pop";
    graph3.showBalloon = true;
    graph3.fillAlphas = 0.3;
	graph3.lineThickness = 2;
	graph3.bullet = "square";
	graph3.type = "smoothedLine";
	graph3.bulletSize = 5;
	graph3.balloonText = "<span style='font-size:11px;'>[[value]] %</span>";
	graph3.lineColor = "#80F0FF";
	graph3.title = "Chance of rain (%)";
	graph3.useDataSetColors = false;
    stockPanel1.addStockGraph(graph3);


	var stockPanelWind = new AmCharts.StockPanel();
	stockPanelWind.showCategoryAxis = false;
	// add value axes
    var valueAxisWind = new AmCharts.ValueAxis();
	valueAxisWind.unit = "Km/h";
	valueAxisWind.fontSize= 9;
    stockPanelWind.addValueAxis(valueAxisWind);
    
  // graph of first stock panel
    var graphWind = new AmCharts.StockGraph();
    graphWind.title = "Speed wind (Km/h)";
    graphWind.valueField = "maxwind";
	graphWind.showBalloon = true;
	graphWind.lineThickness = 2;
	graphWind.bullet = "triangleUp";
	graphWind.bulletSize = 5;
	graphWind.balloonText = "<span style='font-size:11px;'>[[value]] Kw/h</span>";
    graphWind.lineColor = "#3010C0";
    graphWind.useDataSetColors = false;
    stockPanelWind.addStockGraph(graphWind);

    // create stock legend                
    stockPanelWind.stockLegend = new AmCharts.StockLegend();
	stockPanelWind.stockLegend.valueTextRegular= " ";
	
	var stockPanelTemp = new AmCharts.StockPanel();
	stockPanelTemp.showCategoryAxis = false;
	// add value axes
    var valueAxisTemp = new AmCharts.ValueAxis();
	valueAxisTemp.unit = " °C";
	valueAxisTemp.fontSize= 9;
    stockPanelTemp.addValueAxis(valueAxisTemp);
	
	
  // graph of first stock panel
    var graphtemp_high = new AmCharts.StockGraph();
    graphtemp_high.title = "Temperature max(°C)";
    graphtemp_high.valueField = "temp_high";
    graphtemp_high.lineThickness = 2;
    graphtemp_high.useDataSetColors = false;
	graphtemp_high.type = "column";
	graphtemp_high.fillAlphas = 0.4;
	graphtemp_high.bullet = "diamond";
	graphtemp_high.bulletSize = 5;
	graphtemp_high.balloonText = " °C max";
	graphtemp_high.balloonFunction = adjustBalloonText;
	graphtemp_high.lineColor = "#FF0000";
	graphtemp_high.useDataSetColors = false;
    stockPanelTemp.addStockGraph(graphtemp_high);
	
	// graph of first stock panel
    var graphtemp_low = new AmCharts.StockGraph();
    graphtemp_low.title = "Temperature min(°C)";
    graphtemp_low.valueField = "temp_low";
    graphtemp_low.lineThickness = 2;
    graphtemp_low.useDataSetColors = false;
	graphtemp_low.type = "column";
	graphtemp_low.fillAlphas = 0.3;
	graphtemp_low.bullet = "diamond";
	graphtemp_low.balloonText = "<span style='font-size:11px;'>[[value]] °C min</span>";
	graphtemp_low.lineColor = "#FF9020";
	graphtemp_low.useDataSetColors = false;
    stockPanelTemp.addStockGraph(graphtemp_low);

    // create stock legend                
    stockPanelTemp.stockLegend = new AmCharts.StockLegend();
	stockPanelTemp.stockLegend.valueTextRegular= " ";
	
	// set panels to the chart
    chart.panels = [stockPanelTemp,stockPanel1,stockPanelWind];
	
    // OTHER SETTINGS ////////////////////////////////////
    chart.categoryAxesSettings.minPeriod="60mm";
		/*
    var sbsettings = new AmCharts.ChartScrollbarSettings();
    sbsettings.graph = graph1;
    chart.chartScrollbarSettings = sbsettings;
	*/
	chart.chartCursorSettings.valueBalloonsEnabled = true;
	
    chart.write('chartdiv');
	
}

function adjustBalloonText(graphDataItem, graph){
    var value = graphDataItem.values.value;
	var ballon = graphDataItem.graph.balloonText;
	var ind=graphDataItem.index;
    return "<img src='http://icons.wxug.com/i/c/k/"+icon[ind]+".gif' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'>" + value + ballon;
}

function GetDataWeatherHIstory() {
var ora =0;
	chartData  = (function () {
			set_call_wunder();
			$.ajax({
				url : url_history,
				dataType : "jsonp",
				success : function(parsed_json) {							
					parsed_json['history']['observations'].forEach(function(observation) {								
					
					var time = observation['date']['year'] + "-" + observation['date']['mon'] + "-" + observation['date']['mday']
								+ " " + observation['date']['hour'] + ":" + observation['date']['min'];
								
					var temp_c = observation['tempm'];
					var hum_m = observation['hum'];
					var press_s = observation['pressurem'];
					var wspd_m = observation['wspdm'];
					var rain = observation['rain'];
					var iconn = observation['icon'];
					var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/;
					if (ora==parseInt(observation['date']['hour'])){
						var dateArray = reggie.exec(time); 
						
						
						var newDate = new Date(
							(dateArray[1]),
							(+dateArray[2])-1, // Careful, month starts at 0!
							(+dateArray[3]),
							(+dateArray[4]),
							(+dateArray[5])
						);
						
						chartData.push({
								date: newDate,
								temp: temp_c,
								hum: hum_m,
								press: press_s,
								wind: wspd_m,
								pop: rain
							});	
						icon.push(iconn);
						ora++;
					}
				});
				}
			});
			return chartData;
		})();
}

function call_wunder() {
	if (i<num_giorni) {
		singleday = new Date(actualDateFrom.getFullYear(), actualDateFrom.getMonth(), actualDateFrom.getDate()+i);
		nreqs ++;
		GetDataWeatherHIstory();
		i++;
	}else
	{		
		clearTimeout(timerload);
		spansec.innerHTML = "";
		clearTimeout(timercall);
		Graph_Daily_history();
	}
}

function set_call_wunder() {
	var day=singleday.getDate();
	var month=singleday.getMonth()+1;
	var year=singleday.getFullYear();
	if (day<10) {
		dd = "0" + day.toString();
	}
	else{
		dd = day.toString();
	}
	if (month<10) {
		mm = "0" + month.toString();
	}
	else{
		mm = month.toString();
	}
	url_history="http://api.wunderground.com/api/4266ed5feb628453/history_"+ year.toString() + mm + dd +"/q/IT/"+ document.getElementById("localita").value + ".json";
}
  