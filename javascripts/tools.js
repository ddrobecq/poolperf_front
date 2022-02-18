/* GET PARAM FROM URL */
function getParam(strParam) {
    let str = window.location.href;
    let url = new URL(str);
    let search_params = new URLSearchParams(url.search); 

    if(search_params.has(strParam)) {
        return search_params.get(strParam);
        };       
    return null;
}

/* UPDATE THE TITLE IN THE HTML HEADER */
function setTitle (strTitle) {
    document.title = strTitle;
}
