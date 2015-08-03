			$( "#aggregato_cluster" ).change(function() {
					document.getElementById("button-seleziona-cluster").disabled = false;

					document.getElementById("button-seleziona-cluster").onclick = function() 
					{ 
					
					var imm = { "pod" : "Cluster Energy",
								 "codice": "",
								 "denominazione": "", 
								 "indirizzoPod": "",
								 "indirizzo": "",
								 "Comune": "", 
								 "provincia": "",								 
								 "tipoTurno": "",
								 "gruppoProdotto": "",
								 "funzioniBusiness": "",
								 "filiale": "",
								 "clusterEnergy": $( "#aggregato_cluster option:selected" ).text()
								};
					
								setCookieJSONBuilding(imm); 
								$('#modal-seleziona-cluster').modal('hide'); 
								init();
					}												
			});
			
			$( "#aggregato_provincia" ).change(function() {
					document.getElementById("button-seleziona-provincia").disabled = false;
					document.getElementById("button-seleziona-provincia").onclick = function() 
					{ 						
						var imm = { "pod" : "Provincia",
								 "codice": "",
								 "denominazione": "", 
								 "indirizzoPod": "",
								 "indirizzo": "",
								 "Comune": "", 
								 "provincia": $( "#aggregato_provincia option:selected" ).text(),								 
								 "tipoTurno": "",
								 "gruppoProdotto": "",
								 "funzioniBusiness": "",
								 "filiale": "",
								 "clusterEnergy": ""
								};
					
								setCookieJSONBuilding(imm); 
								
						$('#modal-seleziona-provincia').modal('hide'); 
						init();}												
			});
		