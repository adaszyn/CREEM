var cookieName = 'building';

$(window).load(function(){
	getCookie();
});

function log(status)
{
	var span = document.getElementById('statusBar');
	span.style.fontSize = "18px";

	while(span.firstChild)
		span.removeChild( span.firstChild );
	span.appendChild(document.createTextNode(status));
}

function setCookie(id)
{
	// value to set in the cookie
	var cookieValue = [buildings[id].nome, buildings[id].comune, buildings[id].pod];
	
	// sets the cookie
	$.cookie(cookieName, escape(cookieValue.join(',')));
	log(cookieValue[0] + ': ' + cookieValue[1] + ' - ' + cookieValue[2]);
}

function getCookie()
{
	var cookieValue = unescape($.cookie(cookieName));
	var mycookies=cookieValue.split(',');
	if (mycookies[0]!= 'undefined')
		log(mycookies[0] + ': ' + mycookies[1] + ' - ' + mycookies[2]);
	else 
		log('');
}

function setCookieServer(ip, port)
{
	// value to set in the cookie
	var cookieValue = [ip, port];
	
	// sets the cookie
	$.cookie("cookieserver", escape(cookieValue.join(',')));
}

function setCookieBuild(nome, comune, pod, id)
{
	var cookieValue = [nome, comune, pod, id];	
	$.cookie("Building", escape(cookieValue.join(',')));	
}

function setCookieJSONBuilding(immobile)
{	
    $.cookie("JSONBuilding", JSON.stringify(immobile));	
}

function getCookieJSONBuilding()
{	
	return JSON.parse($.cookie("JSONBuilding"));
}

function getCookieBuild()
{
	var cookieValue = unescape($.cookie(Building));
	var mycookies=cookieValue.split(',');
	if (mycookies[0]!= 'undefined')
		return mycookies[0];
	else 
		return "";
}

