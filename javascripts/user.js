
/* GET user INFO FROM DATABASE */
function userGetOne (usrId, target) {
    let request = new XMLHttpRequest();

    request.open ("GET", APIURL + "/user/" + usrId);
    request.responseType = "json";
    request.onload = function () {
        target = request.response[0].usr_name;
    };
    request.send ();
/*
    console.log ("get user info");

    $.get (APIURL + "/user/" + usrId, function (data) {
        element = data[0].usr_name;
    }, "json");
    */
}

/* UPDATE CHANGES TO DATABASE */
function userSave() {
    let strName = document.getElementById("inName").value;
    let jsonData = {"usr_name":strName};
 
    $.ajax ({
        method: "PUT",
        url: APIURL + "/user/" + getParam ('usr_id'), 
        data: {
            usr_name: strName
        }
    }, function (data) {
        console.log ("UPDATE PUTED!");
    }, "json");
}

/* ENABLE BUTTON TO SAVE CHANGES (IF THERE IS ANY) */
function enableSave() {
    document.querySelector("#btnSave").disabled = false;
}
