var player1 = {playerId: 1, nbShot: 0, nbPocket: 0, nbFoul: 0};
var player2 = {playerId: 2, nbShot: 0, nbPocket: 0, nbFoul: 0};

/* CUSTOMIZE THE PAGE */
function composePageGame () {

    //SET TITLE
    setTitle (getParam ('title'));

    //SET USERS'S NAMES
    $.get (APIURL + "/users/" + player1.playerId, function (data) {
        document.getElementById ("btnUser1").innerHTML = data[0].usr_name;
    }, "json");
    $.get (APIURL + "/users/" + player2.playerId, function (data) {
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
                document.querySelector("#btnFoul1").disabled = false;
                document.querySelector("#btnPocket2").disabled = true;
                document.querySelector("#btnFoul2").disabled = true;
            }
            else {
                player2.nbShot++;
                document.querySelector("#btnPocket1").disabled = true;
                document.querySelector("#btnFoul1").disabled = true;
                document.querySelector("#btnPocket2").disabled = false;
                document.querySelector("#btnFoul2").disabled = false;
            }
            
            break;
        case "pocket" :
            if (numPlayer == 1)
                player1.nbPocket++;
            else
                player2.nbPocket++;
            break;
        case "Foul" :
            if (numPlayer == 1)
                player1.nbFoul++;
            else
                player2.nbFoul++;
            break;
    }

    if (player1.nbShot > 0) {
        document.querySelector("#btnShot1").textContent = "Coups : " + player1.nbShot;
        document.querySelector("#btnPocket1").textContent = "Empoches : " + player1.nbPocket + " " + (player1.nbPocket/player1.nbShot * 100).toFixed(0) + "%";
        document.querySelector("#btnFoul1").textContent = "Fautes : " + player1.nbFoul + " " + (player1.nbFoul/player1.nbShot * 100).toFixed(0) + "%";
    }
    if (player2.nbShot > 0) {
        document.querySelector("#btnShot2").textContent = "Coups : " + player2.nbShot;
        document.querySelector("#btnPocket2").textContent = "Empoches : " + player2.nbPocket + " " + (player2.nbPocket/player2.nbShot * 100).toFixed(0) + "%";
        document.querySelector("#btnFoul2").textContent = "Fautes : " + player2.nbFoul + " " + (player2.nbFoul/player2.nbShot * 100).toFixed(0) + "%";
    }
}

/* INSERT GAME's SCORE INTO THE DATABASE */
function gameSave(player1, player2) {
    console.log (player1);
    $.post(APIURL + "/games", { 
        gameType: getParam ('title'),
        player: JSON.stringify(player1)
    }, {},"json");
    console.log (player2);
    $.post(APIURL + "/games", { 
        gameType: getParam ('title'),
        player: JSON.stringify (player2)
    }, {},"json");
}
