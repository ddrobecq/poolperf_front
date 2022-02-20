var currentPlayer = {usr_id: 1, usr_name: "", usr_avatar: null};
var arrPlayer = [];

/* GET LIST OF AVAILABLE USERS FROM DATABASE */
$.get (APIURL + "/users/", function (data) {
    arrPlayer = data;
    console.log (arrPlayer);
}, "json");

window.onload = function(){
    displayUserInfo ("radio1");
} 

/* UPDATE CHANGES TO DATABASE */
function userSave() {
    if (currentPlayer.usr_id > 0) {
        /* UPDATE THE CURRENT PLAYER INFO */
        let strName = document.getElementById("inName").value;
        $.ajax ({
            method: "PUT",
            url: APIURL + "/users/" + currentPlayer.usr_id, 
            data: {
                usr_name: strName
            }
        }, {}, "json");
    }
    else{
        /* CREATE A NEW PLAYER IN DATABASE */

        /* SWITCH CURRENT PLAYER ON THE CREATED ONE */
    }
}

/* ENABLE BUTTON TO SAVE CHANGES (IF THERE IS ANY) */
function enableSave() {
    document.querySelector("#btnSave").disabled = false;
}

function composePageUser (usrId) {
    /* GET USER INFO TO FULLFILL THE FORM */
    $.get (APIURL + "/users/" + usrId, function (data) {
        currentPlayer.usr_id = usrId;
        currentPlayer.usr_name = data[0].usr_name;
        currentPlayer.usr_avatar = data[0].usr_avatar;
        document.getElementById("inName").value = currentPlayer.usr_name;
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
    if (index <= arrPlayer.length){
        currentPlayer.usr_id = arrPlayer[(index-1)].usr_id;
        console.log ("compose for player " + index + " who is " + arrPlayer[(index-1)].usr_id)
        composePageUser (arrPlayer[(index-1)].usr_id); 

    } 
    else{
        currentPlayer.usr_id = 0;
        currentPlayer.usr_name = "Nouveau Joueur";
        currentPlayer.usr_avatar = null;
        document.getElementById("inName").value = currentPlayer.usr_name;
        console.log ("newplayer");
    }
};