var hostname_ip = getCookieIP();
var hostname_port = getCookiePort();
var immobile = getCookieJSONBuilding();
var POD = immobile.pod;
var info_comune = [];
var i=0;
var json_superfici_esterne;
var m_tipo;
var m_orientamento;
var id_tipo=[];
var esposizione=[];
var tipo_superficie;
var orientamento;


function get_DatiEdificio() {	
	if(!POD)
		return;
	console.log(POD);	
    load_start();

	$.getJSON(
		 'http://' + hostname_ip + ':' + hostname_port + '/epi/query/' + POD,
		 
		 function(data){
					console.log("DD");	 
			
			try{
					 document.getElementById("denominazione").value = data.denominazione;
					 document.getElementById("codice").value = data.codice;
					 document.getElementById("pod").value = data.pod;
					 document.getElementById("comune").value = data.comune;
					 document.getElementById("cap").value = data.cap;
					 document.getElementById("indirizzo").value = data.indirizzo;
					 document.getElementById("gradigiorno").value = data.gradigiorno;
					 document.getElementById("gradigiornoestivi").value = data.gradigiornoestivi;
					 document.getElementById("zona").value = data.zonaclimatica;
					 document.getElementById("prov").value = data.provincia;
					 document.getElementById("tipologia").value = data.tipologia;
					 document.getElementById("ore").value = data.ore;
					 document.getElementById("regione").value = data.regione;
					 document.getElementById("latitudine").value = data.latitudine;
					 document.getElementById("longitudine").value = data.longitudine;	

					 document.getElementById("btn_delete").disabled = false;					 
					 
		 
					 document.getElementById("nord").value = data.irradianza.nord;
					 document.getElementById("nordest").value = data.irradianza.nordest;
					 document.getElementById("nordovest").value = data.irradianza.nordovest;
					 document.getElementById("sud").value = data.irradianza.sud;
					 document.getElementById("sudest").value = data.irradianza.sudest;
					 document.getElementById("sudovest").value = data.irradianza.sudovest;
					 document.getElementById("est").value = data.irradianza.est;
					 document.getElementById("ovest").value = data.irradianza.ovest;
					 
					 document.getElementById("superficielorda").value = data.datiedificio.superficielorda;
					 document.getElementById("superficienetta").value = data.datiedificio.superficienetta;
					 document.getElementById("volumelordo").value = data.datiedificio.volumelordo;
					 document.getElementById("volumenetto").value = data.datiedificio.volumenetto;
					 document.getElementById("altezza").value = data.datiedificio.altezza;
					 document.getElementById("ricambioaria").value = data.datiedificio.ricambioaria;
					 document.getElementById("apportointerno").value = data.datiedificio.apportointerno;
					 document.getElementById("coefficientefx").value = data.datiedificio.coefficientefx;
					 
					 document.getElementById("etae").value = data.datiedificio.etae;
					 document.getElementById("etarg").value = data.datiedificio.etarg;
					 document.getElementById("etad").value = data.datiedificio.etad;
					 document.getElementById("etagn").value = data.datiedificio.etagn;
					 
					 sup_esterneopache = [];
					 for(i=0; i<data.supesterneopache.length; i++)
					 {
						var sup_seo ={};
						
						sup_seo['descrizione'] = data.supesterneopache[i].descrizione;
						sup_seo['tiposuperficie'] = data.supesterneopache[i].tiposuperficie;
						sup_seo['materiale'] = data.supesterneopache[i].materiale;
						sup_seo['esposizione'] = data.supesterneopache[i].esposizione;
						sup_seo['superficieseo'] = data.supesterneopache[i].superficieseo;
						sup_seo['spessore'] = data.supesterneopache[i].spessore;
						sup_seo['trasmittanzaeop'] = data.supesterneopache[i].trasmittanzaeop;
						sup_seo['ambienteconfinante'] = data.supesterneopache[i].ambienteconfinante;
						sup_seo['fattorecorrezione'] = data.supesterneopache[i].fattorecorrezione;
						sup_seo['massa'] = data.supesterneopache[i].massa;
						sup_seo['calorespecifico'] = data.supesterneopache[i].calorespecifico;
						
						sup_esterneopache.push(sup_seo);
						load_superfici_opache();
						
					 }
					 
					 sup_trasparenti = [];
					 for(i=0; i<data.componentitrasparenti.length; i++)
					 {
						var sup_infissi ={};
						sup_infissi['note'] = data.componentitrasparenti[i].note;
						sup_infissi['tipovetro'] = data.componentitrasparenti[i].tipovetro;
						sup_infissi['tipotelaio'] = data.componentitrasparenti[i].tipotelaio;
						sup_infissi['tipogas'] = data.componentitrasparenti[i].tipogas;
						sup_infissi['esposizioneinfissi'] = data.componentitrasparenti[i].esposizioneinfissi;
						sup_infissi['supinfissosi'] = data.componentitrasparenti[i].supinfissosi;
						sup_infissi['trasmittanzausi'] = data.componentitrasparenti[i].trasmittanzausi;
						sup_infissi['flagsi'] = data.componentitrasparenti[i].flagsi;
						
						sup_trasparenti.push(sup_infissi);
						load_serramenti();
					 }
					 
					 
			}
			catch(err) {
					;
			}
				
			load_finish();				
		 }
	  );

	$("#combobox").combobox();
	
}



function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 


function load_json() {

	var idImmobile = document.getElementById("idImmobile").value;
   	var denominazione = document.getElementById("denominazione").value;
	var codice = document.getElementById("codice").value;
	var pod = document.getElementById("pod").value;
	var comune = document.getElementById("comune").value;
	var indirizzo = document.getElementById("indirizzo").value;
	var tipologia = document.getElementById("tipologia").value;
	var provincia = document.getElementById("prov").value;
	var gradigiorno = document.getElementById("gradigiorno").value;
	var gradigiorno_estivi = document.getElementById("gradigiornoestivi").value;
	var zonaclimatica = document.getElementById("zona").value;
	var oreriscaldamento = document.getElementById("ore").value;
	var latitudine = document.getElementById("latitudine").value;
	var longitudine = document.getElementById("longitudine").value;
	var rendimentonazionale = document.getElementById("rendimentonazionale").value;
	var quotaCaldaie = document.getElementById("quotaCaldaie").value;
	var quotaPdC = document.getElementById("quotaPdC").value;
		

	form=document.getElementById("form-datiedificio");
	var datiedificio = {};
	jQuery.each(form, function() {
		datiedificio[this.id] = this.value || '';		
	});
	
	form=document.getElementById("form-datiedificio-inverno");	
	jQuery.each(form, function() {
		datiedificio[this.id] = this.value || '';		
	});
	
	form=document.getElementById("form-datiedificio-estate");	
	jQuery.each(form, function() {
		datiedificio[this.id] = this.value || '';		
	});

	var form=document.getElementById("form-irradianza_invernale");
	
	var irradianza_invernale = {};
	jQuery.each(form, function() {
		irradianza_invernale[this.id] = this.value || '';		
	});
	
	form=document.getElementById("form-irradianza_estiva");
		
	var irradianza_estiva = {};
	jQuery.each(form, function() {
		var ii_est = this.id;
		ii_est = ii_est.replace("_estivo","");
		irradianza_estiva[ii_est] = this.value || '';
	});
	
	var epi= {};
	
	var supesterneopache = sup_esterneopache;
	var componentitrasparenti = sup_trasparenti;
	epi={"idImmobile": idImmobile, "denominazione":denominazione, "codice":codice, "pod":pod, "comune":comune, "indirizzo": indirizzo, "provincia": provincia, "tipologia": tipologia,  "latitudine": latitudine, "longitudine": longitudine, "gradigiorno": gradigiorno, "gradigiorno_estivi": gradigiorno_estivi, "zonaclimatica": zonaclimatica, "oreriscaldamento": oreriscaldamento, "rendimentonazionale": rendimentonazionale, "quotaCaldaie": quotaCaldaie, "quotaPdC": quotaPdC, "irradianza_invernale":irradianza_invernale, "irradianza_estiva":irradianza_estiva, "datiedificio":datiedificio, "supesterneopache":supesterneopache, "componentitrasparenti":componentitrasparenti};
		
	return epi;
}

function policies2json() {
   	var luxMediaOreLavoro = document.getElementById("luxMediaOreLavoro").value;
	var luxAreetransito = document.getElementById("luxAreetransito").value;
	var orarioLunVen = document.getElementById("orarioLunVen").value;
	var orarioSab = document.getElementById("orarioSab").value;
	var TempEstivaAreaLavoro = document.getElementById("TempEstivaAreaLavoro").value;
	var TempEstivaChiusura = document.getElementById("TempEstivaChiusura").value;
	var TempInvernoAreaLavoro = document.getElementById("TempInvernoAreaLavoro").value;
	var TempInvernoChiusura = document.getElementById("TempInvernoChiusura").value;
	var oraAccensioneRiscaldamento = document.getElementById("oraAccensioneRiscaldamento").value;
	var oraSpegnimentoRiscaldamento = document.getElementById("oraSpegnimentoRiscaldamento").value;
	var oraAccensioneRaffrescamento = document.getElementById("oraAccensioneRaffrescamento").value;	
	var oraSpegnimentoRaffrescamento = document.getElementById("oraSpegnimentoRaffrescamento").value;
	var idImmobile= document.getElementById("idImmobile").value;

	var policies= {};
	

	policies={"idImmobile":idImmobile, "orarioLunVen":orarioLunVen, "orarioSab":orarioSab, "tempEstivaAreaLavoro": TempEstivaAreaLavoro, "tempEstivaChiusura": TempEstivaChiusura, "tempInvernoAreaLavoro":TempInvernoAreaLavoro, "tempInvernoChiusura":TempInvernoChiusura, "oraAccensioneRiscaldamento":oraAccensioneRiscaldamento, "oraSpegnimentoRiscaldamento":oraSpegnimentoRiscaldamento, "oraAccensioneRaffrescamento":oraAccensioneRaffrescamento, "oraSpegnimentoRaffrescamento":oraSpegnimentoRaffrescamento, "luxMediaOreLavoro":luxMediaOreLavoro, "luxAreetransito":luxAreetransito};
	
	
	return policies;
}

function immobile2json() {
   	var denominazione = document.getElementById("denominazione").value;
	var codice = document.getElementById("codice").value;
	var pod = document.getElementById("pod").value; 
	var regione = document.getElementById("regione").value;
	var prov = document.getElementById("prov").value;
	var comune = document.getElementById("comune").value;
	var indirizzo = document.getElementById("indirizzo").value;
	var classificazione = document.getElementById("classificazione").value;
	var tipologia = document.getElementById("tipologia").value;
	var destinazioneduso = document.getElementById("DestinazioneDuso").value;
	var latitudine = document.getElementById("latitudine").value;	
	var longitudine = document.getElementById("longitudine").value;
	var idImmobile= document.getElementById("idImmobile").value;
	var immobile= {};
	

	immobile={"building_id":idImmobile, "comune":comune, "building_name": denominazione, "provincia": prov, "indirizzo":indirizzo, "longitude":longitudine, "latitude":latitudine, "tipologia":tipologia, "pod":pod,  "codice":codice, "classificazione":classificazione, "destinazioneDuso":destinazioneduso};
	
	
	return immobile;
}

function EliminaEdificio(){

	document.getElementById('btn_delete').disabled = true;
	if( document.getElementById('pod').value == 0)
	{
		alert("DATI ANAGRAFICA: Non posso eliminare un edificio senza conoscere il POD");
	}
	else
	{
		load_start();
		var epi=load_json();

		$.ajax({
			url: 'http://' + hostname_ip + ':' + hostname_port + '/epi/delete',
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(epi),
			dataType: "json",
			success: function(data) {
				window.open('index.html', '_self');
				load_finish();
			},
			error: function(err) {
				alert("Errore ricevuto dal server: "+ err + " -- " + JSON.stringify(epi));
				load_finish();
			}
		});
		
	}
	
}

function SendAnagrafica(){
	document.getElementById('btn_send').disabled = true;
	
	if( document.getElementById('denominazione').value == "" || document.getElementById('codice').value == "" || document.getElementById('pod').value == "" || document.getElementById('tipologia').value == "" || document.getElementById('comune').value == "" || document.getElementById('cap').value == "" || document.getElementById('prov').value == "" || document.getElementById('indirizzo').value == "" || document.getElementById('latitudine').value == "" || document.getElementById('longitudine').value == "")
	{
		alert("DATI ANAGRAFICA: Per favore completa tutti i campi");
	}
	else
	{
		load_start();
		var epi=load_json();

		$.ajax({
			url: 'http://' + hostname_ip + ':' + hostname_port + '/epi/update',
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(epi),
			dataType: "json",
			success: function(data) {			
				window.open('index.html', '_self');
				load_finish();
			},
			error: function(err) {
				alert("Errore ricevuto dal server: "+ err + " -- " + JSON.stringify(epi));
				load_finish();
			}
			
		});
		
	}	
}

function AggiornaPolicies(){

	if( !confirm("Sei sicuro di voler aggiornare le policies?") )
		return;
		
	if( document.getElementById('orarioLunVen').value == "" || document.getElementById('orarioSab').value == "" || document.getElementById('luxMediaOreLavoro').value == "" || document.getElementById('luxAreetransito').value == "" || document.getElementById('TempEstivaAreaLavoro').value == "" || document.getElementById('TempEstivaChiusura').value == "" || document.getElementById('TempInvernoAreaLavoro').value == "" || document.getElementById('TempInvernoChiusura').value == "" || document.getElementById('oraAccensioneRiscaldamento').value == "" || document.getElementById('oraSpegnimentoRiscaldamento').value == "" || document.getElementById('oraAccensioneRaffrescamento').value == "" || document.getElementById('oraSpegnimentoRaffrescamento').value == "")
	{
		alert("DATI ANAGRAFICA: Dati incompleti e/o non validi");
		return;
	}
	else
	{
			load_start();
			var policies=policies2json();

			$.ajax({
				url: 'http://' + hostname_ip + ':' + hostname_port + '/policies/update',
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify(policies),
				dataType: "json",
				success: function(data) {					
					window.open('index.html', '_self');
					load_finish();
				},
				error: function(err) {
					alert("Errore ricevuto dal server: "+ err + " -- " + JSON.stringify(policies));
					load_finish();
				}
			});
			
	}
	
}

function AggiornaImmobile(){

	if( !confirm("Sei sicuro di voler aggiornare i dati?") )
		return;
		
	if( document.getElementById('denominazione').value == "" || document.getElementById('codice').value == "" || document.getElementById('pod').value == "" || document.getElementById('regione').value == "" || document.getElementById('prov').value == "" || document.getElementById('comune').value == "" || document.getElementById('indirizzo').value == "" || document.getElementById('classificazione').value == "" || document.getElementById('tipologia').value == "" || document.getElementById('DestinazioneDuso').value == "" || document.getElementById('latitudine').value == "" || document.getElementById('longitudine').value == "")
	{
		alert("DATI ANAGRAFICA: Dati incompleti e/o non validi");
		return;
	}
	else
	{
			load_start();
			var immobile=immobile2json();

			$.ajax({
				url: 'http://' + hostname_ip + ':' + hostname_port + '/immobili/update',
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify(immobile),
				dataType: "json",
				success: function(data) {					
					window.open('index.html', '_self');
					load_finish();
				},
				error: function(err) {
					alert("Errore ricevuto dal server: "+ err + " -- " + JSON.stringify(immobile));
					load_finish();
				}
			});
			
	}
	
}



function Send(){

	if( !confirm("Sei sicuro di voler aggiornare i dati?") )
		return;
	
	if( document.getElementById('denominazione').value == "" || document.getElementById('codice').value == "" || document.getElementById('pod').value == "" || document.getElementById('comune').value == "" || document.getElementById('prov').value == "" || document.getElementById('tipologia').value == "" || document.getElementById('indirizzo').value == "" || document.getElementById('latitudine').value == "" || document.getElementById('longitudine').value == "")
	{
		alert("DATI ANAGRAFICA: Dati incompleti e/o non validi");
		return;
	}
	else if( !isNumber(document.getElementById('nordovest').value) || !isNumber(document.getElementById('nord').value) || !isNumber(document.getElementById('nordest').value) || !isNumber(document.getElementById('sud').value) || !isNumber(document.getElementById('sudest').value) || !isNumber(document.getElementById('sudovest').value) || !isNumber(document.getElementById('est').value) || !isNumber(document.getElementById('ovest').value) )
	{
		alert("IRRADIANZA TOTALE STAGIONALE PER DATA ESPOSIZIONE: Per favore completa tutti i campi");
		return;
	} else if( !isNumber(document.getElementById('superficielorda').value) || !isNumber(document.getElementById('superficienetta').value) || !isNumber(document.getElementById('volumelordo').value) || !isNumber(document.getElementById('altezza').value) || !isNumber(document.getElementById('ricambioaria').value) || !isNumber(document.getElementById('apportointerno').value) || !isNumber(document.getElementById('coefficientefx').value))
	{
		alert("DATI GEOMETRICI: Dati incompleti e/o non validi");
		return;
	}
	else if( !isNumber(document.getElementById('etae_caldaia').value) || !isNumber(document.getElementById('etarg_caldaia').value) || !isNumber(document.getElementById('etad_caldaia').value) || !isNumber(document.getElementById('etagn_caldaia').value) )
	{
		alert("DATI RENDIMENTI: Dati incompleti e/o non validi");
		return;
	}
	else if( !isNumber(document.getElementById('etae_PdC').value) || !isNumber(document.getElementById('etarg_PdC').value) || !isNumber(document.getElementById('etad_PdC').value) || !isNumber(document.getElementById('etagn_PdC').value) )
	{
		alert("DATI RENDIMENTI: Dati incompleti e/o non validi");
		return;
	}
	else if( !isNumber(document.getElementById('etae_estivo').value) || !isNumber(document.getElementById('etarg_estivo').value) || !isNumber(document.getElementById('etad_estivo').value) || !isNumber(document.getElementById('etagn_estivo').value) )
	{
		alert("DATI RENDIMENTI: Dati incompleti e/o non validi");
		return;
	}
	else
	{
			load_start();
			var epiupload=load_json();
			console.log(epiupload);
			
			$.ajax({
				url: 'http://' + hostname_ip + ':' + hostname_port + '/epi/update',
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify(epiupload),
				dataType: "json",
				success: function(data) {					
					window.open('index.html', '_self');
					load_finish();
				},
				error: function(err) {
					alert("Errore ricevuto dal server: "+ err + " -- " + JSON.stringify(epiupload));
					load_finish();
				}
			});
			
			
			
	}
	
}

function select_superficie(){
	var div_superficie = document.getElementById("div_superficie");
	var option="<select class='form-control' id='tiposuperficie' onchange='load_ambienti();'>"+
				"<option value='parete' selected>Parete</option>"+
				"<option value='pavimento'>Pavimento</option>"+
				"<option value='piana'>Copertura Piana</option>"+
				"<option value='inclinata'>Copertura Inclinata</option>"+
				"</select>";
	div_superficie.innerHTML +=(option);

}

function select_esposizione(){
	var div_esposizione = document.getElementById("div_esposizione");
	var option="<select class='form-control' id='esposizione'>"+
				"<option value='N' selected>NORD</option>"+
				"<option value='NE'>NORD - EST</option>"+
				"<option value='E'>EST</option>"+
				"<option value='SE'>SUD - EST</option>"+
				"<option value='S'>SUD</option>"+
				"<option value='SO'>SUD - OVEST</option>"+
				"<option value='O'>OVEST</option>"+
				"<option value='NO'>NORD - OVEST</option>"+
				"</select>";
	div_esposizione.innerHTML +=(option);
}

function load_ambienti() {
	var tipo=document.getElementById("tiposuperficie").value;
	var option="";
	var box = document.getElementById("ambienteconfinante"); 
	if (box) {
		box.parentNode.removeChild(box); 
	};
	
	if (tipo=='parete') {
		tipo_superficie = 1;
		orientamento = 1;
		option ="<option value='esterno' selected>Esterno</option>"+
				"<option value='ambiente non riscaldato con aperture'>Ambiente non riscaldato con aperture</option>"+
				"<option value='ambiente non riscaldato senza aperture'>Ambiente non riscaldato senza aperture</option>";
	} 
	else if (tipo=='pavimento') {
		tipo_superficie = 2;
		orientamento = 2;
		option ="<option value='esterno su pilotis' selected>Esterno su pilotis</option>"+
				"<option value='garage'>Garage</option>"+
				"<option value='terreno'>Terreno</option>";
	}
	else if (tipo=='piana') { 
		tipo_superficie = 3;
		orientamento = 4;
		option ="<option value='esterno' selected>Esterno</option>"+
				"<option value='locale non riscaldato'>Locale non riscaldato</option>";
	}
	else if (tipo=='inclinata') {
		tipo_superficie = 3;
		orientamento = 3;
		option ="<option value='Esterno' selected>Esterno</option>"+
				"<option value='Locale non riscaldato'>Locale non riscaldato</option>";
	}
	else {
		option ="<option value='0'>Ambiente ... </option>";
	};

	var div_ambiente = document.getElementById("div_ambiente");
	var select = "<select class='form-control' id='ambienteconfinante'>"+
				 option + "</select>";
	
	div_ambiente.innerHTML +=(select);
}


var sup_esterneopache = [];
function Send_Superficie_Opaca() {
	var sup_seo ={};
	if( document.getElementById('descrizione').value == "" || document.getElementById('tiposuperficie').value == "" || document.getElementById('materiale').value == "" || document.getElementById('esposizione').value == "" || !isNumber(document.getElementById('superficieseo').value) || !isNumber(document.getElementById('spessore').value) || !isNumber(document.getElementById('trasmittanzaeop').value) || document.getElementById('ambienteconfinante').value == "" || !isNumber(document.getElementById('fattorecorrezione').value) || !isNumber(document.getElementById('calorespecifico').value))
	{
		alert("SUPERFICI OPACHE: Dati incompleti e/o non validi");
		return;
	}
	var form=document.getElementById("form-superfici_opache");
	jQuery.each(form, function() {
		sup_seo[this.id] = this.value || '';
	});
	sup_esterneopache.push(sup_seo);
	load_superfici_opache();
}

function load_superfici_opache() {
	var div_table_supsoe = document.getElementById("div-table-supsoe");
	var box = document.getElementById("table_supseo"); 
	if (box) {
		box.parentNode.removeChild(box); 
	};
	var option="<table class='table table-bordered' id='table_supseo'>"+
				"<thead><tr style='background-color: #D9D9D9; border: 1px solid #FFFFFF;'><th>Descrizione</th><th>Materiale</th><th width='9%'>S<span class='font-thin'>eo,i</span> [m&sup2;]</th>"+
				"<th width='9%'>d<span class='font-thin'>i</span> [m]</th><th width='9%'>U<span class='font-thin'>eop,i</span> [W/m&sup2;K]</th>"+
				"<th width='9%'>b<span class='font-thin'>tr,i</span></th><th width='9%'>M<span class='font-thin'>si</span> [Kg/m&sup2;]</th>"+
				"<th width='9%'>C<span class='font-thin'>pi</span> [J/(KgK)]</th><th width='10%'></th></tr></thead>";
 option +="<tbody>";	
	if (sup_esterneopache) {
		for (var i=0; i<sup_esterneopache.length; i++) {
			option += "<tr><td>"+sup_esterneopache[i]['descrizione']+"</td><td>"+sup_esterneopache[i]['materiale']+"</td>"+
				"<td>"+sup_esterneopache[i]['superficieseo']+"</td><td>"+sup_esterneopache[i]['spessore']+"</td>"+
				"<td>"+sup_esterneopache[i]['trasmittanzaeop']+"</td><td>"+sup_esterneopache[i]['fattorecorrezione']+"</td>"+
				"<td>"+sup_esterneopache[i]['massa']+"</td><td>"+sup_esterneopache[i]['calorespecifico']+"</td><td><a class='btn btn-success' onclick='Elimina("+i+");'>Elimina</a></td></tr>";			
		}
	}	
				
option += "</tbody></table>";		
	div_table_supsoe.innerHTML +=option;

}

function Elimina(i) {
	//il primo elemento lo elimino con lo shift
	if (i==0) {
		sup_esterneopache.shift();
	}
	else {
		sup_esterneopache.splice(i,1);
	}
	load_superfici_opache();
	document.getElementById("div-table-supsoe").recalc();
}


var sup_trasparenti = [];
function Send_Serramenti() {
	var sup_infissi ={};
	if( document.getElementById('note').value == "" || document.getElementById('tipovetro').value == "" || document.getElementById('tipotelaio').value == "" || document.getElementById('esposizioneinfissi').value=="" || !isNumber(document.getElementById('supinfissosi').value) || !isNumber(document.getElementById('trasmittanzausi').value) || document.getElementById('flagsi').value=="" )
	{
		alert("COMPONENTI TRASPARENTI: Dati incompleti e/o non validi");
		return;
	}
	var form=document.getElementById("form_serramenti_esterni");
	jQuery.each(form, function() {
		sup_infissi[this.id] = this.value || '';
	});
	sup_trasparenti.push(sup_infissi);
	load_serramenti();
}

function load_serramenti() {
	var div_table_infissi = document.getElementById("div-table-infissi");
	var box = document.getElementById("table_infissi"); 
	if (box) {
		box.parentNode.removeChild(box); 
	};
	var option="<table class='table table-bordered' id='table_infissi'>"+
				"<thead><tr style='background-color: #D9D9D9; border: 1px solid #FFFFFF;'><th>Note</th><th width='15%'>TIPO VETRO</th><th  width='15%'> MATERIALE TELAIO</th>"+
				"<th width='9%'>GAS</th><th width='9%'>ESPOSIZIONE</th>"+
				"<th width='9%'>S<span class='font-thin'>s,i</span>[m&sup2;]</th><th width='9%'>U<span class='font-thin'>si</span> [W/m&sup2;K]</th>"+
				"<th width='6%'>S<span class='font-thin'>s,i</span> ?</th><th width='10%'></th></tr></thead>";
 option +="<tbody>";	
	if (sup_trasparenti) {
		for (var i=0; i<sup_trasparenti.length; i++) {
			option += "<tr><td>"+sup_trasparenti[i]['note']+"</td><td>"+sup_trasparenti[i]['tipovetro']+"</td>"+
				"<td>"+sup_trasparenti[i]['tipotelaio']+"</td><td>"+sup_trasparenti[i]['tipogas']+"</td>"+
				"<td>"+sup_trasparenti[i]['esposizioneinfissi']+"</td><td>"+sup_trasparenti[i]['supinfissosi']+"</td>"+
				"<td>"+sup_trasparenti[i]['trasmittanzausi']+"</td><td>"+sup_trasparenti[i]['flagsi']+"</td><td><a class='btn btn-success' onclick='Elimina_infisso("+i+");'>Elimina</a></td></tr>";	
		}
	}	
				
option += "</tbody></table>";		
	div_table_infissi.innerHTML +=option;

}

function Elimina_infisso(i) {
	//il primo elemento lo elimino con lo shift
	if (i==0) {
		sup_trasparenti.shift();
	}
	else {
		sup_trasparenti.splice(i,1);
	}
	load_serramenti();
	document.getElementById("div-table-infissi").recalc();
}



function select_tipovetro(){
	var div_tipovetro = document.getElementById("div_tipovetro");
	var option="<select class='form-control' id='tipovetro'>"+
				"<option value='singolo' selected>Singolo</option>"+
				"<option value='doppio'>Doppio</option>"+
				"<option value='triplo'>Triplo</option>"+
				"<option value='doppio basso emissivo'>Doppio Basso Emissivo</option>"+
				"<option value='triplo basso emissivo'>Triplo Basso Emissivo</option>"+
				"</select>";
	div_tipovetro.innerHTML +=(option);

}

function select_tipotelaio(){
	var div_tipotelaio = document.getElementById("div_tipotelaio");
	var option="<select class='form-control' id='tipotelaio'>"+
				"<option value='metallo' selected>Metallo</option>"+
				"<option value='metallo tagli termici'>Metallo Tagli Termici</option>"+
				"<option value='legno duro'>Legno Duro</option>"+
				"<option value='legno tenero'>Legno Tenero</option>"+
				"<option value='pvc'>PVC</option>"+
				"</select>";
	div_tipotelaio.innerHTML +=(option);

}

function select_tipogas(){
	var div_tipogas = document.getElementById("div_tipogas");
	var option="<select class='form-control' id='tipogas'>"+
				"<option value='aria' selected>Aria</option>"+
				"<option value='argon'>Argon</option>"+
				"<option value='kripton'>Krypton</option>"+
				"<option value='sf6'>SF6</option>"+
				"<option value='xenon'>Xenon</option>"+
				"</select>";
	div_tipogas.innerHTML +=(option);

}

function select_esposizione_infissi(){
	var div_esposizione_infissi = document.getElementById("div_esposizione_infissi");
	var option="<select class='form-control' id='esposizioneinfissi'>"+
				"<option value='N' selected>NORD</option>"+
				"<option value='NE'>NORD - EST</option>"+
				"<option value='E'>EST</option>"+
				"<option value='SE'>SUD - EST</option>"+
				"<option value='S'>SUD</option>"+
				"<option value='SO'>SUD - OVEST</option>"+
				"<option value='O'>OVEST</option>"+
				"<option value='NO'>NORD - OVEST</option>"+
				"</select>";
	div_esposizione_infissi.innerHTML +=(option);
}

function select_flagsi(){
	var div_flagsi = document.getElementById("div_flagsi");
	var option="<select class='form-control' id='flagsi'>"+
				"<option value='SI' selected>SI</option>"+
				"<option value='NO'>NO</option>"+
				"</select>";
	div_flagsi.innerHTML +=(option);
}

$(function() {
$('btn_send').prop('disabled', true);
	
	select_superficie();
	select_esposizione();
	load_ambienti();
	load_superfici_opache();
	select_tipovetro();
	select_tipotelaio();
	select_tipogas();
	select_esposizione_infissi();
	load_serramenti();
	select_flagsi();
 
});
  
  
  
function load_info(){ 
	var prov = document.getElementById("prov");
	var gg = document.getElementById("gradigiorno");
	var zona = document.getElementById("zona");
	var ore = document.getElementById("oreriscaldamento");
	var comune = document.getElementById("comune").value;
	info_comune  = (function () {
		var json = null;

		return json;
	})(); 
}


function ottieni_lat_e_long()
	{
		var geocoder = new google.maps.Geocoder();		
		var coordinates = Array('','');
		var address = document.getElementById("comune").value + " " + document.getElementById("indirizzo").value;
		geocoder.geocode( { 'address': address}, function(results, status) {		
		
		if (status == google.maps.GeocoderStatus.OK) {
			coordinates[0] = results[0].geometry.location.lat();
			coordinates[1] = results[0].geometry.location.lng();
			
			document.getElementById("latitudine").value = coordinates[0];
			document.getElementById("longitudine").value = coordinates[1];
			} 
		}); 

	}
