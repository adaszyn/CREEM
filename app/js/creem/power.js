var IP_WS = "srvvirt2.softeco.it";
var PORT_WS_meter = "80";
var PORT_WS = "80";
	
var hostname_ip = getCookieIP();
var hostname_port = getCookiePort();

AmCharts.ready(function() {
	ChangeEdificio();
	ShowTime();
});

function ChangeEdificio() {
	get_Building();
};

function ChangeImpianto() {
	var str_building = document.getElementById("edificio").value;
	var n = scelta.indexOf(' - ');
	var building = scelta.substring(0,n);
	var prov = scelta.substring(n+3,scelta.length);
	
	var select = $('#impianto');
	$('#impianto').empty();
	var cb;
	$.getJSON(
         'http://' + hostname_ip + ':' + hostname_port + '/' + prov + '/' + building,
         function(data){
            // ciclo l'array
            for(i=0; i<data.length; i++){
			   cb='<option value="'+data[i].idImpianto+'">'+data[i].tipologiaImpianto+'</option>'; 
               $('#impianto').append(cb); 
            }
 
         }
      );
	//ChangeMeter();	
};

function ChangeMeter() {
   generateChartData();
}

function ShowTime() {
	var option = document.getElementById("duration").value;
	if (option == "between") {
		document.getElementById("label_date").style.display="block";
		document.getElementById("from").value='';
		document.getElementById("to").value='';
	}
	else {
		document.getElementById("label_date").style.display="none";
		//ChangeMeter();
	}
}

function generateChartData() {
	var energy_measure = document.getElementById("energy_measure").value;
	var meter = document.getElementById("meter").value;
	var duration = document.getElementById("duration").value;
	var datefrom = document.getElementById("from").value;
	var dateto = document.getElementById("to").value;
	var str_date ="";
	
	if (duration == "between") {
		str_date = "/" + datefrom + "/" + dateto + ' 23:59:59';
	}
	
	var meterdata = AmCharts.loadJSON('http://' + IP_WS + ':' + PORT_WS_meter + '/measure/' + meter + '/' + energy_measure + '/'+duration + str_date);
	
	var energy_chartData = [];
	var power_chartData = [];
	
	var power_measure = document.getElementById("power_measure").value;
	var meterdata_p = AmCharts.loadJSON('http://' + IP_WS + ':' + PORT_WS_meter + '/measure/' + meter + '/' + power_measure + '/'+duration + str_date);
	
	
	
	
	
	for (var i = 0; i < meterdata.length; i++) {
		var dateString = meterdata[i].date;
		var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/;
		var dateArray = reggie.exec(dateString); 
		var newDate = new Date(
			(+dateArray[1]),
			(+dateArray[2])-1, // Careful, month starts at 0!
			(+dateArray[3]),
			(+dateArray[4]),
			(+dateArray[5])
		);

		var a = meterdata[i].value;
		var b = meterdata_p[i].value;

		energy_chartData.push({
			date: newDate,
			energy: a,
			power: b
		});
	
	}
  
  var chart = AmCharts.makeChart("creempowerchart", {

	type: "stock",
	"theme": "light",
	pathToImages: "http://www.amcharts.com/lib/3/images/",

	categoryAxesSettings: {
		minPeriod: "60mm",
	},

	dataSets: [{
		color: "#b0de09",
		fieldMappings: [{
			fromField: "energy",
			toField: "energy"
		}, {
			fromField: "power",
			toField: "power"
		}],

		dataProvider: energy_chartData,
		categoryField: "date"
	}],


	panels: [
	{
		showCategoryAxis: false,
		title: "Energy Consumed (MWh)",
		percentHeight: 60,

		stockGraphs: [{
			id: "g1",
			valueField: "energy",
			type: "smoothedLine",
			lineThickness: 3,
			bullet: "round"
		}],


		stockLegend: {
			valueTextRegular: " ",
			markerType: "none"
		}
	},

	{
		title: "Power",
		percentHeight: 40,
		stockGraphs: [{
			valueField: "power",
			type: "column",
			cornerRadiusTop: 2,
			fillAlphas: 1
		}],

		stockLegend: {
			valueTextRegular: " ",
			markerType: "none"
		}
	}
	],

	chartScrollbarSettings: {
		graph: "g1",
		position: "top"
	},

	chartCursorSettings: {
		valueBalloonsEnabled: true
	},

	panelsSettings: {
		usePrefixes: true
	}
});

}

 


 
AmCharts.loadJSON = function(url) {
  // create the request
        if (window.XMLHttpRequest) {
          // IE7+, Firefox, Chrome, Opera, Safari
          var request = new XMLHttpRequest();
        } else {
          // code for IE6, IE5
          var request = new ActiveXObject('Microsoft.XMLHTTP');
        }

        // load it
        // the last "false" parameter ensures that our code will wait before the
        // data is loaded
        request.open('GET', url, false);
        request.send();
  // parse adn return the output
  return eval(request.responseText);
}