var hostname_ip = getCookieIP();
var hostname_port = getCookiePort();
var item_build = getCookieBuild();
var immobile = getCookieJSONBuilding();	
var POD = immobile.pod;
var timeinterval = getCookieTimeInterval();
	
if(!timeinterval)
{
			setCookieTimeInterval( "2014-07-14", "2014-07-20");			
}

reset_messaggi();
set_messaggio_info("E' possibile selezionare un immobile direttamente dalla mappa o dall'elenco. ");
load_start();

$.getJSON('http://' + hostname_ip + ':' + hostname_port + '/immobili', function(data) {})
	.success(function(data) { 
			immobili = data;
		
			if(immobile == "undefined" || POD == "Provincia" || POD == "Cluster Energy")
			{	
	
						setCookieJSONBuilding(immobili[0]);
						immobile = getCookieJSONBuilding();
						POD = immobile.pod;
			}
		
		
	
		}
	
	
	)
	.error(function() { })
	.complete(function() { load_finish(); });
  
function get_immobili()
{
	return immobili;
}


