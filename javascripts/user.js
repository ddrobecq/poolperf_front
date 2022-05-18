var currentPlayerId = Number (getParam ("playerId"));
var currentPlayer = {usr_id: getParam ("usr_id"), usr_name: "", usr_avatar: null};
var arrPlayer = [];

/* GET LIST OF AVAILABLE USERS FROM DATABASE */
callAPI ("/users", "GET", "").done (function (data){
	arrPlayer = data;
	console.log ("data :" + JSON.stringify (data))
	console.log ("Scores enregistrés pour " + body1.player.playerId);
});		 

window.onload = function(){
	composePageUser (currentPlayer.usr_id);
}; 

/* SELECT CURRENT USER */
function userSelect(){
	setPlayerId (currentPlayerId, currentPlayer.usr_id);
	alert (arrPlayer);
}

/* UPDATE CHANGES TO DATABASE */
function userSave() {
	let strName = document.getElementById("inName").value;
	var body = {
		usr_id: 1,
		usr_name: strName
	};
	if (currentPlayer.usr_id > 0) {
		/* UPDATE THE CURRENT PLAYER INFO */
		callAPI ("/users/" + currentPlayer.usr_id, "PUT", "").done (function (data){
			console.log ("data = ", data.affectedRows);
		});
	}
	else{
		/* CREATE A NEW PLAYER IN DATABASE */
		callAPI ("/users", "POST", JSON.stringify({usr_name: strName})).done (function (data){
			/* SWITCH CURRENT PLAYER ON THE CREATED ONE */
			currentPlayer.usr_id = data.insertId;
			console.log ("New user created = ", currentPlayer.usr_id);
		});
	}
}

/* ENABLE BUTTON TO SAVE CHANGES (IF THERE IS ANY) */
function enableSave(bValue) {
	document.querySelector("#btnSave").disabled = !(bValue);
}

/* DISPLAY USER INFO FROM DB */ 
function displayUserInfo (usrId) {
	/* GET USER INFO TO FULLFILL THE FORM */
	callAPI ("/users/" + usrId, "GET", "").done (function (data){
		currentPlayer.usr_id = usrId;
		currentPlayer.usr_name = data[0].usr_name;
		currentPlayer.usr_avatar = data[0].usr_avatar;
		document.getElementById("inName").value = currentPlayer.usr_name;
	});

	/* GET USER'S AVERAGE TO FULLFILL THE TABLE */
	callAPI ("/users/" + usrId + "stats", "GET", "").done (function (data){
		if (data.length > 0){
			document.getElementById("avgPocket").innerHTML = (data[0].avgPocket * 100).toFixed(0) + "%";
			document.getElementById("minPocket").innerHTML = (data[0].minPocket * 100).toFixed(0) + "%";
			document.getElementById("maxPocket").innerHTML = (data[0].maxPocket * 100).toFixed(0) + "%";
			document.getElementById("avgFoul").innerHTML = (data[0].avgFoul * 100).toFixed(0) + "%";
			document.getElementById("minFoul").innerHTML = (data[0].minFoul * 100).toFixed(0) + "%";
			document.getElementById("maxFoul").innerHTML = (data[0].maxFoul * 100).toFixed(0) + "%";
		}
		else{
			displayEmpyStat();
		}
	});
}

/* DISPLAY EMPTY STAT */
function displayEmpyStat(){
	document.getElementById("avgPocket").innerHTML = "";
	document.getElementById("minPocket").innerHTML = "";
	document.getElementById("maxPocket").innerHTML = "";
	document.getElementById("avgFoul").innerHTML = "";
	document.getElementById("minFoul").innerHTML = "";
	document.getElementById("maxFoul").innerHTML = "";
}

/* DISPLAY EMPTY SCREE FOR NEW USER */
function displayNewUserInfo(){
	currentPlayer.usr_id = 0;
	currentPlayer.usr_name = "Nouveau Joueur";
	currentPlayer.usr_avatar = null;
	document.getElementById("inName").value = currentPlayer.usr_name;
	displayEmpyStat();
}

/* CONERT btnID INTO index IN THE PALYER'S ARRAY */
function getIndexFromButton (btnId){
	return (btnId[btnId.length-1]);
}

/* DISPLAY USER INFO ACCORDING THE ID REQUESTED */
function composePageUser (index){
	if (index <= arrPlayer.length){
		currentPlayer.usr_id = arrPlayer[(index-1)].usr_id;
		displayUserInfo (arrPlayer[(index-1)].usr_id); 
	} 
	else{
		displayNewUserInfo();
	}
	enableSave(false);
}