var APIURL;
const ENV = setEnvironment ();

console.log ("Configuration actuelle : " + ENV);

/* CHECK IF ENVIRONMENT IS development OR production ACCORDING TO THE URL */
function setEnvironment() {
	let strURL = window.location.href;
	if (strURL.includes("localhost") || (strURL.includes("127.0.0.1"))) {
		APIURL = "http://localhost:3000";
		return "development";
	}
	else {
		APIURL = "https://api.drobecq.fr";
		return "production";
	} 
}
