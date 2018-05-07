import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import './PassRegistry.css';

/**

 * @version			1.0

 * @author			Erika Gutierrez, Manuel Vasquez

 * @description 	Receive the data of user for confirm assistance in the flight

*/

class PassRegistry extends Component { 

	/** @constructor */

	constructor(props, context) {

		super(props);
		this.state = {showModalClick: "", disabledButton: false};
   		this.handleCloseModal = this.handleCloseModal.bind(this);
   		this.registryPass = this.registryPass.bind(this);
   		this.onValueChanged = this.onValueChanged.bind(this);
   		this.refreshView = this.refreshView.bind(this);
	}

	componentWillReceiveProps(nextProps){
		this.setState({ showModalClick: true });
	}

	  
	handleCloseModal () {
	    this.setState({ showModalClick: false });
	}

	render(){

		if(this.props.disabled === true){
			this.showModal = true;
		}
		if(this.state.showModalClick === false){
			this.showModal = false;
		}
		else if(this.state.showModalClick === true){
			this.showModal = true;
		}

		return(
			<div>
			    <Modal 
			        isOpen={this.showModal}
			        contentLabel="Buscar vuelo">
			        <button className="btn-close" onClick={this.handleCloseModal}>cerrar</button>
			        <center><p>Ingresa los datos del pasajero para continuar</p></center>
			        <div className="container-modal">
			        		<p>Nro Reserva</p>
			        		<input name="numberReservation" onChange={this.onValueChanged}></input>
			        </div>
			        <button className="button-registry" onClick={this.registryPass} disabled={this.state.disabledButton}>Registrar Pasajero</button>
			   	</Modal>
			</div>
		)
	}

	onValueChanged(e) {
		
		if(e.target.name === "numberReservation"){
			this.setState({
				valueReservation: e.target.value
			})
		}
	}

	/**

	 * Registry the user in the database

	 * @param  {e} capture the value of button object

	*/

	registryPass(){

		if(this.state.valueReservation !== undefined){
			axios.get("http://localhost:3000/reservation?opc=2&numberres="+this.state.valueReservation)
			.then((response) => {
				this.setState({disabledButton: true})
				if(response.status === 200){
					alert("Usuario confirmado correctamente");
					if(this.props.numberfligth !== undefined){
						this.refreshView(this.props.numberfligth);
					}	
				}

				}).catch(function (err) {
	        	alert("Número de reserva incorrecto");
	    	});
		}else{
			alert("Debe el código de reserva del usuario");
		}
	}

	refreshView(valueProps){

		axios.get("http://localhost:3000/reservation?opc=1&numberfligth="+valueProps)
			.then((response) => {
				this.props.receiveValueRefresh(response.data);
				}).catch(function (err) {
	        	console.log(err);
	    	});

	}

}


export default PassRegistry;
