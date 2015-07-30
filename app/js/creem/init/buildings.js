var immobile_selezionato;
var dati_immobile;
var policies_immobile;

function init()
{
	getCookie();
	
	reset_messaggi();
	
	var hostname_ip = getCookieIP();
	var hostname_port = getCookiePort();
	
	var immobile = getCookieJSONBuilding();	
	var POD = immobile.pod;

	if(immobile == "undefined" || POD == "Provincia" || POD == "Cluster Energy")
	{	
			
			var imm = { "pod" : "IT001E91346483",
								 "codice": "PAL22200",
								 "denominazione": "CARINI CPD", 
								 "indirizzoPod": "Via STURZO 69 190",
								 "indirizzo": "VIA LUIGI STURZO N. 190",
								 "latitudine": 38.147222,
								 "longitudine": 13.201909,
								 "nome": "CARINI", 
								 "siglaprov": "PA",
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
	
	
	
	document.getElementById("denominazione").value = "";					 
	document.getElementById("codice").value = "";
	document.getElementById("pod").value = "";
	document.getElementById("comune").value = "";
	document.getElementById("indirizzo").value = "";
	document.getElementById("prov").value = "";
	document.getElementById("tipologia").value = "";
	document.getElementById("latitudine").value = "";
	document.getElementById("longitudine").value = "";
	
	document.getElementById("nord").value = "";
	document.getElementById("nordest").value = "";
	document.getElementById("nordovest").value = "";
	document.getElementById("sud").value = "";
	document.getElementById("sudest").value = "";
	document.getElementById("sudovest").value = "";
	document.getElementById("est").value = "";
	document.getElementById("ovest").value = "";
	
	document.getElementById("nord_estivo").value = "";
	document.getElementById("nordest_estivo").value = "";
	document.getElementById("nordovest_estivo").value = "";
	document.getElementById("sud_estivo").value = "";
	document.getElementById("sudest_estivo").value = "";
	document.getElementById("sudovest_estivo").value = "";
	document.getElementById("est_estivo").value = "";
	document.getElementById("ovest_estivo").value = "";
					 
	document.getElementById("superficielorda").value = "";
	document.getElementById("superficienetta").value = "";
	document.getElementById("volumelordo").value = "";
	document.getElementById("volumenetto").value = "";
	document.getElementById("altezza").value = "";
	document.getElementById("ricambioaria").value = "";
	document.getElementById("apportointerno").value = "";
	document.getElementById("coefficientefx").value = "";
					 
	document.getElementById("etae_PdC").value = "";
	document.getElementById("etarg_PdC").value = "";
	document.getElementById("etad_PdC").value = "";
	document.getElementById("etagn_PdC").value = "";
	
	document.getElementById("etae_caldaia").value = "";
	document.getElementById("etarg_caldaia").value = "";
	document.getElementById("etad_caldaia").value = "";
	document.getElementById("etagn_caldaia").value = "";
	
	document.getElementById("etae_estivo").value = "";
	document.getElementById("etarg_estivo").value = "";
	document.getElementById("etad_estivo").value = "";
	document.getElementById("etagn_estivo").value = "";
	
	
	
	document.getElementById("div-table-infissi").innerHTML = "";
	document.getElementById("div-table-supsoe").innerHTML = "";
	
	document.getElementById("immobile_selezionato").innerHTML = immobile.codice + " - " + immobile.nome + " (" + immobile.siglaprov + ")";
	
	set_messaggio_info("Accanto alla voce 'Menu' è presente un controllo per la scelta dell'immobile. ");		
	load_start();

	$.getJSON('http://' + hostname_ip + ':' + hostname_port + '/immobili?filterBy=POD&filterParams=' + POD, function(data) {})
		.success(function(data) { immobile_selezionato = data[0]; })
		.error(function() { })
		.complete(function() { load_finish(); });
		
	$.getJSON('http://' + hostname_ip + ':' + hostname_port + '/policies?filterBy=CODE&filterParams=' + immobile.codice, function(data) {})
		.success(function(data) { policies_immobile = data[0]; })
		.error(function() { })
		.complete(function() { load_finish(); });
		
	$.getJSON('http://' + hostname_ip + ':' + hostname_port + '/epi?filterBy=POD&filterParams=' + POD, function(data) {})
		.success(function(data) { dati_immobile = data[0]; })
		.error(function() { })
		.complete(function() { 
		
			if(dati_immobile.modulo_epi.irradianza_invernale == null || dati_immobile.modulo_epi.datiedificio == null || dati_immobile.modulo_epi.irradianza_estiva == null || dati_immobile.modulo_epi.supesterneopache == null || dati_immobile.modulo_epi.componentitrasparenti == null)
				set_messaggio_warning("Dati tecnici non sufficienti per calcolare gli indici di prestazione energetica dell'immobile selezionato.");
				
			load_finish(); 
			
		});
}

function get_immobile_selezionato()
{
	return immobile_selezionato;
}

function get_dati_immobile()
{
	return dati_immobile;
}

function get_policies_immobile()
{
	return policies_immobile;
}

init();