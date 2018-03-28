import React, { Component } from 'react';
import axios from 'axios';

import './ConfirmPurchase.css';

/**

 * @version			1.0

 * @author			Erika Gutierrez, Manuel Vasquez

 * @description 	Component for allow the user inserted the data necessary for do check-in

*/

class ConfirmPurchase extends Component { 

	/** @constructor */

	constructor(props) {
	    super(props);
	    this.state = {};

	    this.handleChange = this.handleChange.bind(this);
	    this.onClickPass = this.onClickPass.bind(this);
	    this.sendEmail = this.sendEmail.bind(this);

  	}

	render(){

		return(
			<div className="container-fluid">
				<h3 className="title-home-app">Realizar reserva y comprar vuelo</h3>
				<center><p>Ingresa tus datos para continuar</p></center>
				<div className="col-sm-8 container-form form-purchase">
					<div className="container-title">
						<div className="title-origen">Nombre Pasajero</div>
						<div className="title-two">Correo Electrónico</div>
					</div>
					
					<div className="container-input">
					<input className="input-text" name="name" type="text" onChange={this.handleChange}/>
					
					<input className="input-text" name="email" type="text" onChange={this.handleChange}/>
					</div>

					<div className="container-title">
						<div className="title-origen">Tipo de documento</div>
						<div className="title-two-doc">Nro documento</div>
					</div>
					<div className="container-input">
					<select className="input-text input-select" defaultValue="" onChange={this.handleChange}>
			            <option value="document">Cedula</option>
			            <option value="passport">Pasaporte</option>
			        </select>
						<input className="input-text" name="identification" type="text" onChange={this.handleChange}/>
					</div>

					<div className="container-title">
						<div className="title-origen">Forma pago</div>
						<div className="title-two-form-pur">Nro tarjeta</div>
					</div>

					<div className="container-input">
						<select className="input-text input-select" defaultValue="" onChange={this.handleChange}>
			            	<option value="debido">Débito</option>
			            	<option value="credito">Crédito</option>
			        	</select>
			        
						<input className="input-text" name="numberT" type="text" onChange={this.handleChange}/>
					</div>
			        <button className="button-confirm-purchase" onClick={this.onClickPass.bind(this)}>Comprar y reservar</button>
				</div>
			</div>

		)
	}

	/**

	 * Get the value of select

	 * @param  {e} capture the value of button object

	*/

	handleChange(e) {

    	this.setState({value: e.target.value});

    	if(e.target.name === "name"){
			this.setState({
				valueName: e.target.value
		})
		}else if(e.target.name === "email"){
			this.setState({
				valueEmail: e.target.value
			})
		}else if(e.target.name === "identification"){
			this.setState({
				valueDocument: e.target.value
			})
		}else if(e.target.name === "numberT"){
			this.setState({
				valueCard: e.target.value
			})
		}
  	}

  	/**

	 * Post the data base for insert the check-in and send the email with the bill

	 * @param  {e} capture the value of button object

	*/

  	onClickPass(e){

  		//console.log(this.props.history.location.state.valueFly);

  		var typeUser = 3;

  		if(this.state.valueName !== undefined && this.state.valueEmail !== undefined && this.state.valueDocument !== undefined && this.state.valueCard !== undefined){
  			var endPointFlights="http://localhost:3000/search?opc=2&identification="; 
  			axios.get(endPointFlights+this.state.valueDocument+"&type="+typeUser+"&name="+this.state.valueName+"&email="+this.state.valueEmail)
				.then((response) => {
					if(response.status === 200){
						this.sendEmail(this.state.valueEmail);
					}
				}).catch(function (err) {
	        		console.log(err);
	      		});		
  		}else{
  			alert("Complete todos los campos para continuar con la compra de su tiquete");
  		}
  		
  	}

  	/**

	 * Send the email when the purchase of user is confirm

	 * @param  {email}  Receive the email enter from form to purchase ticket

	*/

  	sendEmail(email){
  		axios.get("http://localhost:3000/send/"+email+"/Template2")
		.then((response) => {
			if(response.status === 200){
				alert("Ud ha comprado correctamente su ticket, se ha enviado a su correo la información de su vuelo");
				this.props.history.push({pathname: '/'});
				window.location.reload();
			}
		}).catch(function (err) {
	        console.log(err);
	    });	
  	}
}

export default ConfirmPurchase;