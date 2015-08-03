function reset_messaggi()
{
	document.getElementById("messaggi").innerHTML = "";
}

function set_messaggio_info(msg)
{
	document.getElementById("messaggi").innerHTML += "<div id='messaggio_info' class='alert alert-info'><span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span> " + msg +" </div>";
}

function set_messaggio_error(msg)
{
	document.getElementById("messaggi").innerHTML += "<div id='messaggio_info' class='alert alert-danger'>" + msg +"</div>";
}

function set_messaggio_warning(msg)
{
	document.getElementById("messaggi").innerHTML += "<div id='messaggio_info' class='alert alert-warning'><span class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span> " + msg +"</div>";
}

