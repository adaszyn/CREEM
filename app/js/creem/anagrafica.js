function get_DatiAnagrafica() {	

			data = get_immobile_selezionato();	
			
			try{					 
					 document.getElementById("denominazione").value = data.denominazione;					 
					 document.getElementById("codice").value = data.codice;
					 document.getElementById("pod").value = data.pod;
					 document.getElementById("comune").value = data.nome;
					 document.getElementById("classificazione").value = data.classificazione;
					 document.getElementById("indirizzo").value = data.indirizzo;
					 document.getElementById("prov").value = data.siglaprov;
					 document.getElementById("tipologia").value = data.clusterEnergy;					 
					 document.getElementById("regione").value = "Sicilia";
					 document.getElementById("latitudine").value = data.latitudine;
					 document.getElementById("longitudine").value = data.longitudine;
					 document.getElementById("potenzainstallata").value = data.potenzaInstallata;
					 document.getElementById("numeroPiani").value = data.numeroPiani;
					 document.getElementById("annoCostruzione").value = data.annoCostruzione;
					 document.getElementById("DestinazioneDuso").value = data.DestinazioneDuso;						 
					 document.getElementById("idImmobile").value = data.idImmobile;					 
					 document.getElementById("ore").value = data.ore;					 
					 document.getElementById("zona").value = data.zona;						 
					 document.getElementById("gradigiorno").value = data.gradigiorno;					 
					 document.getElementById("gradigiornoestivi").value = data.gradigiornoestivi;
					 

			}
			catch(err) {
					alert(err);
			}
			
			data = get_dati_immobile();
			
			try{
				

				 document.getElementById("rendimentonazionale").value = data.modulo_epi.rendimentonazionale;
				 document.getElementById("quotaPdC").value = data.modulo_epi.quotaPdC;					 
				 document.getElementById("quotaCaldaie").value = data.modulo_epi.quotaCaldaie;
				 										
				 
				 document.getElementById("nord").value = data.modulo_epi.irradianza_invernale.nord;
				 document.getElementById("nordest").value = data.modulo_epi.irradianza_invernale.nordest;
				 document.getElementById("nordovest").value = data.modulo_epi.irradianza_invernale.nordovest;
				 document.getElementById("sud").value = data.modulo_epi.irradianza_invernale.sud;
				 document.getElementById("sudest").value = data.modulo_epi.irradianza_invernale.sudest;
				 document.getElementById("sudovest").value = data.modulo_epi.irradianza_invernale.sudovest;
				 document.getElementById("est").value = data.modulo_epi.irradianza_invernale.est;
				 document.getElementById("ovest").value = data.modulo_epi.irradianza_invernale.ovest;
				 
				 document.getElementById("nord_estivo").value = data.modulo_epi.irradianza_estiva.nord;
				 document.getElementById("nordest_estivo").value = data.modulo_epi.irradianza_estiva.nordest;
				 document.getElementById("nordovest_estivo").value = data.modulo_epi.irradianza_estiva.nordovest;
				 document.getElementById("sud_estivo").value = data.modulo_epi.irradianza_estiva.sud;
				 document.getElementById("sudest_estivo").value = data.modulo_epi.irradianza_estiva.sudest;
				 document.getElementById("sudovest_estivo").value = data.modulo_epi.irradianza_estiva.sudovest;
				 document.getElementById("est_estivo").value = data.modulo_epi.irradianza_estiva.est;
				 document.getElementById("ovest_estivo").value = data.modulo_epi.irradianza_estiva.ovest;
				 
				 document.getElementById("superficielorda").value = data.modulo_epi.datiedificio.superficielorda;
				 document.getElementById("superficienetta").value = data.modulo_epi.datiedificio.superficienetta;
				 document.getElementById("superficiedisperdentelorda").value = data.modulo_epi.datiedificio.superficiedisperdentelorda;
				 document.getElementById("volumelordo").value = data.modulo_epi.datiedificio.volumelordo;
				 document.getElementById("volumenetto").value = data.modulo_epi.datiedificio.volumenetto;
				 document.getElementById("altezza").value = data.modulo_epi.datiedificio.altezza;
				 document.getElementById("ricambioaria").value = data.modulo_epi.datiedificio.ricambioaria;
				 document.getElementById("ricambioaria_estate").value = data.modulo_epi.datiedificio.ricambioaria_estate;
				 document.getElementById("apportointerno").value = data.modulo_epi.datiedificio.apportointerno;
				 document.getElementById("coefficientefx").value = data.modulo_epi.datiedificio.coefficientefx;
				 document.getElementById("coefficientefm").value = data.modulo_epi.datiedificio.coefficientefm;
				 document.getElementById("apportointerno_estivo").value = data.modulo_epi.datiedificio.apportointerno_estivo;
				 
				 document.getElementById("potenzaLux_Interna").value = data.modulo_epi.datiedificio.potenzaLux_Interna;
				 document.getElementById("oremedieLux_Interna").value = data.modulo_epi.datiedificio.oremedieLux_Interna;
				 document.getElementById("potenzaLux_Esterna").value = data.modulo_epi.datiedificio.potenzaLux_Esterna;
				 document.getElementById("oremedieLux_Esterna").value = data.modulo_epi.datiedificio.oremedieLux_Esterna;
				 
				 
				 
				 document.getElementById("etae_caldaia").value = data.modulo_epi.datiedificio.etae_caldaia;
				 document.getElementById("etarg_caldaia").value = data.modulo_epi.datiedificio.etarg_caldaia;
				 document.getElementById("etad_caldaia").value = data.modulo_epi.datiedificio.etad_caldaia;
				 document.getElementById("etagn_caldaia").value = data.modulo_epi.datiedificio.etagn_caldaia;
				 
				 document.getElementById("etae_PdC").value = data.modulo_epi.datiedificio.etae_PdC;
				 document.getElementById("etarg_PdC").value = data.modulo_epi.datiedificio.etarg_PdC;
				 document.getElementById("etad_PdC").value = data.modulo_epi.datiedificio.etad_PdC;
				 document.getElementById("etagn_PdC").value = data.modulo_epi.datiedificio.etagn_PdC;
				 
				 document.getElementById("etae_estivo").value = data.modulo_epi.datiedificio.etae_estivo;
				 document.getElementById("etarg_estivo").value = data.modulo_epi.datiedificio.etarg_estivo;
				 document.getElementById("etad_estivo").value = data.modulo_epi.datiedificio.etad_estivo;
				 document.getElementById("etagn_estivo").value = data.modulo_epi.datiedificio.etagn_estivo;
				 
				 sup_esterneopache = [];
				 for(i=0; i<data.modulo_epi.supesterneopache.length; i++)
				 {
					var sup_seo ={};
					
					sup_seo['descrizione'] = data.modulo_epi.supesterneopache[i].descrizione;
					sup_seo['tiposuperficie'] = data.modulo_epi.supesterneopache[i].tiposuperficie;
					sup_seo['materiale'] = data.modulo_epi.supesterneopache[i].materiale;
					sup_seo['esposizione'] = data.modulo_epi.supesterneopache[i].esposizione;
					sup_seo['superficieseo'] = data.modulo_epi.supesterneopache[i].superficieseo;
					sup_seo['spessore'] = data.modulo_epi.supesterneopache[i].spessore;
					sup_seo['trasmittanzaeop'] = data.modulo_epi.supesterneopache[i].trasmittanzaeop;
					sup_seo['ambienteconfinante'] = data.modulo_epi.supesterneopache[i].ambienteconfinante;
					sup_seo['fattorecorrezione'] = data.modulo_epi.supesterneopache[i].fattorecorrezione;
					sup_seo['massa'] = data.modulo_epi.supesterneopache[i].massa;
					sup_seo['calorespecifico'] = data.modulo_epi.supesterneopache[i].calorespecifico;
					
					sup_esterneopache.push(sup_seo);
					load_superfici_opache();
					
				 }
				 
				 sup_trasparenti = [];
				 for(i=0; i<data.modulo_epi.componentitrasparenti.length; i++)
				 {
					var sup_infissi ={};
					sup_infissi['note'] = data.modulo_epi.componentitrasparenti[i].note;
					sup_infissi['tipovetro'] = data.modulo_epi.componentitrasparenti[i].tipovetro;
					sup_infissi['tipotelaio'] = data.modulo_epi.componentitrasparenti[i].tipotelaio;
					sup_infissi['tipogas'] = data.modulo_epi.componentitrasparenti[i].tipogas;
					sup_infissi['esposizioneinfissi'] = data.modulo_epi.componentitrasparenti[i].esposizioneinfissi;
					sup_infissi['supinfissosi'] = data.modulo_epi.componentitrasparenti[i].supinfissosi;
					sup_infissi['trasmittanzausi'] = data.modulo_epi.componentitrasparenti[i].trasmittanzausi;
					sup_infissi['flagsi'] = data.modulo_epi.componentitrasparenti[i].flagsi;
					
					sup_trasparenti.push(sup_infissi);
					load_serramenti();
				 } 
			}
			catch(err) {
					

				 document.getElementById("rendimentonazionale").value = 0;
				 document.getElementById("quotaPdC").value = 0;					 
				 document.getElementById("quotaCaldaie").value = 0;
				 										
				 
				 document.getElementById("nord").value = 0;
				 document.getElementById("nordest").value = 0;
				 document.getElementById("nordovest").value = 0;
				 document.getElementById("sud").value = 0;
				 document.getElementById("sudest").value = 0;
				 document.getElementById("sudovest").value = 0;
				 document.getElementById("est").value = 0;
				 document.getElementById("ovest").value = 0;
				 
				 document.getElementById("nord_estivo").value = 0;
				 document.getElementById("nordest_estivo").value = 0;
				 document.getElementById("nordovest_estivo").value = 0;
				 document.getElementById("sud_estivo").value = 0;
				 document.getElementById("sudest_estivo").value = 0;
				 document.getElementById("sudovest_estivo").value = 0;
				 document.getElementById("est_estivo").value = 0;
				 document.getElementById("ovest_estivo").value = 0;
				 
				 document.getElementById("superficielorda").value = 0;
				 document.getElementById("superficienetta").value = 0;
				 document.getElementById("superficiedisperdentelorda").value = 0;
				 document.getElementById("volumelordo").value = 0;
				 document.getElementById("volumenetto").value = 0;
				 document.getElementById("altezza").value = 0;
				 document.getElementById("ricambioaria").value = 1.5;
				 document.getElementById("ricambioaria_estate").value = 1.5;
				 document.getElementById("apportointerno").value = 0;
				 document.getElementById("coefficientefx").value = 0;
				 document.getElementById("coefficientefm").value = 0;
				 document.getElementById("apportointerno_estivo").value = 0;
				 
				 document.getElementById("potenzaLux_Interna").value = 0;
				 document.getElementById("oremedieLux_Interna").value = 0;
				 document.getElementById("potenzaLux_Esterna").value = 0;
				 document.getElementById("oremedieLux_Esterna").value = 0;
				 
				 
				 
				 document.getElementById("etae_caldaia").value = 0;
				 document.getElementById("etarg_caldaia").value = 0;
				 document.getElementById("etad_caldaia").value = 0;
				 document.getElementById("etagn_caldaia").value = 0;
				 
				 document.getElementById("etae_PdC").value = 0;
				 document.getElementById("etarg_PdC").value = 0;
				 document.getElementById("etad_PdC").value = 0;
				 document.getElementById("etagn_PdC").value = 0;
				 
				 document.getElementById("etae_estivo").value = 0;
				 document.getElementById("etarg_estivo").value = 0;
				 document.getElementById("etad_estivo").value = 0;
				 document.getElementById("etagn_estivo").value = 0;

				 
				
				
				
			}
			
			data = get_policies_immobile();
			
			try{					 
					 document.getElementById("orarioLunVen").value = data.orarioLunVen;
					 document.getElementById("orarioSab").value = data.orarioSab;
					 
					 document.getElementById("luxMediaOreLavoro").value = data.luxMediaOreLavoro;
					 document.getElementById("luxAreetransito").value = data.luxAreetransito;
					 
					 document.getElementById("TempEstivaAreaLavoro").value = data.TempEstivaAreaLavoro;
					 document.getElementById("TempEstivaChiusura").value = data.TempEstivaChiusura;
					 
					 document.getElementById("TempInvernoAreaLavoro").value = data.TempInvernoAreaLavoro;
					 document.getElementById("TempInvernoChiusura").value = data.TempInvernoChiusura;
					 
					 document.getElementById("oraAccensioneRiscaldamento").value = data.oraAccensioneRiscaldamento;
					 document.getElementById("oraSpegnimentoRiscaldamento").value = data.oraSpegnimentoRiscaldamento;
					 
					 document.getElementById("oraAccensioneRaffrescamento").value = data.oraAccensioneRaffrescamento;
					 document.getElementById("oraSpegnimentoRaffrescamento").value = data.oraSpegnimentoRaffrescamento;
					 
 
			}
			catch(err) {
					
			}
			
}
