
/* GET user INFO FROM DATABASE */
function userGetOne (usrId) {
    console.log ("get user info");
    $.get (APIURL + "/user/" + usrId, function (data) {
        console.log (data);
        return data;
    }, "json");
}

/* DISPALY USER's PAGE */
function composePageUser() {
    
}