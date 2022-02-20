var player = {usr_id: 1, usr_name: "", usr_avatar: null};

/* GET user INFO FROM DATABASE */
function userGetOne (usrId) {
    let request = new XMLHttpRequest();

    request.open ("GET", APIURL + "/users/" + usrId);
    request.responseType = "json";
    request.onload = function () {
        //return (request.response);
    };
    return new Promise(resolve => {
        request.send ();
        res = request.response;
        console.log (res);
        resolve (res);
      });
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
     $.ajax ({
        method: "PUT",
        url: APIURL + "/users/" + player.usr_id, 
        data: {
            usr_name: strName
        }
    }, {}, "json");
}

/* ENABLE BUTTON TO SAVE CHANGES (IF THERE IS ANY) */
function enableSave() {
    document.querySelector("#btnSave").disabled = false;
}

function composePageUser (usrId) {
    /* GET USER INFO TO FULLFILL THE FORM */
    $.get (APIURL + "/users/" + usrId, function (data) {
        player.usr_id = usrId;
        player.usr_name = data[0].usr_name;
        player.usr_avatar = data[0].usr_avatar;
        document.getElementById("inName").value = player.usr_name;
    }, "json");

    /* GET USER'S AVERAGE TO FULLFILL THE TABLE */
    $.get (APIURL + "/users/" + usrId + "/stats", function (data) {
        document.getElementById("avgPocket").innerHTML = (data[0].avgPocket * 100).toFixed(0) + "%";
        document.getElementById("minPocket").innerHTML = (data[0].minPocket * 100).toFixed(0) + "%";
        document.getElementById("maxPocket").innerHTML = (data[0].maxPocket * 100).toFixed(0) + "%";
        document.getElementById("avgFoul").innerHTML = (data[0].avgFoul * 100).toFixed(0) + "%";
        document.getElementById("minFoul").innerHTML = (data[0].minFoul * 100).toFixed(0) + "%";
        document.getElementById("maxFoul").innerHTML = (data[0].maxFoul * 100).toFixed(0) + "%";
    }, "json");
}

function displayUserInfo (btnId){
    let index = btnId[btnId.length-1];
    
    alert (index);
    
};