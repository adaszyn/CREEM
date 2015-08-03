var immobile_selezionato;
var dati_immobile;

function init()
{
	getCookie();
	var hostname_ip = getCookieIP();
	var hostname_port = getCookiePort();
	var immobile = getCookieJSONBuilding();	
	var POD = immobile.pod;	


	if(immobile == "undefined" || POD== "Provincia" || POD == "Cluster Energy")
	{	
			
			var imm = { "pod" : "IT001E91346483",
								 "codice": "PAL22200",
								 "denominazione": "CARINI CPD", 
								 "indirizzoPod": "Via STURZO 69 190",
								 "indirizzo": "VIA LUIGI STURZO N. 190",
								 "latitudine": 38.147222,
								 "longitudine": 13.201909,
								 "Comune": "CARINI", 
								 "provincia": "PA",
								 "DestinazioneDuso": "IND",
								 "areaImmobiliare": "SUD 2",
								 "potenzaInstallata": 70,
								 "tipologiaFornitura": "fasce",
								 "frazionario": "0",
								 "classificazione": "LARGE",
								 "tipoTurno": "",
								 "gruppoProdotto": "MONO",
								 "funzioniBusiness": "mp",
								 "filiale": "Palermo 1 Citta",
								 "clusterEnergy": "IND",
								 "occupazioneImmobile": "SERVIZI POSTALI",
								 "strutturaSP": "CPD",
								 "orarioLunVen": "06:30/20:00",
								 "orarioSab": "8:00/14:00",
								 "sitoCreem": "SI",
								 "classeConsumo": "B",
								 "zonaClimatica": "B",
								 "altitudine": 170,
								 "gradiGiorno": 788,
								 "superficieUtile": 610,
								 "volume": 2867,
								 "annoCostruzione": "2005" };
			
			setCookieJSONBuilding(imm);
			immobile = getCookieJSONBuilding();
			POD = immobile.pod;
	}


	document.getElementById("tab-diagnosi-error").innerHTML = "";
	document.getElementById("tab-diagnosi-error").style.visibility = "hidden";
	
	
	if(!POD)
	{
			document.getElementById("immobile_selezionato").innerHTML = "Nessun immobile selezionato";
			document.getElementById("tab-diagnosi-error").innerHTML += "<p> Nessun immobile selezionato!</p>";
			document.getElementById("tab-diagnosi-error").style.visibility = "visible";
	}			

	else{			
		document.getElementById("immobile_selezionato").innerHTML = immobile.codice + " - " + immobile.nome + " (" + immobile.siglaprov + ")";
		get_DashboardEdificio();
	}
}

init();