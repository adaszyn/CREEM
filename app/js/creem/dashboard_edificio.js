var estivo1;

function get_DashboardEdificio() {

	var hostname_ip = getCookieIP();
	var hostname_port = getCookiePort();
	var immobile = getCookieJSONBuilding();	
	var POD = immobile.pod;	

	document.getElementById("immobile_denominazione").innerHTML = immobile.denominazione;
    document.getElementById("immobile_codice").innerHTML = immobile.codice;
	document.getElementById("immobile_indirizzo").innerHTML = immobile.indirizzo;
	document.getElementById("immobile_comune").innerHTML = immobile.nome;
	document.getElementById("immobile_provincia").innerHTML = immobile.siglaprov;
	document.getElementById("immobile_potenzainstallata").innerHTML = immobile.potenzaInstallata;
	document.getElementById("immobile_cluster").innerHTML = immobile.clusterEnergy;
	document.getElementById("immobile_gge").innerHTML = immobile.gradigiornoestivi;
	document.getElementById("immobile_ggi").innerHTML = immobile.gradigiorno;
	document.getElementById("immobile_anno").innerHTML = immobile.annoCostruzione;
	document.getElementById("immobile_anno").innerHTML = immobile.annoCostruzione;
	document.getElementById("immobile_slm").innerHTML = immobile.slm;
	
	
	
					 
	load_start();
	$.getJSON(
		 'http://' + hostname_ip + ':' + hostname_port + '/dashboard?filterBy=POD&filterParams=' + POD,
		 function(data){
		 
		 data = data[0];	
		 var valori = {};
		 var nomi = {};
		 var unitamisura = {};
		 var simboli = {};
		 
		 for(var i=0; i<data.dashboard.indici.length;i++)
		 {
		    simboli[data.dashboard.indici[i].simbolo] = data.dashboard.indici[i].simbolo;
			valori[data.dashboard.indici[i].simbolo] = data.dashboard.indici[i].valore;
			nomi[data.dashboard.indici[i].simbolo] = data.dashboard.indici[i].nome;
			unitamisura[data.dashboard.indici[i].simbolo] = data.dashboard.indici[i].unitamisura;
		 }		 
		 
		 caricaRadar(valori, nomi, unitamisura, simboli);
		 
			try{
					
										
								
					$("#unitainv").text(unitamisura["EPIsn"]);
					$("#unitaest").text(unitamisura["EPEsn"]);
					$("#unitaill").text(unitamisura["EPill"]);
					$("#unitaglobale").text(unitamisura["EPEsn"]);
					 
					$("#estivo").text(valori["EPEsn"]);
					$("#invernale").text(valori["EPIsn"]);
					$("#ill").text(valori["EPill"]);	
					$("#globale").text( parseFloat( valori["EPEsn"] + valori["EPIsn"]).toFixed(2));
					
					loadGauge("gauge_globale", parseFloat( valori["EPEsn"] + valori["EPIsn"]).toFixed(2));
					loadGauge("gauge_estivo", valori["EPEsn"] );
					loadGauge("gauge_invernale", valori["EPIsn"]);
					loadGauge("gauge_ill", valori["EPill"]);
		
			}
			catch(err) {
					document.getElementById("tab-diagnosi-error").innerHTML += "<span class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span> Dati non sufficienti per calcolare gli indici energetici!";
					document.getElementById("tab-diagnosi-error").style.visibility = "visible";
			}
			
				
			
			load_finish();

		 }
		 
	  );
	  

}


function loadGauge(nomegauge, now)
{
var chartgauge = AmCharts.makeChart(nomegauge, {
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
				"bottomTextYOffset": 15,
				"endValue": 500
		}],
		"arrows": [{}]
		});

    	
    	chartgauge.arrows[0].setValue(now);
    	chartgauge.axes[0].setBottomText(now + "");

}


function caricaRadar(valori, nomi, unitamisura, simboli)
{
	var radar1 = AmCharts.makeChart("radar1",

{
	"type": "radar",
	"categoryField": "simbolo_indice",
	"startDuration": 2,
	"precision": 2,
	"theme": "light",
	"graphs": [
		{
			"animationPlayed": true,
			"balloonText": "[[nome_indice]] [[valore_indice]]",
			"bullet": "round",
			"bulletSize": 20,
			"id": "AmGraph-1",
			"valueField": "valore_indice"
		}
	],
	"guides": [],
	"valueAxes": [
		{
			"axisTitleOffset": 20,
			"id": "ValueAxis-1",
			"minimum": 0,
			"axisAlpha": 0.15,
			"dashLength": 3
		}
	],
	"allLabels": [],
	"balloon": {},
	"export": {
		"enabled": true
	},
	"titles": [],
	"dataProvider": [
		{
			"nome_indice": nomi["Hti"],
			"valore_indice": valori["Hti"],
			"simbolo_indice": simboli["Hti"]
		},
		{
			"nome_indice": nomi["Hvi"],
			"valore_indice": valori["Hvi"],
			"simbolo_indice": simboli["Hvi"]
		},
		{
			"nome_indice": nomi["Hte"],
			"valore_indice": valori["Hte"],
			"simbolo_indice": simboli["Hte"]
		},
		{
			"nome_indice": nomi["Hve"],
			"valore_indice": valori["Hve"],
			"simbolo_indice": simboli["Hve"]
		}
	]
 });
 
 
 var radar2 = AmCharts.makeChart("radar2",

{
	"type": "radar",
	"categoryField": "simbolo_indice",
	"startDuration": 2,
	"precision": 2,
	"theme": "light",
	"graphs": [
		{
			"animationPlayed": true,
			"balloonText": "[[nome_indice]] [[valore_indice]]",
			"bullet": "round",
			"bulletSize": 20,
			"id": "AmGraph-1",
			"valueField": "valore_indice"
		}
	],
	"guides": [],
	"valueAxes": [
		{
			"axisTitleOffset": 20,
			"id": "ValueAxis-1",
			"minimum": 0,
			"axisAlpha": 0.15,
			"dashLength": 3
		}
	],
	"allLabels": [],
	"balloon": {},
	"export": {
		"enabled": true
	},
	"titles": [],
	"dataProvider": [
			
		{
			"nome_indice": nomi["Qii"],
			"valore_indice": valori["Qii"],
			"simbolo_indice": simboli["Qii"]
		},
		{
			"nome_indice": nomi["Qsi"],
			"valore_indice": valori["Qsi"],
			"simbolo_indice": simboli["Qsi"]
		},
		{
			"nome_indice": nomi["Qie"],
			"valore_indice": valori["Qie"],
			"simbolo_indice": simboli["Qie"]
		},
		{
			"nome_indice": nomi["Qse"],
			"valore_indice": valori["Qse"],
			"simbolo_indice": simboli["Qse"]
		}
	]
 
 });
}