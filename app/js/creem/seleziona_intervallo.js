$(function() {		
		$( "#from" ).datepicker({
			defaultDate: "2014-01-01",
			changeMonth: true,
			changeYear: true,
			numberOfMonths: 1,
			dateFormat:"yy-mm-dd",
			yearRange: '2012:2014',
			maxDate: new Date,
			minDate: new Date(2012, 0, 1),
			onClose: function( selectedDate ) {
					$( "#to" ).datepicker( "option", "minDate", selectedDate); $( "#to" ).datepicker( "option", "defaultDate", selectedDate);
			}
		});
		$( "#to" ).datepicker({
			defaultDate: "2014-01-01",
			changeMonth: true,
			changeYear: true,
			numberOfMonths: 1,
			dateFormat:"yy-mm-dd",
			yearRange: '2012:2014',			
			onClose: function( selectedDate ) {
				$( "#from" ).datepicker( "option", "maxDate", selectedDate ); $( "#from" ).datepicker( "option", "defaultDate", selectedDate);
				document.getElementById("button-seleziona-intervallo").disabled = false;
				document.getElementById("button-seleziona-intervallo").onclick = function() { setCookieTimeInterval( document.getElementById("from").value, document.getElementById("to").value  ); $('#modal-seleziona-intervallo').modal('hide'); init();}												
				
			}
		});		
	});				