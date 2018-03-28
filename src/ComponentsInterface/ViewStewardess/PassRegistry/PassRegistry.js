import React, { Component } from 'react';
import Modal from 'react-modal';

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
		this.state = {showModalClick: ""};
   		this.handleCloseModal = this.handleCloseModal.bind(this);
   		this.registryPass = this.registryPass.bind(this);
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
			        	<div className="title-container-modal title-pass">
			        		<p>Nombre Pasajero</p>
			        		<p>Nro Reserva</p>
			        	</div>
			        	<div className="div-pass">
			        		<input></input>
			        		<input></input>
			        	</div>
			        </div>
			        <button className="button-registry" onClick={this.registryPass}>Registrar Pasajero</button>
			   	</Modal>
			</div>
		)
	}

	/**

	 * Registry the user in the database

	 * @param  {e} capture the value of button object

	*/

	registryPass(){

		alert("Pasajero registrado exitosamente")
	}

}


export default PassRegistry;
