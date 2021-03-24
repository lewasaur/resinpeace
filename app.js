console.log("hello w0rlds")


//http://jsfiddle.net/Lm2hS/ input only accept numbers
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

//live clock
//https://stackoverflow.com/questions/27782344/how-to-make-the-time-in-moment-js-live/27782408
//import moment from 'moment'
// let renderClock = function() {
//     document.getElementById("clock").innertext = moment().format('MMMM Do YYYY, h:mm:ss a');
// }

//https://github.com/datejs/Datejs


//https://stackoverflow.com/questions/29867862/how-to-get-current-time-in-a-format-hhmm-am-pm-in-javascript/41734080


//https://stackoverflow.com/questions/29867862/how-to-get-current-time-in-a-format-hhmm-am-pm-in-javascript/41734080 1 liner no import
function getCurrentTime() {
	let d = new Date( ); 
	d.setHours( d.getHours()); // 
	let h = (d.getHours() % 12) || 12; // show midnight & noon as 12
	return (
		( h < 10 ? '0' : '') + h +
		( d.getMinutes() < 10 ? ':0' : ':') + d.getMinutes() +
                // optional seconds display
		// ( d.getSeconds() < 10 ? ':0' : ':') + d.getSeconds() + 
		( d.getHours() < 12 ? ' AM' : ' PM' )
	);
}

let clock = document.getElementById('clock');
setInterval(function(){
    clock.innerHTML = getCurrentTime();
}, 1000);

let desiredResins = document.getElementById('desired-resins');
let currentResins = document.getElementById('current-resins');

let maxResinTrue = document.getElementById('max-resins-check');

desiredResins.disabled = true;

desiredResins.addEventListener('keyup', function(event){
	if (event.keyCode === 13){
		event.preventDefault();
		document.getElementById('submit-resins').click();
	}
})

currentResins.addEventListener('keyup', function(event){
	if (event.keyCode === 13){
		event.preventDefault();
		document.getElementById('submit-resins').click();
	}
})



maxResinTrue.addEventListener('change', function(){
	if (this.checked) {
		desiredResins.disabled = true;
		desiredResins.value = 160;
	} else {
		desiredResins.disabled = false;
	}
});


//DISPLAYRESULTS////////////////////////////////////////////////////
//BUTTON PRESS
resultsField = document.getElementsByClassName("results-field")[0];
function displayResults(){

	if (validateInput(parseInt(currentResins.value), parseInt(desiredResins.value))){
		resultsField.style.display = "flex";
		console.log('display has been triggered');
		document.getElementById('error-message').style.display = "none";
		resinDifference( parseInt(currentResins.value), parseInt(desiredResins.value) )
		document.getElementById('desired-result-show').innerText = desiredResins.value;
		document.getElementById('calculated-time').innerText = computeTime(resultDifference);
		document.getElementById('minutes-needed').innerText = computeMinutes(resultDifference);
	} else {
		errorInput();
	}




}


//document.getElementById('submit-resins').addEventListener('click', displayResults());
document.getElementById('submit-resins').addEventListener('click', displayResults);


///RESULTS/////////////////////////////////////////////////////////

// let giveWhiteSpace = (text) => {
// 	return "  " + text + "  ";
// }


//needresins

let resultDifference
let resinDifference = (cResins, dResins) => {
	resultDifference = dResins - cResins;
	//return resultDifference
	console.log(resultDifference);
	document.getElementById('resins-result').innerText = resultDifference;
	//document.getElementById('desired-result-show').innterText = desiredResins.value.toString();
}

let errorInput = () => {
	resultsField.style.display = "none";
	document.getElementById('error-message').style.display = "block";
}


function computeTime( resinNeed ) {
	var d = new Date( ); 
	d.setHours( d.getHours()); 
	d.setMinutes(d.getMinutes() + (8 * resinNeed))
	var h = (d.getHours() % 12) || 12; // show midnight & noon as 12
	return (
		( h < 10 ? '0' : '') + h +
		( d.getMinutes() < 10 ? ':0' : ':') + d.getMinutes() +
                // optional seconds display
		// ( d.getSeconds() < 10 ? ':0' : ':') + d.getSeconds() + 
		( d.getHours() < 12 ? ' AM' : ' PM' )
	);
	
}

let computeMinutes = (resinToMinutes) => {
	return resinToMinutes * 8;
}

let validateInput = (cResins, dResins) => {
	if (cResins > dResins || cResins > 160 || dResins > 160 || cResins < 0 || dResins < 0 || isNaN(cResins) || isNaN(dResins)){
		return false;
	} else {
		return true;
	}
}
