const _PLAYER1_KEY = "PlayerId1";
const _PLAYER2_KEY = "PlayerId2";

/* GET PARAM FROM localStorage */
function getPlayerId (nId){
	let strKeyName = getKeyName (nId);
	let strKeyValue = localStorage.getItem (strKeyName);
   
	if (strKeyValue == null){
		return 0;
	}
	else{
		let nValue = Number (strKeyValue);
		if (!(isNaN (nValue))) return nValue;
		else return 0;
	} 
}

/* SET VALUE INOT localStorage() */
function setPlayerId (nId, nValue){
	let strKeyName = getKeyName (nId);

	localStorage.setItem(strKeyName, String(nValue));
}

/* GET KEY NAME ACCODING THE REQUESTED ID */ 
function getKeyName (nId){
	if (nId == 1){
		return (_PLAYER1_KEY);
	}
	else{
		return(_PLAYER2_KEY);
	}
}    

/* INIT */
if (getPlayerId (1) == 0){
	/* FIX Player by Default */
	setPlayerId (1, 1);
}
if (getPlayerId (2) == 0){
	/* FIX Player by Default */
	setPlayerId (2, 2);
}