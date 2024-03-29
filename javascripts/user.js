var currentPlayerId = Number (getParam ("playerId"));
var currentPlayer = {usr_id: getParam ("usr_id"), usr_name: "", usr_avatar: null};
var arrPlayer = [];
var index=0;

/* SELECT CURRENT USER */
function userSelect(){
	setPlayerId (currentPlayerId, currentPlayer.usr_id);
	history.back();
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
		callAPI ("/users/" + currentPlayer.usr_id, "PUT", JSON.stringify(body)).then (function (data){
			if (data.affectedRows){
				console.log ("Mise à jour enregistré pour ", strName);
				enableSave(false);
			}
		});
	}
	else{
		/* CREATE A NEW PLAYER IN DATABASE */
		callAPI ("/users", "POST", JSON.stringify({usr_name: strName})).then (function (data){
			/* SWITCH CURRENT PLAYER ON THE CREATED ONE */
			currentPlayer.usr_id = data.insertId;
			console.log ("Nouveau joueur enregistré : ", strName);
			enableSave(false);
		});
	}
}

/* ENABLE BUTTON TO SAVE CHANGES (IF THERE IS ANY) */
function enableSave(bValue) {
	document.querySelector("#btnSave").disabled = !(bValue);
	if (bValue){
		document.querySelector("#imgSave").src = "./images/save.png";
	} else {
		document.querySelector("#imgSave").src = "./images/save_disabled.png";
	}
}

/* DISPLAY USER INFO FROM DB */ 
function displayUserInfo (usrId) {

	document.getElementById("chartContainer").innerHTML = setLoader();

	/* GET USER INFO TO FULLFILL THE FORM */
	callAPI ("/users/" + usrId, "GET", "").then (function (data){
		currentPlayer.usr_id = usrId;
		currentPlayer.usr_name = data[0].usr_name;
		currentPlayer.usr_avatar = data[0].usr_avatar;
		document.getElementById("inName").value = currentPlayer.usr_name;
	});

	/* GET USER'S AVERAGE TO FULLFILL THE TABLE */
	callAPI ("/users/" + usrId + "/stats", "GET", "").then (function (data){
		if (data.length > 0){
			document.getElementById("avgPocket").innerHTML = (data[0].avgPocket * 100).toFixed(0) + "%";
			document.getElementById("minPocket").innerHTML = (data[0].minPocket * 100).toFixed(0) + "%";
			document.getElementById("maxPocket").innerHTML = (data[0].maxPocket * 100).toFixed(0) + "%";
			document.getElementById("avgFoul").innerHTML = (data[0].avgFoul * 100).toFixed(0) + "%";
			document.getElementById("minFoul").innerHTML = (data[0].minFoul * 100).toFixed(0) + "%";
			document.getElementById("maxFoul").innerHTML = (data[0].maxFoul * 100).toFixed(0) + "%";

			/*DISPLAY CHART */
			callAPI ("/users/" + usrId + "/games", "GET", "").then (function (data){
				let arrPocket=new Array();
				let arrFoul=new Array();
				for (let i=0;i < data.length;i++){
					arrPocket[i] = {y: Math.round(((data[i].gam_pocket/data[i].gam_shot) * 100))};
					arrFoul[i] = {y: Math.round(((data[i].gam_foul/data[i].gam_shot) * 100))};
				}
				drawChart(arrPocket, arrFoul);
			});
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
	document.getElementById("chartContainer").innerHTML = "";
}

/* DISPLAY EMPTY SCREE FOR NEW USER */
function displayNewUserInfo(){
	currentPlayer.usr_id = 0;
	currentPlayer.usr_name = "Nouveau Joueur";
	currentPlayer.usr_avatar = null;
	document.getElementById("inName").value = currentPlayer.usr_name;
	displayEmpyStat();
}

/* DISPLAY USER INFO ACCORDING THE ID REQUESTED */
function composePageUser (strDir){
	let bChange=false;

	switch (strDir){
	case "first":
		bChange = true;
		break;
	case "next":
		if (index < (arrPlayer.length - 1)){
			bChange = true;
			index++;
		}
		break;
	case "prev":
		if (index > 0) {
			bChange = true;
			index--;
		}
		break;
	};
	if (bChange) {
		currentPlayer.usr_id = arrPlayer[(index)].usr_id;
		displayUserInfo (arrPlayer[(index)].usr_id); 
	};
	enableSave(false);
}

window.onload = function(){
	/* GET LIST OF AVAILABLE USERS FROM DATABASE */
	callAPI ("/users", "GET", "").then (function (data){
		arrPlayer = data;
		let usrId = getParam ("usr_id");
		index = 0;
		for (let i=0;i<arrPlayer.length;i++){
			if (arrPlayer[i].usr_id == usrId) {
				index = i;
				break;
			}
		}
		composePageUser ('first');
	});		 
}; 