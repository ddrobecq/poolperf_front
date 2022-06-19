var player1 = {playerId: getPlayerId(1), nbShot: 0, nbPocket: 0, nbFoul: 0};
var player2 = {playerId: getPlayerId(2), nbShot: 0, nbPocket: 0, nbFoul: 0};

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

/* BUILD JSON BODY FOR SAVNG A GAME */
function strGameBody (player){
	let body = {
		gameType: getParam ("gameType"),
		player: player
	};
	let strBody = JSON.stringify (body);
	return strBody;
}

/* INSERT GAME's SCORE INTO THE DATABASE */
function gameSave(player1, player2) {
	document.getElementById ("btnSave").innerHTML = setLoader();
	callAPI ("/games", "POST", strGameBody (player1)).then (function (results){
		if (results.affectedRows == 1) {
			callAPI ("/games", "POST", strGameBody (player2)).then (function (results){
				if (results.affectedRows == 1) {
					document.getElementById ("btnSave").innerHTML = "Enregistrer";
					window.location.href="index.html";
				}
			});	
		};
	});
}

/* CUSTOMIZE THE PAGE */
function composePageGame () {
	//SET TITLE
	setTitle (getParam ("gameType"));

	document.getElementById ("btnUser1").innerHTML = setLoader();
	document.getElementById ("btnUser2").innerHTML = setLoader();

	//SET USERS'S NAMES
	callAPI ("/users/" + player1.playerId, "GET", "").then (function (results){
		document.getElementById ("btnUser1").innerHTML = results[0].usr_name;
	});		 

	callAPI ("/users/" + player2.playerId, "GET", "").then (function (results){
		document.getElementById ("btnUser2").innerHTML = results[0].usr_name;
	});		 

}

window.onload = function(){
	composePageGame();
}; 

function showRules (){
	let sGameType = getParam ("gameType");
	//get the rules from JSON files
	let requestURL = '../data/' + sGameType + '.json';
	let request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		//create the HTML content from the JSON
		let popup = document.getElementById("rules");
		popup.innerHTML = "";
		let rulesTitle = document.createElement ('t1');
		var JSONcontent = request.response;
		if (JSONcontent){
			rulesTitle.textContent = JSONcontent.title;		
			popup.append (rulesTitle);
			let rulesContent;
			if ("paragraphs" in JSONcontent){
				for (i = 0 ; i < JSONcontent.paragraphs.length ; i++){
					rulesContent = document.createElement ('p');
					rulesContent.textContent = JSONcontent.paragraphs[i].text;	
					popup.append (rulesContent);
				};
			};
		}
		else console.error ("Impossible de retrouver les règles pour "+ requestURL);
		let btnRulesClose = document.createElement ('button');
		btnRulesClose.className = "menu_button";
		btnRulesClose.setAttribute ('onclick', 'hideRules()');
		btnRulesClose.textContent = "Fermer";
		popup.append (btnRulesClose);

		//display the HTML
		popup.style.display = "block";	
	};
}

function hideRules (){
	let popup = document.getElementById("rules");
	popup.style.display = "none";	
}