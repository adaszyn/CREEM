var singleday = new Date();
var actualDateTo = new Date();
var actualDateFrom = new Date();
var spansec;
var div;
var datarows = "";
var nreqs = 0;
var meterdata = null;

var count = 0;
var timercall;

function GetDataWeather() {
	
    var datefrom = document.getElementById("from").value;
	var dateto = document.getElementById("to").value;
	var meter = document.getElementById("meter").value;
	actualDateTo = new Date(dateto); // convert to actual date
	actualDateFrom = new Date(datefrom); // convert to actual date
	
	meterdata  = (function () {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "http://" + IP_WS + ":" + PORT_WS + "/measure/" + meter + "/totalactivepower/between/"+ datefrom + "/" + dateto + " 23:59:59",
			'dataType': "json",
			'success': function (data) {
				json = data;
			}
		});
		return json;
	})(); 
	
	
	
	singleday = actualDateFrom;
	div = document.getElementById("resultData");	
	callWunderground();		
	timercall = setInterval(function(){callWunderground()}, 7000);
	timerload = setInterval(function(){loading()}, 1000);	
	
}

function loading()
{	
	var j=0;
	spansec = document.getElementById("remaining");
	
	spansec.innerHTML = "Loading data ";
	if(count++<5)
		while(j++<count)
			spansec.innerHTML +=". ";
	else
		count = 0;
	spansec.innerHTML += "<br> [ " + nreqs.toString() + " request/s completed ]";
}

function callWunderground()
{
	div = document.getElementById("resultData");
	spansec = document.getElementById("remaining");
	
	if(singleday.getTime() < actualDateTo.getTime())
	{				
				
				var dd="";
				var mm="";
				var month = singleday.getMonth()+1;
				
				nreqs++;
				
				if (singleday.getDate() < 10) {
					dd = "0" + singleday.getDate().toString();
				}
				else{
					dd = singleday.getDate().toString();
				}
				if (month < 10) {
					mm = "0" + month;
				}
				else{
					mm = month;
				}
								
						
				$.ajax({
					url : "http://api.wunderground.com/api/baee12df81a5602b/history_"+ singleday.getFullYear() + mm + dd +"/q/IT/Genoa.json",
					dataType : "jsonp",
					success : function(parsed_json) {							
									
						parsed_json['history']['observations'].forEach(function(observation) {								
						
						var time = observation['date']['year'] + "-" + observation['date']['mon'] + "-" + observation['date']['mday']
									+ " " + observation['date']['hour'] + ":" + observation['date']['min'];
						
						var datew = new Date(
										(+observation['date']['year']),
										(+observation['date']['mon'])-1, // Careful, month starts at 0!
										(+observation['date']['mday']),
										(+observation['date']['hour']),
										(+observation['date']['min'])
						);						
						
						var powervalue = 0;
						for (var i = 0; i < meterdata.length; i++) {
									var dateString = meterdata[i].date;
									var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/;
									var dateArray = reggie.exec(dateString); 
									var datemeasure = new Date(
										(+dateArray[1]),
										(+dateArray[2])-1, // Careful, month starts at 0!
										(+dateArray[3]),
										(+dateArray[4]),
										(+dateArray[5])
									);
									
									

									
									if(datew.getYear() == datemeasure.getYear())
										if(datew.getMonth() == datemeasure.getMonth())
											if(datew.getDate() == datemeasure.getDate())
												if(datew.getHours() == datemeasure.getHours())
																powervalue = meterdata[i].value;
																
						}
									
									
									
						var temp_c = observation['tempm'];
						var hum = observation['hum'];
						var press = observation['pressurem'];
	
						datarows += "<tr><td>" + time + ", </td><td>"+ temp_c +", </td><td>"+ hum + ", </td><td>"+ press +", </td><td>" + powervalue  +" </td></tr>";
						
						});
					}
				});
				
				singleday = new Date(singleday.getFullYear(), singleday.getMonth(), singleday.getDate()+1);
	}
	else
	{		
		clearTimeout(timerload);
		spansec.innerHTML = "Result data";	
		div.innerHTML = "<table style='width:100%'><tr><td>Timestamp</td><td>Temperature(°C)</td><td>Humidity(%)</td><td>Pressure(mbar)</td><td>Total Active Power(W)</td></tr>"+datarows+"</table>";
		clearTimeout(timercall);
	}
	
}
