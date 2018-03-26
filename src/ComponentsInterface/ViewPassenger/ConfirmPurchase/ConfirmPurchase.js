import React, { Component } from 'react';

import './ConfirmPurchase.css';

class ConfirmPurchase extends Component { 

	constructor(props) {
    super(props);
    this.state = {value: 'debito'};

    this.handleChange = this.handleChange.bind(this);
    this.onClickPass = this.onClickPass.bind(this);


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
					<input className="input-text" name="origen" type="text"/>
					
					<input className="input-text" name="origen" type="text"/>
					</div>

					<div className="container-title">
						<div className="title-origen">Tipo de documento</div>
						<div className="title-two-doc">Nro documento</div>
					</div>
					<div className="container-input">
					<select className="input-text input-select" value={this.state.value} onChange={this.handleChange}>
			            <option value="document">Cedula</option>
			            <option value="passport">Pasaporte</option>
			        </select>
					<input className="input-text" name="origen" type="text"/>
					</div>

					<div className="container-title">
						<div className="title-origen">Forma pago</div>
						<div className="title-two-form-pur">Nro tarjeta</div>
					</div>

					<div className="container-input">
					<select className="input-text input-select" value={this.state.value} onChange={this.handleChange}>
			            <option value="debido">Débito</option>
			            <option value="credito">Crédito</option>
			        </select>
			        
					<input className="input-text" name="origen" type="text"/>
					</div>


					
			        <button className="button-confirm-purchase" onClick={this.onClickPass.bind(this)}>Comprar y reservar</button>
				</div>
			</div>

		)
	}

	handleChange(e) {
    	this.setState({value: e.target.value});
  	}

  	onClickPass(e){
  		alert("compra realizada, factura enviada al correo sumistrado. Recuerde que puedes hacer el check-in hasta 24 horas antes del viaje");
  	}

}

export default ConfirmPurchase;