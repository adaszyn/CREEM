var IP = getCookieIP();
var PORTA = getCookiePort();
var url_edifici="http://" + IP + ":" + PORTA + "/immobili";
var div_tabella = document.getElementById("tabella_edifici");	


var tabella=	   	"<table data-url='"+ url_edifici +"' data-height='500' id='tabella_edifici' data-toggle='table' data-cache='false' data-pagination='false' data-search='true' data-sort-name='codice' data-sort-order='asc'>"+
					"<thead><tr>"+
					"<th data-field='state' data-radio='true'>Item ID</th>"+
					"<th data-align='left' data-field='codice' data-sortable='true'>Codice</th>"+					
					"<th data-align='left' data-field='indirizzo'>Indirizzo</th>"+
					"<th data-align='left' data-field='nome'>Comune</th>"+					
					"<th data-align='center' data-field='siglaprov'>Provincia</th>"+					
					"<th data-align='left' data-field='clusterEnergy'>Cluster</th>"+
					"<th data-align='center' data-field='sitoCreem'>sitoCreem</th>"+									
					"</tr></thead>"+									
				"</table>";
				
				
			div_tabella.innerHTML = tabella;	

            $('#tabella_edifici').bootstrapTable({}).on('check.bs.table', function (e, row) { 			
				document.getElementById("button-seleziona-immobile").disabled = false;				
				document.getElementById("button-seleziona-immobile").onclick = function() { setCookieJSONBuilding(row); $('#modal-seleziona-immobile').modal('hide'); init();}												
			});	

			