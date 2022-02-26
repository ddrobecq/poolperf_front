var currentPlayerId = Number (getParam ("playerId"));
var currentPlayer = {usr_id: getParam ("usr_id"), usr_name: "", usr_avatar: null};
var arrPlayer = [];

/* GET LIST OF AVAILABLE USERS FROM DATABASE */
$.get (_APIURL + "/users/", function (data) {
	arrPlayer = data;
}, "json");

window.onload = function(){
	composePageUser (currentPlayer.usr_id);
}; 

/* SELECT CURRENT USER */
function userSelect(){
	setPlayerId (currentPlayerId, currentPlayer.usr_id);
}

/* UPDATE CHANGES TO DATABASE */
function userSave() {
	let strName = document.getElementById("inName").value;
	if (currentPlayer.usr_id > 0) {
		/* UPDATE THE CURRENT PLAYER INFO */
		$.ajax ({
			method: "PUT",
			url: _APIURL + "/users/" + currentPlayer.usr_id, 
			data: {
				usr_name: strName
			}
		}, {}, "json").done(function(data) {
			console.log ("data = ", data.affectedRows);
		});
	}
	else{
		/* CREATE A NEW PLAYER IN DATABASE */
		$.ajax ({
			method: "POST",
			url: _APIURL + "/users/", 
			data: {
				usr_name: strName
			}
		}, {}, "json")
			.done(function(data) {
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
	$.get (_APIURL + "/users/" + usrId, function (data) {
		currentPlayer.usr_id = usrId;
		currentPlayer.usr_name = data[0].usr_name;
		currentPlayer.usr_avatar = data[0].usr_avatar;
		document.getElementById("inName").value = currentPlayer.usr_name;
	}, "json");

	/* GET USER'S AVERAGE TO FULLFILL THE TABLE */
	$.get (_APIURL + "/users/" + usrId + "/stats", function (data) {
		document.getElementById("avgPocket").innerHTML = (data[0].avgPocket * 100).toFixed(0) + "%";
		document.getElementById("minPocket").innerHTML = (data[0].minPocket * 100).toFixed(0) + "%";
		document.getElementById("maxPocket").innerHTML = (data[0].maxPocket * 100).toFixed(0) + "%";
		document.getElementById("avgFoul").innerHTML = (data[0].avgFoul * 100).toFixed(0) + "%";
		document.getElementById("minFoul").innerHTML = (data[0].minFoul * 100).toFixed(0) + "%";
		document.getElementById("maxFoul").innerHTML = (data[0].maxFoul * 100).toFixed(0) + "%";
	}, "json");
}

/* DISPLAY EMPTY SCREE FOR NEW USER */
function displayNewUserInfo(){
	currentPlayer.usr_id = 0;
	currentPlayer.usr_name = "Nouveau Joueur";
	currentPlayer.usr_avatar = null;
	document.getElementById("inName").value = currentPlayer.usr_name;
	document.getElementById("avgPocket").innerHTML = "";
	document.getElementById("minPocket").innerHTML = "";
	document.getElementById("maxPocket").innerHTML = "";
	document.getElementById("avgFoul").innerHTML = "";
	document.getElementById("minFoul").innerHTML = "";
	document.getElementById("maxFoul").innerHTML = "";
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