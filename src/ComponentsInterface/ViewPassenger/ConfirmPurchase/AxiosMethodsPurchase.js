
/** Class AxiosMethods.js

	* This method is call in the component ConfirmPurchase, and is the in charge of consult, 
	
	* insert and send the email to the user

	* @param  {axios, valueDocument, typeUser, valueName, valueEmail, history} 

	* This data containt information of user passenger and is used for the function insertUser and sendEmail
*/

export const consultUser = (axios, valueDocument, typeUser, valueName, valueEmail, history, valueFligth)=>{

	axios.get("http://localhost:3000/search?opc=2&identification="+valueDocument)
  	.then((response) => {
  		if(response.data.length === 0){
  			insertUser(axios, valueDocument, typeUser, valueName, valueEmail, valueFligth, history);
		}else{
		  	insertReservation(axios, valueDocument, valueFligth, valueEmail, history)				
		}
  	}).catch(function (err) {
	    alert("Verfique sus datos, no es posible continuar");
	});
}


/**

	* Insert the user in the table "Usuario" if this not exists

	* @param  {valueDocument, typeUser, valueName, valueEmail}  This data containt information of user passenger
*/

function insertUser(axios, valueDocument, typeUser, valueName, valueEmail, valueFligth, history){
		
	axios.get("http://localhost:3000/search?opc=3&identification="+valueDocument+"&type="+typeUser+"&name="+valueName+"&email="+valueEmail)
	.then((response) => {
		if(response.status === 200){
			insertReservation(axios, valueDocument, valueFligth, valueEmail, history)
		}
	}).catch(function (err) {
		alert("Verfique sus datos, no es posible continuar");
	});
}



/**
	* Insert the reservation user

	* @param  {valueDocument, valueFligth, valueEmail}  Receive the data for be insert
*/

function insertReservation(axios, valueDocument, valueFligth, valueEmail, history){

	var valueStatus = '001';
	var email = valueEmail;

	console.log(email);

	axios.get("http://localhost:3000/search?opc=4&identification="+valueDocument+"&fligthCode="+valueFligth+"&status="+valueStatus)
	.then((response) => {
		if(response.status === 200){
			sendEmail(axios, email, history);
		}
	}).catch(function (err) {
		alert("Verfique sus datos, no es posible continuar");
	});
	
}


/**
	* Send the email when the purchase of user is confirm

	* @param  {axios, valueemail, history}  Receive the email enter from form to purchase ticket
*/

function sendEmail(axios, email, history){

	axios.get("http://localhost:3000/send/"+email+"/Template2/Gracias por comprar en Gastronomic Air")
		.then((response) => {
			if(response.status === 200){
				alert("Ud ha comprado correctamente su ticket, se ha enviado a su correo la información de su vuelo");
				history.push({pathname: '/'});
				window.location.reload();
			}
		}).catch(function (err) {
	        console.log(err);
	    });	
}