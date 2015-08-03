var IP = getCookieIP();
var PORTA = getCookiePort();

function CaricaTemperature(comune){
			var url_temperature="http://" + IP + ":" + PORTA + "/temperature/"+comune;
			var div_tabella = document.getElementById("tabella_temperature");
			var tabella=
						"<table id='tabella_temperature' data-toggle='table' data-cache='false' data-url='"+url_temperature+"' data-sort-name='anno' data-sort-order='asc' data-height='auto'  data-pagination='true'  data-click-to-select='true' data-single-select='true' >"+				
						"<button style='float: right; margin-bottom: 10px;' class='btn btn-danger' id='button_elimina_temperature' disabled>Elimina anno</button>"+									
						"<thead><tr>"+
							"<th data-field='state' data-radio='true'>Item ID</th>"+
							"<th data-field='anno'>Anno</th>"+
							"<th data-field='gen'>GEN</th>"+
							"<th data-field='feb'>FEB</th>"+
							"<th data-field='mar' data-sortable='true'>MAR</th>"+
							"<th data-field='apr' data-sortable='true'>APR</th>"+
							"<th data-field='mag' data-sortable='true'>MAG</th>"+
							"<th data-field='giu' data-sortable='true'>GIU</th>"+
							"<th data-field='lug' data-sortable='true'>LUG</th>"+
							"<th data-field='ago' data-sortable='true'>AGO</th>"+
							"<th data-field='set' data-sortable='true'>SET</th>"+
							"<th data-field='ott' data-sortable='true'>OTT</th>"+
							"<th data-field='nov' data-sortable='true'>NOV</th>"+
							"<th data-field='dic' data-sortable='true'>DIC</th>"+
							"</tr></thead>"+				
						"</table>";
						
			div_tabella.innerHTML =tabella;	

			$('#tabella_temperature').bootstrapTable({}).on('check.bs.table', function (e, row) {
                document.getElementById("button_elimina_temnperature").disabled = false;
				document.getElementById("button_elimina_temperature").value = "Elimina anno " + row.anno;
				document.getElementById("button_elimina_temperature").onclick = function() { EliminaTemperature(comune, row.anno); }	
			})
}			

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 			
			
			
			
function AggiungiTemperature(comune, anno){
	if( !isNumber(document.getElementById('temperature_anno').value) || !isNumber(document.getElementById('temperature_gen').value) || !isNumber(document.getElementById('temperature_feb').value) || !isNumber(document.getElementById('temperature_mar').value) || !isNumber(document.getElementById('temperature_apr').value) || !isNumber(document.getElementById('temperature_mag').value) || !isNumber(document.getElementById('temperature_giu').value) || !isNumber(document.getElementById('temperature_lug').value) || !isNumber(document.getElementById('temperature_ago').value) || !isNumber(document.getElementById('temperature_set').value) || !isNumber(document.getElementById('temperature_ott').value) || !isNumber(document.getElementById('temperature_nov').value) || !isNumber(document.getElementById('temperature_dic').value) )
	{
		alert("DATI MANCANTI O NON VALIDI: Per favore completa tutti i campi");
		return;
	}
	else
	{
		var temperature_json=Temperature2JSON();

		load_start();
		$.ajax({
			url: 'http://' + hostname_ip + ':' + hostname_port + '/temperature/insert/' + comune + '/' + anno,
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(temperature_json),
			dataType: "json",
			success: function(data) {			
				//location.reload();
			},
			error: function(err) {
				alert("errooore received: "+ err + " -- " + JSON.stringify(temperature_json));
			}
		});
		load_finish();
	}	
}

function Temperature2JSON() {
   	var anno = document.getElementById("temperature_anno").value;
	var gen = document.getElementById("temperature_gen").value;
	var feb = document.getElementById("temperature_feb").value;
	var mar = document.getElementById("temperature_mar").value;
	var apr = document.getElementById("temperature_apr").value;
	var mag = document.getElementById("temperature_mag").value;
	var giu = document.getElementById("temperature_giu").value;
	var lug = document.getElementById("temperature_lug").value;
	var ago = document.getElementById("temperature_ago").value;
	var set = document.getElementById("temperature_set").value;
	var ott = document.getElementById("temperature_ott").value;
	var nov = document.getElementById("temperature_nov").value;
	var dic = document.getElementById("temperature_dic").value;
		
	
	var json= {};
	
	json={"pod":POD, "anno":anno, "gen":gen, "feb":feb, "mar":mar, "apr": apr, "mag": mag, "giu": giu, "lug": lug, "ago": ago, "set": set, "ott":ott, "nov":nov, "dic":dic};
	
	
	return json;
}

function EliminaTemperature(comune, anno){
	$.getJSON(
		 'http://' + hostname_ip + ':' + hostname_port + '/temperature/delete/' + comune + '/' + anno,
		 function(data){		 			
			load_start();
			try{
				location.reload();			
			}
			catch(err) {
				alert("Errore ricevuto");
			}
			load_finish();		
		 }
	  );
	  
}
