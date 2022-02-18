var player1 = {playerId: 1, nbShot: 0, nbPocket: 0, nbFault: 0};
var player2 = {playerId: 2, nbShot: 0, nbPocket: 0, nbFault: 0};

/* CUSTOMIZE THE PAGE */
function composePagePool () {

    //SET TITLE
    setTitle (getParam ('title'));

    //SET USERS'S NAMES
    $.get (APIURL + "/user/" + player1.playerId, function (data) {
        document.getElementById ("btnUser1").innerHTML = data[0].usr_name;
    }, "json");
    $.get (APIURL + "/user/" + player2.playerId, function (data) {
        document.getElementById ("btnUser2").innerHTML = data[0].usr_name;
    }, "json");
}

/* COUNT SHOTS DURING A GAME */
function shotCount (typeShot, numPlayer) {
    switch (typeShot) {
        case "shot":
            if (numPlayer == 1) {
                player1.nbShot++;
                document.querySelector("#btnPocket1").disabled = false;
                document.querySelector("#btnFault1").disabled = false;
                document.querySelector("#btnPocket2").disabled = true;
                document.querySelector("#btnFault2").disabled = true;
            }
            else {
                player2.nbShot++;
                document.querySelector("#btnPocket1").disabled = true;
                document.querySelector("#btnFault1").disabled = true;
                document.querySelector("#btnPocket2").disabled = false;
                document.querySelector("#btnFault2").disabled = false;
            }
            
            break;
        case "pocket" :
            if (numPlayer == 1)
                player1.nbPocket++;
            else
                player2.nbPocket++;
            break;
        case "fault" :
            if (numPlayer == 1)
                player1.nbFault++;
            else
                player2.nbFault++;
            break;
    }

    document.getElementById ("txtShot1").innerHTML = "Nbre de Coups : " + player1.nbShot;
    document.getElementById ("txtShot2").innerHTML = "Nbre de Coups : " + player2.nbShot;
    document.getElementById ("txtPocket1").innerHTML = "Billes empochées : " + player1.nbPocket + " " + (player1.nbPocket/player1.nbShot * 100).toFixed(0) + "%";
    document.getElementById ("txtPocket2").innerHTML = "Billes empochées : " + player2.nbPocket + " " + (player2.nbPocket/player2.nbShot * 100).toFixed(0) + "%";
    document.getElementById ("txtFault1").innerHTML = "Nbre de fautes : " + player1.nbFault + " " + (player1.nbFault/player1.nbShot * 100).toFixed(0) + "%";
    document.getElementById ("txtFault2").innerHTML = "Nbre de fautes : " + player2.nbFault + " " + (player2.nbFault/player2.nbShot * 100).toFixed(0) + "%";
}

/* INSERT GAME's SCORE INTO THE DATABASE */
function gameSave(player1, player2) {
    console.log (player1);
    $.post(APIURL + "/game", { 
        gameType: getParam ('title'),
        player1: JSON.stringify(player1),
        player2: JSON.stringify (player2)
    }, {},"json");
}
