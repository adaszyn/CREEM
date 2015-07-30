// svg path for target icon
var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

var map = null;
var markers = [];
var markers_province = [];
var contentString = [];
var marker = [];
var buildings = [];
var id_prov=null;
var id_build=null;
var string_weather;
var infowindow;
var comune_weather;
var weatherdata  = [];
var infowindow;
var popDetail;

var img_green = 'images/icons/green.png';
var img_yellow =  'images/icons/block.png';
var img_red = 'images/icons/red.png';
var img_blue = 'images/icons/blue.png';
var build = 'images/icons/buildings2.png';

var legend = document.getElementById('legend');



var markers_province = [{'lat':37.4907111, 'lng':15.0772719, 'title':'CT', 'title_ext':'Catania'},
						{'lat':38.1780602, 'lng':15.5593572, 'title':'ME', 'title_ext':'Messina'},
						{'lat':38.1405023, 'lng':13.3572885, 'title':'PA', 'title_ext':'Palermo'},
						{'lat':38.0130477, 'lng':12.5387541, 'title':'TP', 'title_ext':'Trapani'},
						{'lat':36.9186836, 'lng':14.7102881, 'title':'RG', 'title_ext':'Ragusa'},
						{'lat':37.0791574, 'lng':15.2708964, 'title':'SR', 'title_ext':'Siracusa'},
						{'lat':37.4857682, 'lng':14.0568486, 'title':'CL', 'title_ext':'Caltanissetta'},
						{'lat':37.558109, 'lng':14.284057, 'title':'EN', 'title_ext':'Enna'},
						{'lat':37.3181421, 'lng':13.5861751, 'title':'AG', 'title_ext':'Agrigento'}];
							

function HomeControl(controlDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Clicca qui per tornare alla vista globale';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Vista Globale</b>';
  controlUI.appendChild(controlText);

  google.maps.event.addDomListener(controlUI, 'click', function() {
    initialize();
  });

}


function LegendControl(controlDiv, map)
{
  var div = document.createElement('div');
  
  div.style.backgroundColor = 'white';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '2px';
  div.style.borderColor = 'black';
  div.style.margin = '30px';
  div.style.marginBottom = '0px';
  div.style.padding = '10px';
  
  
  div.innerHTML = "<img src='images/icons/blue.png'> Siti CREEM <br><br>"  ;
  div.innerHTML += "<img src='images/icons/green.png'> Altri siti"  ;
  controlDiv.appendChild(div);

}

//google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {		
	//centra la mappa sulla sicilia
	var center_map = new google.maps.LatLng(37.4728631, 14.038399);
	var mapOptions = {
		zoom: 8,
		center: center_map,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: false
	};
	map = new google.maps.Map(document.getElementById('officesmap'), mapOptions);
	
	load_province(-1);

	google.maps.event.addListener(map, 'click', function(event) {
		map.setZoom(10);
		map.setCenter(event.latLng);
		id_prov=Get_provincia(event);
		if (id_prov>=0) {
			addMarker(id_prov);
		}
	});
	
	
	
  // Create the DIV to hold the control and
  // call the HomeControl() constructor passing
  // in this DIV.
  var homeControlDiv = document.createElement('div');
  var homeControl = new HomeControl(homeControlDiv, map);
  
  var legendControlDiv = document.createElement('div');
  var legendControl = new LegendControl(legendControlDiv, map);

  homeControlDiv.index = 1;
  legendControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legendControlDiv);
	
  

}
 
function load_province(ind) {
	
	
	for (var i = 0; i < markers_province.length; i++) {
		if (i!=ind){
			var position = new google.maps.LatLng(markers_province[i].lat, markers_province[i].lng);
			//controlla lo status dell'edificio
			var image=img_yellow;
			var marker = new google.maps.Marker({
				position: position,
				map: map,
				icon: image
			});
			

				marker.setTitle((markers_province[i].title_ext).toString());
				markers.push(marker);
				
				google.maps.event.addListener(marker, 'click', function(event) {
				map.setZoom(9);
				map.setCenter(event.latLng);
				id_prov=Get_provincia(event);
								
				if (id_prov>=0) {					
					addMarker(id_prov);
					
				}
			});
		}
	}
} 

  
  
 function addMarkerImmobile(i)
{
			
																							
			var building_name = buildings[i].pod;
			var position = new google.maps.LatLng(buildings[i].latitudine, buildings[i].longitudine);
						

			//controlla lo status dell'edificio
			
			var image;
			
			if(buildings[i].sitoCreem == "SI")
				image = img_blue;
			else
				image = img_green;

											var marker = new google.maps.Marker({
												position: position,
												map: map,
												icon: image
											});

											marker.setTitle((building_name).toString());
											markers.push(marker);
											
											
											
											google.maps.event.addListener(marker, 'click', function(event) {
												id_build=Get_idBuild(event);
												popDetail = Get_InfoBuilding(marker, id_build);
												var comune = buildings[id_build].nome;
												var re = /\$|,|@|#|~|`|\%|\*|\^|\&|\(|\)|\+|\=|\[|\-|\_|\]|\[|\}|\{|\;|\:|\"|\<|\>|\?|\||\\|\!|\$|\./g;
												var str_comune=comune.replace(re, "");
												Get_InfoWeather(str_comune.replace(" ", "_"), marker, event.latLng);
												setCookieJSONBuilding(buildings[id_build]);
											});
}


// Add a marker to the map and push to the array.
function addMarker(id_prov) {

	
			clearMarkers(id_prov);
	
	
			buildings = get_immobili();
			
			for (var i = 0; i < buildings.length; i++) {
			
						if( buildings[i].siglaprov == markers_province[id_prov].title )
						{
							addMarkerImmobile(i);
						}	
								
								
			}	
			
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers(ind) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  load_province(ind);
}

function Get_provincia(event) {
	var id_provincia = null;
	var my_lat = event.latLng.lat();
	var my_lng = event.latLng.lng();
	
	

	for (var i = 0; i < markers_province.length; i++) {
		var var_1 = Math.abs(markers_province[i].lat-my_lat );
		var var_2 = Math.abs(markers_province[i].lng-my_lng );
		if ((var_1<0.1 ) && (var_2<0.1 )) {
		   id_provincia= i;
		   i=markers_province.length;
		}
	}
	return id_provincia;
}


function Get_idBuild(event) {
	var id_building = null;
	var my_lat = event.latLng.lat();
	var my_lng = event.latLng.lng();

	for (var i = 0; i < buildings.length; i++) {
		var var_1 = Math.abs(buildings[i].latitudine-my_lat );
		var var_2 = Math.abs(buildings[i].longitudine-my_lng );
		if ((var_1<0.00001 ) && (var_2<0.00001 )) {
		   id_building= i;
		   i=buildings.length;
		}
	}
	return id_building;
}

function Get_InfoBuilding(marker, id) {
	var popDetail = '<div><h2>'+ buildings[id].codice +'</h2></div>'+
		'<table border=0>'+
		'<tr><td width="25%">Indirizzo: </td><td width="70%" class="text-info">'+ buildings[id].indirizzo +'</td></tr>'+
		'<tr><td width="25%">Cluster: </td><td width="70%" class="text-info">'+ buildings[id].clusterEnergy +'</td></tr>'+
		'<tr><td width="25%">Comune: </td><td width="70%" class="text-info">'+ buildings[id].nome +'</td></tr>'+
		'<tr><td width="50%"><h3><a href="building.html">Vai ai dati edificio</a></h3></tr>'+
		'</table>'+
		'</div>';
		
	return popDetail;
}

function Get_InfoWeather(m_comune, marker, position) {
	if (comune_weather!=m_comune) {
		$.ajax({
			url : "http://api.wunderground.com/api/4266ed5feb628453/conditions/q/IT/"+m_comune+".json",
			dataType : "jsonp",
			success : function(parsed_json) {	
				var display_location = parsed_json['current_observation']['display_location']['full'];
				var icon_url = parsed_json['current_observation']['icon_url'];
				var observation_time = parsed_json['current_observation']['observation_time'];
				var weather = parsed_json['current_observation']['weather'];
				var temp_c = parsed_json['current_observation']['temp_c'];
				var relative_humidity = parsed_json['current_observation']['relative_humidity'];
				var wind_dir = parsed_json['current_observation']['wind_dir'];
				var wind_kph = parsed_json['current_observation']['wind_kph'];
				var pressure_mb = parsed_json['current_observation']['pressure_mb'];
				var visibility_km = parsed_json['current_observation']['visibility_km'];
				var UV = parsed_json['current_observation']['UV'];
				weatherdata=[];
				weatherdata.push({
					display_location: display_location,
					icon_url: icon_url,
					weather: weather,
					observation_time: observation_time,
					temp_c: temp_c,
					relative_humidity: relative_humidity,
					wind_dir: wind_dir,
					wind_kph: wind_kph,
					pressure_mb: pressure_mb,
					visibility_km: visibility_km,
					UV: UV
				});	
				comune_weather = m_comune;
				Show_InfoWindow(position);
			}
			,
			error : function(parsed_json) {	
				Get_InfoWeather(markers_province[id_prov].title_ext, marker, position);
			}
		});
	}
	else{
		Show_InfoWindow(position);
	}
}


function Show_InfoWindow(position) {
	string_weather = Get_div(weatherdata);
	infowindow = new google.maps.InfoWindow({
					content: popDetail + string_weather
				});
	var my_marker = new google.maps.Marker({
		position: position,
		map: map,
	});
	my_marker.setVisible(false);
	infowindow.open(my_marker.get('map'),my_marker);
}


function Get_div(weatherdata) {
	var str_weather;
	if (weatherdata.length) {
		str_weather = '<hr><div>'+	
			'<h2>Condizioni Meteo</h2>'+
			'<table border="0">'+
			'<tr><td width="70%">'+weatherdata[0].display_location+'</td><td class="text-info"><img src="'+weatherdata[0].icon_url+'"></td></tr>'+			
			'</table>'+
			
			'<table border="0">'+
			'<tr><td width="30%" align="center"> Temperatura </td><td width="30%" align="center"> Pressione </td><td align="center"> Vento </td></tr>'+
			'<tr><td class="text-info" align="center">'+weatherdata[0].temp_c+' <span class="h5">°C</span></td><td align="center" class="text-info">'+ weatherdata[0].pressure_mb +' <span class="h5">mB</span></td><td align="center" class="text-info">'+ weatherdata[0].wind_kph +'<span class="h5"> Kph</span></td></tr>'+			
			'<tr><td width="30%" align="center">Umidità</td><td width="30%" align="center">Visibilità</td><td align="center">UV</td></tr>'+
			'<tr><td align="center" class="text-info">'+weatherdata[0].relative_humidity+' <span class="h5"></span></td><td align="center" class="text-info">'+weatherdata[0].visibility_km +'<span class="h5"> Km</span></td><td align="center" class=" text-info">'+ weatherdata[0].UV +'</td></tr>'+			
			'</table>'

			'</div>';
	}

	return str_weather;
}


