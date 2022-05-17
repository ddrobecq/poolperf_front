var player1 = {playerId: getPlayerId(1), nbShot: 0, nbPocket: 0, nbFoul: 0};
var player2 = {playerId: getPlayerId(2), nbShot: 0, nbPocket: 0, nbFoul: 0};


/* CUSTOMIZE THE PAGE */
function composePageGame () {

	//SET TITLE
	setTitle (getParam ("gameType"));

	//SET USERS'S NAMES
	$.get (_APIURL + "/users/" + player1.playerId, function (data) {
		document.getElementById ("btnUser1").innerHTML = data[0].usr_name;
	}, "json");
	$.get (_APIURL + "/users/" + player2.playerId, function (data) {
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
	let body = {
		gameType: getParam ("gameType"),
		player: player1
	};
	let strBody = JSON.stringify (body);
	$.ajax ({
		method: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		url: _APIURL + "/games", 
		data: strBody
	}, {}, "json").done(function(data) {
		console.log ("data saved = ", data);
	});

	body = {
		gameType: getParam ("gameType"),
		player: player2
	};
	strBody = JSON.stringify (body);
	$.ajax ({
		method: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		url: _APIURL + "/games", 
		data: strBody
	}, {}, "json").done(function(data) {
		console.log ("data saved = ", data);
		alert ("bien enregistré");
	});
}
