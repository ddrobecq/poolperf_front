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

/* UPDATE THE TITLE IN THE HTML HEADER */
function setTitle (strTitle) {
	document.title += " " + strTitle;
}

/* RETURN AJAX API CALL */
function callAPI (strPath, strMethod, strPayLoad){
	return $.ajax ({
		method: strMethod,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		url: _APIURL + strPath, 
		data: strPayLoad
	});
};