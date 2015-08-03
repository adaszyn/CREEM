var IP_WS_meter = "172.16.1.21";
//var IP_WS_meter = "localhost";
var IP_WS = "192.168.66.2";
var PORT_WS = "8079";
var buildings = [];
function get_Province(){
  // determinazione del metodo di interscambio e del primo selettore
	var  m_provincia= [
		{
			"nomeProvincia":"Catania", "sigla":"CT"
		},
		{
			"nomeProvincia":"Messina", "sigla":"ME"
		}
	];
	var cb;
	for(i=0; i<m_provincia.length; i++){
	   cb='<option value="'+m_provincia[i].sigla+'">'+m_provincia[i].nomeProvincia+'</option>'; 
	   $('#province').append(cb); 
	}
};

function get_Building() {
	var select = $('#number_building');
	var name_prov=document.getElementById("province").value;
	var cb;
	$.getJSON(
         'http://' + IP_WS + ':' + PORT_WS + '/sicilia/' + name_prov,
         function(data){
			$('#number_building').empty();
            // ciclo l'array
			buildings=[];
            for(i=0; i<data.length; i++){
				var id=data[i].id_Building;
				var name=data[i].name_Building;
				var epi=data[i].epi_Building;
				cb='<option value="'+id+'">'+name+'</option>'; 
				$('#number_building').append(cb); 
			   
			   buildings.push({
					id:id,
					name:name,
					epi:80.53
					});
            }
 
         }
      );
	get_EPi();
	ChangeMeter();
};
  
  
function get_EPi() {
	var id_Build=document.getElementById("number_building").value;
	for(i=0; i<buildings.length; i++){
		if (buildings[i].id==id_Build) {
			document.getElementById("epi_building").value=buildings[i].epi;
		}
	}
};


function CreemGauge(meter)
{
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
				"endValue": 600,
				"innerRadius": "80%",
				"startValue": 300
				}],
				"bottomText": "0 W",
				"bottomTextYOffset": 0,
				"endValue": 600
		}],
		"arrows": [{}]
		});

    	var now = AmCharts.loadJSON('http://' + IP_WS_meter + ':' + PORT_WS + '/measure/' + meter + '/totalactivepower/now');

		if (meter=="portoantico_1502_2"){
			chartgauge.arrows[0].setValue(83,56);
		}
		else{
			chartgauge.arrows[0].setValue(now[0].value);
		}
    	chartgauge.arrows[0].setValue(now[0].value);
    	chartgauge.axes[0].setBottomText(now[0].value + "W");

    	document.getElementById("gaugevalue_" + meter).innerHTML = now[0].value + "W";

    	document.getElementById("gaugetime_" + meter).innerHTML = now[0].date;
}



function ChangeMeter() {
   CreemGauge("portoantico_1502_20");
   CreemGauge("portoantico_1502_3");
   CreemGauge("portoantico_1502_4");
   CreemGauge("portoantico_1503_2");
   CreemGauge("portoantico_1503_3");
}

AmCharts.ready(function() {
	get_Province();
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