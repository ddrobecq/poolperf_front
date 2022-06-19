/* GET PARAM FROM URL */
function getParam(strParam) {
	let str = window.location.href;
	let url = new URL(str);
	let search_params = new URLSearchParams(url.search); 

	if(search_params.has(strParam)) {
		return search_params.get(strParam);
	}       
	return null;
}

/* SET HTML Code FOR ACTVATE LOADER */
function setLoader(){
	let htmlLoader = "\
	<span></span\>\
	<span></span\>\
	<span></span\>\
	<span></span\>";
	return htmlLoader;
}

/* UPDATE THE TITLE IN THE HTML HEADER */
function setTitle (strTitle) {
	document.title += " " + strTitle;
}

/* RETURN AJAX API CALL */
function callAPI (strPath, strMethod, strPayLoad){
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open(strMethod, _APIURL + strPath);
		xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		xhr.responseType = "json";
		xhr.onload = function() {
			if (this.status === 200) {
				//console.log ("received : ", strMethod, strPath);
				//console.log ("returned : ", this.response);
				resolve(this.response);
			} else {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			}
		};
		xhr.onerror = function() {
			reject({
				status: this.status,
				statusText: xhr.statusText
			});
		};
		xhr.send(strPayLoad);
	}
	);
};