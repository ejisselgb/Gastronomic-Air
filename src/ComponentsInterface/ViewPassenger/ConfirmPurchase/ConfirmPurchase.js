import React, { Component } from 'react';
import axios from 'axios';

import './ConfirmPurchase.css';
import {consultUser} from './AxiosMethodsPurchase.js'

/**

 * @version			2.0

 * @author			Erika Gutierrez, Manuel Vasquez

 * @description 	Component for allow the user inserted the data necessary for do check-in

 * @modificate   	Eliminated dependecy of methods for do the queries in the database

*/

class ConfirmPurchase extends Component { 

	/** @constructor */

	constructor(props) {
	    super(props);
	    this.state = {disabledButton: false};

	    this.handleChange = this.handleChange.bind(this);
	    this.onClickPass = this.onClickPass.bind(this);
  	}

	render(){

		return(
			<div className="container-fluid">
				<div className="container-pass view-check">
				<h3 className="title-home-app">Realizar reserva y comprar vuelo</h3>
				<center><p>Ingresa tus datos para continuar</p></center>
				<div className="col-sm-12 container-form form-purchase">
					<div className="container-title">
						<div className="title-origen">Nombre Pasajero</div>
						<div className="title-two">Correo Electrónico</div>
					</div>
					
					<div className="container-input">
					<input className="input-text" name="name" type="text" onChange={this.handleChange}/>
					
					<input className="input-text" name="email" type="text" onChange={this.handleChange}/>
					</div>

					<div className="container-title">
						<div className="title-origen">Dirección residencia</div>
						<div className="title-two-doc">Nro documento</div>
					</div>
					<div className="container-input">
						<input className="input-text" name="street" type="text" onChange={this.handleChange}/>
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
			        <button className="button-confirm-purchase" onClick={this.onClickPass.bind(this)} disabled={this.state.disabledButton}>Comprar y reservar</button>
				</div>
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
		}else if(e.target.name === "street"){
			this.setState({
				valueStreet: e.target.value
			})
		}
  	}

  	/**

	 * Post the data base for insert the check-in and send the email with the bill

	 * @param  {e} capture the value of button object

	*/

  	onClickPass(e){

  		var typeUser = 3;
  		var valueFligth = this.props.history.location.state.valueFly;

  		if(this.state.valueName !== undefined && this.state.valueEmail !== undefined && this.state.valueDocument !== undefined && this.state.valueStreet !== undefined){

  			/*Function called from class js AxiosMethodsPurchase*/
  			consultUser(axios, this.state.valueDocument, typeUser, this.state.valueName, this.state.valueEmail, this.props.history, valueFligth, this.state.valueStreet);
  			this.setState({disabledButton: true})

  		}else{
  			alert("Complete todos los campos para continuar con la compra de su tiquete");
  		}	
  	}
}

export default ConfirmPurchase;