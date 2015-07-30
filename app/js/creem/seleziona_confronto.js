var IP = getCookieIP();
var PORTA = getCookiePort();
var url_edifici="http://" + IP + ":" + PORTA + "/immobili/?filterBy=CREEM&filterParams=SI";
var div_tabella_confronti = document.getElementById("tabella_edifici_confronti");


var tabella=	   	"<table data-height='400' lengthChange='false' id='tabella_edifici' data-toggle='table' data-cache='false' data-url='"+url_edifici+"' data-sort-name='pod' data-sort-order='asc' data-pagination='true' data-show-refresh='true' data-single-select='true'  data-search='true'>"+
					"<thead><tr>"+
					"<th data-field='state' data-radio='true'>Item ID</th>"+
					"<th data-field='pod'>POD</th>"+				
					"<th data-field='codice'>Codice</th>"+					
					"<th data-field='clusterEnergy'>Cluster</th>"+
					"<th data-field='provincia' data-sortable='true'>Provincia</th>"+
					"<th data-field='Comune' data-sortable='true'>Comune</th>"+
					"</tr></thead>"+									
				"</table>";
				
					
			div_tabella_confronti.innerHTML = tabella;


			$('#tabella_edifici_confronti').bootstrapTable({}).on('check.bs.table', function (e, row) { 			
				document.getElementById("button-seleziona-confronto-immobile").disabled = false;					
				document.getElementById("button-seleziona-confronto-immobile").onclick = function() { setCookieConfronto(row.pod, row.Comune, row.provincia, null, null); $('#modal-seleziona-confronto-immobile').modal('hide'); init();}												
			});			
			
			