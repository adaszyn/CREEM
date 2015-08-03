var IP = getCookieIP();
var PORTA = getCookiePort();
var idedificio = getCookieIDBuilding();

var anni_presenti_consuntivi = [];
var div_tabella = document.getElementById("tabella_consuntivi");

var tabella=
						"<table id='tabella_consuntivi' data-toggle='table' data-height='auto' data-pagination='true' >"+				
						"<button style='float: right; margin-bottom: 10px;' class='btn btn-danger' id='button_elimina_consuntivi' disabled>Elimina consuntivo</button>"+									
						"<thead><tr>"+
							"<th data-field='idedificio' data-radio='true'>ID edificio</th>"+
							"<th data-field='anno'>Anno</th>"+
							"<th data-field='gen'>GEN</th>"+
							"<th data-field='feb'>FEB</th>"+
							"<th data-field='mar'>MAR</th>"+
							"<th data-field='apr'>APR</th>"+
							"<th data-field='mag'>MAG</th>"+
							"<th data-field='giu'>GIU</th>"+
							"<th data-field='lug'>LUG</th>"+
							"<th data-field='ago'>AGO</th>"+
							"<th data-field='set'>SET</th>"+
							"<th data-field='ott'>OTT</th>"+
							"<th data-field='nov'>NOV</th>"+
							"<th data-field='dic'>DIC</th>"+
							"</tr></thead>"+				
						"</table>";
div_tabella.innerHTML =tabella;

				
			
function CaricaConsuntivi(){
			var url_consuntivi="http://" + IP + ":" + PORTA + "/consuntivi/"+idedificio;			
            $('#tabella_consuntivi').bootstrapTable({
                method: 'get',
                url: url_consuntivi,
				onLoadSuccess: function (data) {
					for(var i=0; i<data.length; i++)					
						anni_presenti_consuntivi.push(data[i].anno);
                },				
            }).on('check.bs.table', function (e, row) {
					document.getElementById("button_elimina_consuntivi").disabled = false;
					document.getElementById("button_elimina_consuntivi").value = "Elimina consuntivo " + row.anno;
					document.getElementById("button_elimina_consuntivi").onclick = function() { EliminaConsuntivo(row.anno); }
				});
}
	  
			
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 			
			
			
			
function AggiungiConsuntivo(){

	if( $.inArray( parseInt(document.getElementById('consuntivo_anno').value), anni_presenti_consuntivi) >= 0)
	{
		alert("DATI NON VALIDI: Anno già presente!");
		return;
	}
	
	if( !isNumber(document.getElementById('consuntivo_anno').value) || !isNumber(document.getElementById('consuntivo_gen').value) || !isNumber(document.getElementById('consuntivo_feb').value) || !isNumber(document.getElementById('consuntivo_mar').value) || !isNumber(document.getElementById('consuntivo_apr').value) || !isNumber(document.getElementById('consuntivo_mag').value) || !isNumber(document.getElementById('consuntivo_giu').value) || !isNumber(document.getElementById('consuntivo_lug').value) || !isNumber(document.getElementById('consuntivo_ago').value) || !isNumber(document.getElementById('consuntivo_set').value) || !isNumber(document.getElementById('consuntivo_ott').value) || !isNumber(document.getElementById('consuntivo_nov').value) || !isNumber(document.getElementById('consuntivo_dic').value) )
	{
		alert("DATI MANCANTI O NON VALIDI: Per favore completa tutti i campi");
		return;
	}	
	else
	{
		var consuntivi_json=Consuntivo2JSON(idedificio);

		load_start();
		$.ajax({
			url: 'http://' + hostname_ip + ':' + hostname_port + '/consuntivi/insert/' + idedificio,
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(consuntivi_json),
			dataType: "json",
			success: function(data) {			
				window.location.reload();
			},
			error: function(err) {
				alert("errooore received: "+ err + " -- " + JSON.stringify(consuntivi_json));
			}
		});
		load_finish();
	}	
}

function Consuntivo2JSON() {
   	var anno = document.getElementById("consuntivo_anno").value;
	var gen = document.getElementById("consuntivo_gen").value;
	var feb = document.getElementById("consuntivo_feb").value;
	var mar = document.getElementById("consuntivo_mar").value;
	var apr = document.getElementById("consuntivo_apr").value;
	var mag = document.getElementById("consuntivo_mag").value;
	var giu = document.getElementById("consuntivo_giu").value;
	var lug = document.getElementById("consuntivo_lug").value;
	var ago = document.getElementById("consuntivo_ago").value;
	var set = document.getElementById("consuntivo_set").value;
	var ott = document.getElementById("consuntivo_ott").value;
	var nov = document.getElementById("consuntivo_nov").value;
	var dic = document.getElementById("consuntivo_dic").value;
		
	
	var json= {};
	
	json={"idedificio":idedificio, "anno":anno, "gen":gen, "feb":feb, "mar":mar, "apr": apr, "mag": mag, "giu": giu, "lug": lug, "ago": ago, "set": set, "ott":ott, "nov":nov, "dic":dic};
	
	
	return json;
}

function EliminaConsuntivo(anno){
	load_start();
	$.getJSON(
		 'http://' + hostname_ip + ':' + hostname_port + '/consuntivi/delete/' + idedificio + '/' + anno,
		 function(data){		 			
			
			try{
				window.location.reload();			
			}
			catch(err) {
				alert("Errore ricevuto");
			}
			load_finish();		
		 }
	  );
	  
}
