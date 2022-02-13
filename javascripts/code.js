
var player1 = {playerId: 1, nbShot: 0, nbPocket: 0, nbFault: 0};
var player2 = {playerId: 2, nbShot: 0, nbPocket: 0, nbFault: 0};

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

function sendData() {
    console.log ("send data : " + player1.nbShot);

//    $.post("http://localhost:3000/game", { 
      $.post("https://api.drobecq.fr/game", { 
        playerId1: player1.playerId,
        nbShot1: player1.nbShot,
        nbPocket1: player1.nbPocket,
        nbFault1: player1.nbFault,

        playerId2: player2.playerId,
        nbShot2: player2.nbShot,
        nbPocket2: player2.nbPocket,
        nbFault2: player2.nbFault
    }, {},"json");
}

function manageparam() {
var str = "https://waytolearnx.com/t.html?title=alex-babtise&age=25&address=paris";
var url = new URL(str);
var search_params = new URLSearchParams(url.search); 
alert (search_params);
if(search_params.has('titla')) {
    var name = search_params.get('title');
    alert(name);
    };       
}