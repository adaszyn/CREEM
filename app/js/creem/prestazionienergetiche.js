var hostname_ip = getCookieIP();
var hostname_port = getCookiePort();
var POD = getCookieBuildPOD();

if (POD){
	var url_edifici="http://" + hostname_ip + ":" + hostname_port + "/indici?filterBy=POD&filterParams="+POD;
	var div_tabellaindici = document.getElementById("tabella_prestazioni");	

	var tabella_prest =	"<table id='tabella_prestazioni' data-toggle='table' data-cache='false' data-url='"+url_edifici+"' data-height='auto'  data-show-refresh='true' data-search='true'>"+
					"<thead><tr>"+
						"<th data-field='simbolo' data-sortable='true' class='text-xxl'></th>"+
						"<th data-field='nome' data-sortable='true'>Indice di Prestazione Energetica</th>"+
						"<th data-field='valore' data-sortable='true'>Valore</th>"+
						"<th data-field='unitamisura' data-sortable='true'>Unità di Misura</th>"+
						"</tr></thead>"+					
					"</table>";
					
	div_tabellaindici.innerHTML = tabella_prest;
	$('#tabella_prestazioni').bootstrapTable({});
}