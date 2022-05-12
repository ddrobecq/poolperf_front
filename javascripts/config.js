var _APIURL = "";
const _ENV = setEnvironment();

console.log("Configuration actuelle : " + _ENV);

/* CHECK IF ENVIRONMENT IS development OR production ACCORDING TO THE URL */
function setEnvironment() {
	var strURL = window.location.href;
	if ((strURL.indexOf("localhost") > -1) || (strURL.indexOf("127.0.0.1") > -1)) {
		_APIURL = "https://api.billard.drobecq.fr";
//		_APIURL = "http://localhost:3000";
		return "development";
	}
	else {
		_APIURL = "https://api.billard.drobecq.fr";
		return "production";
	}
}
