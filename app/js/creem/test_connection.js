var connection=0;
var resptime;
var wscreem = {};

var cookieName = 'creem_config';

function setCookieServer(ip, port)
{
	// value to set in the cookie
	var cookieValue = [ip, port];
	// sets the cookie
	$.cookie(cookieName, escape(cookieValue.join(',')));
}

function getCookie()
{
	var cookieValue = unescape($.cookie(cookieName));
	var mycookies=cookieValue.split(',');
	if (mycookies.length>1) {
		if (document.getElementById("creem_ipaddress")) {
			document.getElementById("creem_ipaddress").value=mycookies[0];
			document.getElementById("creem_port").value=mycookies[1];
		}
	}
}


function getCookieIP()
{
	var ip=IP_WS;
	var cookieValue = unescape($.cookie(cookieName));
	var mycookies=cookieValue.split(',');
	if (mycookies.length>1) {
		ip = mycookies[0];
	}
	return ip;
}

function getCookiePort()
{
	var port = PORT_WS;
	var cookieValue = unescape($.cookie(cookieName));
	var mycookies=cookieValue.split(',');
	if (mycookies.length>1) {
		port = mycookies[1];
	}
	return port;
}


function save() {
	if (document.getElementById("creem_ipaddress") && document.getElementById("creem_port")) {
		var ip=document.getElementById("creem_ipaddress").value;
		var port=document.getElementById("creem_port").value;
		setCookieServer(ip, port);
	}
}

function test() {
	var ip=document.getElementById("creem_ipaddress").value;
	var port=document.getElementById("creem_port").value;
	resptime = new Date().getTime();
	$.ajax({
		'async': false,
		'global': false,
		'url': "http://" + ip + ":" + port + "/status/",
		'dataType': "json",
		'success': function (data) {
			wscreem = data;
			connection = 1;
			resptime = new Date().getTime() - resptime;
		},
		'error': function (data) {
			connection = -1;
		}
	});
	
	if (connection == 0) { 
		document.getElementById("creem_status").value = "NA"; 
		document.getElementById("creem_version").value = "NA";
		document.getElementById("creem_db").value = "NA"; 
	}
	else if (connection == 1) { 
		document.getElementById("creem_status").value = "CONNECTED"; 
		document.getElementById("creem_version").value = wscreem.version;
	}
	else if (connection == -1) { 
		document.getElementById("creem_status").value = "DISCONNECTED"; 
		document.getElementById("creem_version").value = "NA";
		document.getElementById("creem_db").value  = "NA";
	}
	if (connection == 1 && wscreem.db_type != 'undefined') { document.getElementById("creem_db").value = wscreem.db_type; }
	if (wscreem.db_type == 'undefined') { document.getElementById("creem_db").value = "NA"; }

}

function setCookieBuild(nome, comune, pod, id)
{
	// value to set in the cookie
	nome = nome.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
	comune = comune.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
	pod = pod.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
	id = id.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
	var cookieValue = [nome, comune, pod, id];
	
	// sets the cookie
	$.cookie("Building", escape(cookieValue.join(',')));
}

function setCookieConfronto(pod, comune, prov, tipo_aggregato, valore_aggregato)
{
	var cookieValue = [pod, comune, prov, tipo_aggregato, valore_aggregato];
	
	// sets the cookie
	$.cookie("Confronti", escape(cookieValue.join(',')));
}

function setCookieJSONBuilding(immobile)
{	
    $.cookie("JSONBuilding", JSON.stringify(immobile));		
}

function getCookieJSONBuilding()
{	
	var cookieValue = unescape($.cookie("JSONBuilding"));
	
	if (cookieValue!= 'undefined')
		return JSON.parse($.cookie("JSONBuilding"));
	else 
		return "undefined";
}

function getCookieConfronto()
{
	var cookieValue = unescape($.cookie("Confronti"));
	var mycookies=cookieValue.split(',');
	if (mycookies!= 'undefined')
		return mycookies;
	else 
		return "";
}

function setCookieTimeInterval(from, to)
{
	var cookieValue = [from, to];
	
	// sets the cookie
	$.cookie("TimeInterval", escape(cookieValue.join(',')));
}

function getCookieTimeInterval()
{
	var cookieValue = unescape($.cookie("TimeInterval"));
	var mycookies=cookieValue.split(',');
	if (mycookies!= 'undefined')
		return mycookies;
	else 
		return "";
}


function getCookieBuild()
{
	var cookieValue = unescape($.cookie("Building"));
	var mycookies=cookieValue.split(',');
	if (mycookies[0]!= 'undefined')
		return mycookies[0];
	else 
		return "";
}
/*
function getCookieBuildPOD()
{
	var cookieValue = unescape($.cookie("Building"));
	var mycookies=cookieValue.split(',');
	if (mycookies[2]!= 'undefined')
		return mycookies[2];
	else 
		return "";
}

function getCookieComune()
{
	var cookieValue = unescape($.cookie("Building"));
	var mycookies=cookieValue.split(',');
	if (mycookies[1]!= 'undefined')
		return mycookies[1];
	else 
		return "";
}


function getCookieIDBuilding()
{
	var cookieValue = unescape($.cookie("Building"));
	var mycookies=cookieValue.split(',');
	if (mycookies[3]!= 'undefined')
		return mycookies[3];
	else 
		return "";
}
*/

