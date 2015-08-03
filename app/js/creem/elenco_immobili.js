var IP = getCookieIP();
var PORTA = getCookiePort();
var url_edifici="http://" + IP + ":" + PORTA + "/immobili";
var div_tabella = document.getElementById("tabella_edifici");


var tabella=	   	"<button type='button' class='btn btn-primary raised gradient btn-sm round' id='button_anagrafica_edificio' onclick=' ' disabled> Dati Immobile</button><span> </span>"+
					"<button type='button' class='btn btn-primary raised gradient btn-sm round' id='button_indici_edificio' onclick=' ' disabled> Indici Energetici </button>"+					
					"<table data-url='"+ url_edifici +"' data-height='500' id='tabella_edifici' data-toggle='table' data-cache='false' data-pagination='false' data-search='true'>"+
				"<thead><tr>"+
					"<th data-field='state' data-radio='true'>Item ID</th>"+
					"<th data-align='left' data-field='codice'>Codice</th>"+					
					"<th data-align='left' data-field='indirizzo'>Indirizzo</th>"+
					"<th data-align='left' data-field='nome'>Comune</th>"+					
					"<th data-align='center' data-field='siglaprov'>Provincia</th>"+					
					"<th data-align='left' data-field='clusterEnergy'>Cluster</th>"+
					"<th data-align='center' data-field='sitoCreem'>sitoCreem</th>"+
					"</tr></thead>"+									
				"</table>";
			
			div_tabella.innerHTML = tabella;				
			
            $('#tabella_edifici').bootstrapTable({}).on('check.bs.table', function (e, row) {
                document.getElementById("button_indici_edificio").disabled = false;				
				document.getElementById("button_indici_edificio").onclick = function() { setCookieJSONBuilding(row); window.open("diagnosis.html", "_self"); }
				
				document.getElementById("button_anagrafica_edificio").disabled = false;				
				document.getElementById("button_anagrafica_edificio").onclick = function() { setCookieJSONBuilding(row); window.open("building.html", "_self"); }
			})			

					
			
			
			
			