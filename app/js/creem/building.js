var buildings = [];

function CreemGauge(meter, vv) {

var chartgauge = AmCharts.makeChart("creemgauge_" + meter, {
		"type": "gauge",
		"theme": "none",
		"axes": [{
				"axisThickness":1,
				"axisAlpha":0.2,
				"tickAlpha":0.2,
				"valueInterval":100,
				"bands": [{
				"color": "#84b761",
				"endValue": 200,
				"innerRadius": "80%",
				"startValue": 0
				}, {
				"color": "#fdd400",
				"endValue": 300,
				"innerRadius": "80%",
				"startValue": 200
				}, {
				"color": "#cc4748",
				"endValue": 500,
				"innerRadius": "80%",
				"startValue": 300
				}],
				"bottomText": "0 W",
				"bottomTextYOffset": 0,
				"endValue": 500
		}],
		"arrows": [{}]
		});

    	//var now = AmCharts.loadJSON('http://' + IP_WSP + ':' + PORT_WSP + '/measure/' + meter + '/totalactivepower/now');

    	//chartgauge.arrows[0].setValue(now[0].value);
    	//chartgauge.axes[0].setBottomText(now[0].value + "W");
		
		chartgauge.arrows[0].setValue(vv);
    	chartgauge.axes[0].setBottomText(vv + "W");


    	//document.getElementById("gaugevalue_" + meter).innerHTML = now[0].value + "W";
    	//document.getElementById("gaugetime_" + meter).innerHTML = now[0].date;
		
		document.getElementById("gaugevalue_" + meter).innerHTML = vv + "W";
    	//document.getElementById("gaugetime_" + meter).innerHTML = vv;
		
		
}


function ChangeMeter() {
	//limitare a 1 richiesta al server
   CreemGauge("portoantico_1502_2","70");   
   CreemGauge("portoantico_1502_3","170");
   CreemGauge("portoantico_1502_4","350");  
/*   
   CreemGauge("portoantico_1503_2");
   CreemGauge("portoantico_1503_3");
   */
}


AmCharts.ready(function() {
    //get_Building();
    ChangeMeter();	
	
 });


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